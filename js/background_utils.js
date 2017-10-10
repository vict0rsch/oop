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


function find_other_special(data, entity) {
    var targets = [];
    for (var s in data.shares.parents[entity.id]) {
        s = data.shares.parents[entity.id][s];
        if (s.share == -1 && s.special.length > 10) {
            targets.push(s)
        }
    }

    var other_parents = [];
    for (var s in targets) {
        s = targets[s];
        other_parents = other_parents.concat(data.shares.children[s.child])
    }

    var result = {
        shares: [],
        nodes: [],
    };
    for (var s of other_parents) {
        if (s.parent !== entity.id) {
            var e = {};
            e.target = -1;
            e.label = "";
            e.source = s.parent;
            e.id = s.id;
            result.shares.push({ data: e });
            var temp_node = data.entitys.id[s.parent];
            temp_node.width = parseInt(temp_node.name.length * 10);
            result.nodes.push({ data: temp_node })
        }
    }

    return result
}


function display_cyto(data, entity, container, first) {
    var size;
    if (localStorage['popup_size'] && !isNaN(parseInt(localStorage['popup_size']))) {
        try {
            size = parseInt(localStorage['popup_size'])
        } catch (err) {
            console.log(err);
            size = 500;
            localStorage['popup_size'] = 500
        }
    } else {
        size = 500;
        localStorage['popup_size'] = 500
    }

    $("body").css('width', size + 'px').css('height', size + 'px');

    if (first) {
        sessionStorage['history'] = JSON.stringify([entity.name]);
        sessionStorage['return'] = 'false'
    } else if (sessionStorage['return'] === 'false') {
        var history = JSON.parse(sessionStorage['history']);
        history.push(entity.name);
        sessionStorage['history'] = JSON.stringify(history)
    }
    sessionStorage['return'] = 'false';
    var cyto_data = get_cyto_data(data, entity);
    var elements = cyto_data.nodes.concat(cyto_data.edges);
    //elements.forEach(function(e){console.log(e.data)})
    var cy = cytoscape({
        container: $(container),
        elements: elements,

        style: [ // the stylesheet for the graph
            {
                selector: 'node[category = "c"]',
                style: {
                    'background-opacity': 0,
                    'label': 'data(name)',
                    'shape': 'rectangle',
                    'font-weight': 150,
                    'color': 'rgb(107,36,50)',
                    'width': 'data(width)',
                    'text-valign': "center",
                    'font-size': '3em',
                    // 'text-outline-width': 3,
                    // 'text-outline-color': '#F5A45D',
                }
            },

            {
                selector: 'node[category = "m"]',
                style: {
                    'color': 'rgb(13,60,73)', //rgb(6,63,92)',
                    'background-opacity': 0,
                    'label': 'data(name)',
                    'font-weight': 'bolder',
                    'text-valign': 'center',
                    'shape': 'rectangle',
                    'height': '30px',
                    'width': 'data(width)',
                    'text-margin-y': '4px',
                    'font-size': '3em',
                }
            },

            {
                selector: 'node[category = "i"]',
                style: {
                    'background-opacity': 0,
                    'label': 'data(name)',
                    'shape': 'rectangle',
                    'width': 'data(width)',
                    'height': '30px',
                    'font-weight': 'bolder',
                    'text-valign': "center",
                    'font-size': '3em',
                }
            },

            {
                selector: 'node[category = "s"]',
                style: {
                    'background-opacity': 0,
                    'label': 'data(name)',
                    'shape': 'rectangle',
                    'width': '80px',
                    'color': 'rgb(100, 100, 100)',
                    'font-weight': 150,
                    'text-valign': "center",
                    // 'text-outline-width': 2,
                    // 'text-outline-color': '#888',
                    'border-width': 0,
                    'border-color': '#8c8c8c',
                    'font-size': '3em'
                }
            },

            {
                selector: 'edge',
                style: {
                    'width': 10,
                    'target-arrow-shape': 'triangle',
                    'line-color': 'rgb(210, 210, 210)',
                    'target-arrow-color': 'rgb(180, 180, 180)',
                    'curve-style': 'bezier',
                    'label': 'data(label)',
                    'font-size': '3em'
                }
            }
        ],

        layout: {
            name: 'breadthfirst',
            fit: true, // whether to fit the viewport to the graph
            directed: true, // whether the tree is directed downwards (or edges can point in any direction if false)
            padding: 0, // padding on fit
            circle: false, // put depths in concentric circles if true, put depths top down if false
            spacingFactor: 0.65, // positive spacing factor, larger => more space between nodes (N.B. n/a if causes overlap)
            boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
            avoidOverlap: true, // prevents node overlap, may overflow boundingBox if not enough space
            nodeDimensionsIncludeLabels: true, // Excludes the label when calculating node bounding boxes for the layout algorithm
            roots: undefined, // the roots of the trees
            maximalAdjustments: 0, // how many times to try to position the nodes in a maximal way (i.e. no backtracking)
            animate: true, // whether to transition the node positions
            animationDuration: 1000, // duration of animation in ms if enabled
            animationEasing: undefined, // easing of animation if enabled,
            animateFilter: function (node, i) { return node.category == "m"; }, // a function that determines whether the node should be animated.  All nodes animated by default on animate enabled.  Non-animated nodes are positioned immediately when the layout starts
            ready: undefined, // callback on layoutready
            stop: undefined, // callback on layoutstop
            transform: function (node, position) { return position; } // transform a given node position. Useful for changing flow direction in discrete layouts
        }
    });

    cy.ready(function () {

        if (JSON.parse(sessionStorage['history']).length > 1) {
            if (!$('#previous_graph').length) {
                $(container).parent().append('<button class="btn btn-1 btn-1e" id="previous_graph">Graphe précédent</button>')
            }

            $('#previous_graph').click(function (event) {
                event.stopImmediatePropagation();
                var history = JSON.parse(sessionStorage['history']);
                history.pop();
                var name = history[history.length - 1];
                sessionStorage['history'] = JSON.stringify(history);
                sessionStorage['return'] = 'true';
                console.log('Click : ' + name);
                display_cyto(data, data.entitys.name[name], container, false)
            })
        } else if (JSON.parse(sessionStorage['history']).length == 1 && first) {
            if ($('#previous_graph').length) {
                $('#previous_graph').remove()
            }
        } else {
            if ($('#previous_graph').length) {
                $('#previous_graph').remove()
            }
        }

        cy.nodes('[category != "s"]').qtip({
            content: {
                text: function () {
                    var text = '';
                    var entity = data.entitys.name[this.data().name];
                    if (entity.wiki) {
                        text += '<a href=' + this.data().wiki + ' target=_blank>Wikipedia</a>';
                        text += '<br><br>'
                    }

                    if (entity.website) {
                        text += '<a href=' + this.data().website + ' target=_blank>Go to website</a>';
                        text += '<br>'
                    }

                    text += '<button type = "button" class="click_qtip">Voir plus</button>';

                    return text
                },
                title: function () {
                    return this.data().name
                },
                button: true
            },
            position: {
                my: 'top center',
                at: 'bottom center'
            },
            style: {
                classes: 'qtip-bootstrap',
                tip: {
                    width: 10,
                    height: 5
                }
            },
            events: {
                visible: function () {

                    $('.click_qtip').qtip({
                        style: { classes: 'btn btn-default' }
                    });

                    $('.click_qtip').click(function (event) {
                        var name = event.target.parentNode.parentNode.childNodes[1].childNodes[0].innerHTML;
                        var parent_1 = $(this).parent();
                        var parent_2 = parent_1.parent();
                        parent_2.hide();
                        display_cyto(data, data.entitys.name[name], container, false)
                    })
                },
            }
        });
    });
    window.cy = cy;
}


