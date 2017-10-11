function log_tab(onglet) {
    localStorage['currentTabUrl'] = onglet.url;
    localStorage['currentTabTitle'] = onglet.title;
    localStorage['currentTabDomain'] = parse_url(onglet.url);
    localStorage['currentTabIsComplete'] = onglet.status === "complete";

    notifyMe(event)
}


function notification(entity) {
    var content = "";
    content = content + entity.name;
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


function notifyMe() {

    if (Notification.permission !== "granted") {
        Notification.requestPermission();
    } else {
        // browser allows notifications
        get_data(function (data) {

            var entity = check_website(data, localStorage['currentTabUrl']);

            var current_name = 'current_' + entity.name;
            var current_session = sessionStorage[current_name];
            var current_local = localStorage[current_name];


            if (entity) {
                // the website is known

                if (current_session && current_local) {
                    sessionStorage[current_name] = parseInt(current_session) + 1;
                    localStorage[current_name] = parseInt(current_local) + 1
                }
                else if (current_session && !current_local) {
                    sessionStorage[current_name] = parseInt(current_session) + 1;
                    localStorage[current_name] = sessionStorage[current_name]
                }
                else if (!current_session && current_local) {
                    sessionStorage[current_name] = 1;
                    localStorage[current_name] = parseInt(current_local) + 1;
                    notification(entity)
                }
                else if (!current_session && !current_local) {
                    sessionStorage['current_' + entity.name] = 1;
                    localStorage['current_' + entity.name] = 1;
                    notification(entity)
                }
            }


        })
    }
}


function parse_url(url) {
    var parser = document.createElement('a');
    parser.href = url;
    var new_url = parser.hostname;
    if (new_url.indexOf("www.") === 0) {
        new_url = new_url.substring(4, new_url.length)
    }
    return new_url
}


function get_indices(haystack, needle) {
    var returns = [];
    var position = 0;
    while (haystack.indexOf(needle, position) > -1) {
        var index = haystack.indexOf(needle, position);
        returns.push(index);
        position = index + needle.length;
    }
    return returns;
}

function check_website(data, url) {
    var e;
    for (var entity in data.entitys.id) {
        e = data.entitys.id[entity];
        if (e.website) {
            var website = parse_url(e.website);
            if (url.indexOf(website) !== -1) {
                console.log('Found ' + website + ' in ' + url + ' leading to entity : ' + e.name);
                return e
            }
        }
    }
    return false
}

function get_wiki_img_src(data, keys, index) {
    if (index === 0) {
        delete localStorage['wiki_src'];
        keys = [];
        for (var k in data.entitys.id) keys.push(k);
    } else if (index === keys.length) {
        return
    }

    var entity = data.entitys.id[keys[index]];
    if (entity.category === 'm') {
        var wikis = entity.wiki.split('/');
        var wiki = wikis[wikis.length - 1];
        var query = "https://fr.wikipedia.org/w/api.php?action=parse&format=json&prop=text&page=" + wiki;
        $.ajax({
            url: query,
            dataType: 'json',
            xhrFields: { withCredentials: true },
            success: function (response) {
                try {
                    var r = $(response.parse.text['*']);
                    console.log(entity.name);
                    var src = $(r[2]).find('img');
                    console.log(src);
                    if (!localStorage['wiki_src']) {
                        var id = entity.id;
                        var w = {
                            id: src
                        };
                        localStorage['wiki_src'] = JSON.stringify(w)
                    } else {
                        var w = JSON.parse(localStorage['wiki_src']);
                        w[entity.id] = src;
                        localStorage['wiki_src'] = JSON.stringify(w)
                    }
                } catch (e) {
                    console.log(e)
                } finally {
                    get_wiki_img_src(data, keys, index + 1)
                }

            }
        });
    }
}


function store_data(data) {
    var data_id = {
        shares: {
            parents: {},
            children: {}
        },
        entitys: {
            id: {},
            name: {}
        }
    };

    for (var s_id in data.shares) {
        var s = data.shares[s_id]
        if (data_id.shares.parents[s.parent]) {
            data_id.shares.parents[s.parent].push(s);
        } else {
            data_id.shares.parents[s.parent] = [s];
        }

        if (data_id.shares.children[s.child]) {
            data_id.shares.children[s.child].push(s);
        } else {
            data_id.shares.children[s.child] = [s];
        }

    }
    ;

    for (var e_id in data.entitys) {
        var e = data.entitys[e_id]
        data_id.entitys.id[e.id] = e;
        data_id.entitys.name[e.name] = e
    }
    ;

    localStorage['data'] = JSON.stringify(data_id);

    console.log('Data stored');
}

function count_tabs() {
    localStorage['numberTabsOpen'] = 0;
    chrome.windows.getAll({ populate: true }, function (windows) {
        windows.forEach(function (window) {
            window.tabs.forEach(function (tab) {
                localStorage['numberTabsOpen'] = parseInt(localStorage['numberTabsOpen']) + 1
            });
        });
    });
}


function get_data(next) {
    var parse_error = true;
    if (localStorage['data']) {
        try {
            var data = JSON.parse(localStorage['data']);
            parse_error = false;
            // console.log('Data is here and safe')
        } catch (e) {
            console.log('Data is here but Error parsing JSON:');
            console.log(e)
        }

        try {
            next(data)
        } catch (e) {
            console.log("Error in get_data's function : " + arguments[0].name);
            console.log(e);
        }
    }
    if (!localStorage['data'] || parse_error) {
        if (!localStorage['data']) {
            console.log('Data is not here')
        }
        if (parse_error) {
            console.log('Data is here but NOT safe')
        }

        console.log('Downloading data...');
        $.post({
            url: 'https://localhost:8000/medias/get_data/',
            success: function (message) {
                console.log('Data downloaded');
                store_data(message);
                try {
                    next(message)
                } catch (e) {
                    console.log("Error in get_data's function after downloading data: " + arguments[0].name);
                    console.log(e);
                }
            }
        }).fail(function (e) {
            console.log('Error getting data from server, trying for local JSON');
            console.log(e);
            $.getJSON("/data.json", function (data, status, xhr) {
                console.log('JSON DATA:')
                console.log(data)
                localStorage['data'] = JSON.stringify(data)
                try {
                    next(data)
                } catch (e) {
                    console.log("Error in get_data's function after loagdin local JSON data: " + arguments[0].name);
                    console.log(e);
                }
            }).fail(function (e) {
                console.log('Error getting data from local JSON and Server ; ABORT');
                console.log(e);
            });
        });

    }
}
