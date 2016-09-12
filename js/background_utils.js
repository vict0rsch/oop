
function count_tabs() {
    localStorage['numberTabsOpen'] = 0 
    chrome.windows.getAll({populate:true},function(windows){
        windows.forEach(function(window){
            window.tabs.forEach(function(tab){
                localStorage['numberTabsOpen'] = parseInt(localStorage['numberTabsOpen']) + 1
            });
        });
    });  
}


function get_indices(haystack, needle){
    var returns = [];
    var position = 0;
    while(haystack.indexOf(needle, position) > -1){
        var index = haystack.indexOf(needle, position);
        returns.push(index);
        position = index + needle.length;
    }
    return returns;
}


function parse_url(url){
    var parser = document.createElement('a');
    parser.href = url
    // console.log('parser:')
    // console.log(parser)
    new_url = parser.hostname
    if (new_url.indexOf("www.")===0){
        new_url = new_url.substring(4, new_url.length)
    }
    return new_url
}


function time_function(func){
    var start = performance.now();
    func();
    var end = performance.now();
    console.log('Executed ' + arguments[0].name + ' in ' + (end - start) + 'ms');
}


function get_data( next ){
    var parse_error = true
    if (localStorage['data']){
        try{
            var data = JSON.parse(localStorage['data']);
            parse_error = false
            // console.log('Data is here and safe')
        } catch(e){
            console.log('Data is here but Error parsing JSON:')
            console.log(e)
        }

        try {
            next(data)
        } catch(e) {
            console.log("Error in get_data's function : " + arguments[0].name)
            console.log(e);
        }
    }
    if (!localStorage['data'] || parse_error){
        if (!localStorage['data']){
            console.log('Data is not here')
        }
        if (parse_error){
            console.log('Data is here but NOT safe')
        }

        console.log('Downloading data...')
        $.post({
            url:'https://localhost:8000/medias/get_data/',
            success:function(message){
                console.log('Data downloaded');
                store_data(message)
                try {
                    next(message)
                } catch(e) {
                    console.log("Error in get_data's function after downloading data: " + arguments[0].name)
                    console.log(e);
                }
            }
        }).fail(function(e){
            console.log('Error getting data from server')
            console.log(e);
        });

    }
}


function store_data(data){
    var data_id = {
        shares: {
            parents:{},
            children:{}
        },
        entitys:{
            id:{},
            name:{}
        }
    };

    for (var s of data.shares){
        if (data_id.shares.parents[s.parent]){
            data_id.shares.parents[s.parent].push(s);
        } else {
            data_id.shares.parents[s.parent] = [s];
        }

        if (data_id.shares.children[s.child]){
            data_id.shares.children[s.child].push(s);
        } else {
            data_id.shares.children[s.child] = [s];
        }

    };

    for (var e of data.entitys){
        data_id.entitys.id[e.id] = e
        data_id.entitys.name[e.name] = e
    };

    localStorage['data'] = JSON.stringify(data_id);

    console.log('Data stored');
}


function check_website(data, url){
    console.log('checking')
    for (let entity in data.entitys.id){
        var e = data.entitys.id[entity]
        if (e.website){
            var website = parse_url(e.website)
            if (url.indexOf(website) !== -1){
                console.log('Found '+ website + ' in ' + url + ' leading to entity : ' + e.name)
                return e
            }
        }
    }
    console.log('No Match')
    return false
}


function get_parents(data, entity, res){
    var parents = data.shares.children[entity.id]
    if (!parents){
        return []
    }

    res.push(parents)
    var tab = []
    for (var s of parents){
        get_parents(data, data.entitys.id[s.parent], res)
    }
    return res
}


// function get_entitys(data, ids){
//     result = {}
//     for (entity of data.entitys){
//         if (ids.indexOf(entity.id) >=0){
//             result[entity.id] = entity
//         }
//     }
//     return result
// }


function get_branch_from_media(data, entity){
    var id = entity.id
    if (localStorage['branch_'+entity.name]){
        return JSON.parse(localStorage['branch_'+entity.name])
    }
    
    var direct_parents = get_parents(data, entity) 
    console.log('direct parents')
    console.log(direct_parents)
}


function notification(entity){
    var content = ""
    content = content + entity.name
    var notification = new Notification(
        'Notification title', {
            icon: 'http://www.monde-diplomatique.fr/IMG/png/ppa-1-4.png',
            body: content,
            //console.log(notification)
            // notification.onclick = function () {
            //   window.open("http://stackoverflow.com/a/13328397/1269037");      
            // };
        }
    );
}