function get_children(data, entity, res) {
    var children = data.shares.parents[entity.id];
    if (!children) {
        return []
    }

    res.push(children);
    var tab = [];
    for (var s of children) {
        get_children(data, data.entitys.id[s.child], res)
    }
    return res
}


function get_cyto_data(data, entity) {
    var result;
    var parents_arrays = get_parents(data, entity, []);
    var children_arrays = get_children(data, entity, []);

    var parents = [];
    var children = [];
    for (var p of parents_arrays) {
        for (var s of p) {
            parents.push(s);
        }
    }


    for (var c of children_arrays) {
        for (var s of c) {
            children.push(s);
        }
    }

    var entitys = [];


    for (var share of children) {
        p = data.entitys.id[share.parent];
        c = data.entitys.id[share.child];
        if (entitys.indexOf(c) === -1) {
            entitys.push(c);
        }
        if (entitys.indexOf(p) === -1) {
            entitys.push(p);
        }
    }

    for (var share of parents) {
        p = data.entitys.id[share.parent];
        c = data.entitys.id[share.child];
        if (entitys.indexOf(c) === -1) {
            entitys.push(c);
        }
        if (entitys.indexOf(p) === -1) {
            entitys.push(p);
        }
    }

    var nodes = [];
    for (var e of entitys) {
        var width = parseInt(e.name.length * 10);
        if (e.category === 'm') {
            width *= 2;
        }
        e.width = width + 'px';
        nodes.push({ data: e });
    }

    var shares = [];
    var special_shares = [];

    for (var s of children) {
        var label;
        if (s.share == -1) {
            label = s.special
        } else {
            label = s.share + '%'
        }
        var temp_data = {};
        temp_data.id = s.id;
        temp_data.source = s.parent;
        temp_data.target = s.child;
        temp_data.label = label;
        if (label.length > 10) {
            special_shares.push(s.id)
        }
        shares.push({ data: temp_data })
    }

    for (var s of parents) {
        var label;
        if (s.share == -1) {
            label = s.special
        } else {
            label = s.share + '%'
        }
        var temp_data = {};
        temp_data.id = s.id;
        temp_data.source = s.parent;
        temp_data.target = s.child;
        temp_data.label = label;
        if (label.length > 10) {
            special_shares.push(s.id)
        }
        shares.push({ data: temp_data })
    }

    if (special_shares.length > 0) {
        var temp_target;
        var temp_label;
        var n = {};
        n.id = -1;
        n.category = 's';
        n.name = "(ensemble)";
        nodes.push({ data: n });

        for (var s of shares) {
            s = s.data;
            if (special_shares.indexOf(s.id) > -1) {
                temp_target = s.target;
                temp_label = s.label.split(' ')[0];
                s.target = -1;
                s.label = ""
            }
        }
        var temp_data = {};
        temp_data.id = -2;
        temp_data.source = -1;
        temp_data.target = temp_target;
        temp_data.label = temp_label;
        shares.push({ data: temp_data })

    }

    var other_parents = find_other_special(data, entity);
    // if (entity.id == 142){
    //     var temp_edge = {data:{
    //     target: "204",
    //     source: "142",
    //     id: '-3',
    //     label: "78%"
    //     }}
    //     shares.push(temp_edge)
    // }
    result = { nodes: nodes.concat(other_parents.nodes), edges: shares.concat(other_parents.shares) };

    return result
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


function get_parents(data, entity, res) {
    var parents = data.shares.children[entity.id];
    if (!parents) {
        return []
    }

    res.push(parents);
    var tab = [];
    for (var s of parents) {
        get_parents(data, data.entitys.id[s.parent], res)
    }
    return res
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