function log_and_notify(entity){

    var current_session = sessionStorage['current_'+entity.name]
    var current_local = localStorage['current_'+entity.name]

    if (current_session && current_local)
    {
        sessionStorage['current_'+entity.name] = parseInt(current_session) + 1
        localStorage['current_'+entity.name] = parseInt(current_local) + 1
    } 
    else if (current_session && !current_local) 
    {
        sessionStorage['current_'+entity.name] = parseInt(current_session) + 1
        localStorage['current_'+entity.name] = parseInt(current_session) + 1
    } 
    else if (!current_session && current_local)
    {
        sessionStorage['current_'+entity.name] = 1
        localStorage['current_'+entity.name] = parseInt(current_local) + 1
        notification(entity)
    }  
    else if (!current_session && !current_local)
    {
        sessionStorage['current_'+entity.name] = 1
        localStorage['current_'+entity.name] = 1
        notification(entity)
    }
}


function notifyMe() {
    
    if (Notification.permission !== "granted"){
        Notification.requestPermission();
    }else {
        // browser allows notifications
        get_data(function(data){
            var update = localStorage['currentUpdate'] 
            if (update === '0'){
                console.log(update)
                // process is started on the opening of the tab, the first update or if  it's complete
                var entity = check_website(data, localStorage['currentTabUrl'])
                if (entity){
                    // the website is known
                    log_and_notify(entity)
                }
            }
        })
    }
}


function log_tab(onglet, event){
    localStorage['currentTabUrl'] = onglet.url
    localStorage['currentTabTitle'] = onglet.title
    localStorage['currentTabDomain'] = parse_url(onglet.url)
    localStorage['currentTabIsComplete'] = onglet.status === "complete"
    if (event == 'u'){
        if (localStorage['currentUpdate']){
            if (onglet.status === "complete"){
                localStorage['currentUpdate'] = 0
            } else {
                localStorage['currentUpdate'] = parseInt(localStorage['currentUpdate']) + 1
            }
        } else{
            localStorage['currentUpdate'] = 1
        }
    }
    notifyMe()
}


function get_cyto_data(data, entity){
    var parents_arrays = get_parents(data, entity, [])
    var parents = []
    for (var p of parents_arrays){
        for (var s of p){
            parents.push(s)
        }
    }

    var entitys = []
    for (var share of parents){
        p = data.entitys.id[share.parent]
        c = data.entitys.id[share.child]
        if(entitys.indexOf(c) === -1){
            entitys.push(c)
        } 
        if(entitys.indexOf(p) === -1){
            entitys.push(p)
        }
    }

    var nodes =[]
    for (var e of entitys){
        width = parseInt(e.name.length*10)
        e.width = width + 'px'
        nodes.push({data:e})
    }

    var shares = []
    var special_shares =[]
    for (var s of parents){
        var label
        if (s.share == -1){
            label = s.special
        } else {
            label = s.share + '%'
        }
        var temp_data = {}
        temp_data.id = s.id
        temp_data.source = s.parent
        temp_data.target = s.child
        temp_data.label = label
        if(label.length > 10){
                special_shares.push(s.id)
        }
        shares.push({data:temp_data})
    }

    if (special_shares.length > 0){
        var temp_child
        var temp_label
        console.log('special shares')
        console.log(special_shares)
        var n = {}
        n.id = -1
        n.category = 's'
        n.name = "ensemble"
        nodes.push({data:n})

        for (var s of shares){
            s = s.data
            if(special_shares.indexOf(s.id) > -1){
                console.log('for (var s of special_shares)')
                console.log(s)
                temp_target = s.target
                temp_label = s.label.split(' ')[0]
                s.target = -1
                s.label = ""
                console.log('temp child  ' +s.target)
            }
        }
        var temp_data = {}
        temp_data.id = -2
        temp_data.source = -1
        temp_data.target = temp_target
        temp_data.label = temp_label
        shares.push({data:temp_data})

    }

    return {nodes: nodes, edges: shares}
}


function get_wiki_img_src(data, keys, index){
    if (index === 0){
        delete localStorage['wiki_src']
        keys = []
        for(var k in data.entitys.id) keys.push(k);
    } else if (index === keys.length){
        return
    }
    
    var entity = data.entitys.id[keys[index]]
    if (entity.category === 'm'){
        var wikis = entity.wiki.split('/') 
        var wiki = wikis[wikis.length - 1]
        var query = "https://fr.wikipedia.org/w/api.php?action=parse&format=json&prop=text&page="+wiki
        $.ajax( {
            url: query,
            dataType: 'json', 
            xhrFields: { withCredentials: true },
            success: function(response) { 
                try {
                    var r = $(response.parse.text['*'])
                    console.log(entity.name)
                    var src = $(r[2]).find('img')
                    console.log(src)
                    if (!localStorage['wiki_src']){
                        var id = entity.id
                        var w = {
                            id: src 
                        }
                        localStorage['wiki_src'] = JSON.stringify(w)
                    } else {
                        var w = JSON.parse(localStorage['wiki_src'])
                        w[entity.id] = src
                        localStorage['wiki_src'] = JSON.stringify(w)
                    }
                } catch(e) {
                    console.log(e)
                } finally {
                    get_wiki_img_src(data, keys, index + 1)
                }
                
            }
        });
    }

}