export function getCytoData(data, entity) {
    if (localStorage['cytoData_' + entity.id]){
        console.log('using local data');
        return JSON.parse(localStorage['cytoData_' + entity.id]);
    }

    var result;
    var parents_arrays = getParents(data, entity, []);
    var children_arrays = getChildren(data, entity, []);

    var parents = [];
    var children = [];
    for (var p of parents_arrays) {
        for (var s of p) {
            parents.push(s);
        }
    }


    for (var c of children_arrays) {
        for (s of c) {
            children.push(s);
        }
    }

    var entitys = [];


    for (var share of children) {
        p = data.entitys.ids[share.parent];
        c = data.entitys.ids[share.child];
        if (entitys.indexOf(c) === -1) {
            entitys.push(c);
        }
        if (entitys.indexOf(p) === -1) {
            entitys.push(p);
        }
    }

    for (share of parents) {
        p = data.entitys.ids[share.parent];
        c = data.entitys.ids[share.child];
        if (entitys.indexOf(c) === -1) {
            entitys.push(c);
        }
        if (entitys.indexOf(p) === -1) {
            entitys.push(p);
        }
    }

    var nodes = [];
    for (var e of entitys) {
        var width = parseInt(e.name.length * 10, 10);
        if (e.category === 'm') {
            width *= 2;
        }
        e.width = width + 'px';
        nodes.push({ data: e });
    }

    var shares = [];
    var special_shares = [];

    for (s of children) {
        var label;
        if (s.share === -1) {
            label = s.special;
        } else {
            label = s.share + '%';
        }
        var temp_data = {};
        temp_data.id = s.id;
        temp_data.source = s.parent;
        temp_data.target = s.child;
        temp_data.label = label;
        if (label.length > 10) {
            special_shares.push(s.id);
        }
        shares.push({ data: temp_data });
    }

    for (s of parents) {
        if (s.share === -1) {
            label = s.special;
        } else {
            label = s.share + '%';
        }
        temp_data = {};
        temp_data.id = s.id;
        temp_data.source = s.parent;
        temp_data.target = s.child;
        temp_data.label = label;
        if (label.length > 10) {
            special_shares.push(s.id);
        }
        shares.push({ data: temp_data });
    }

    if (special_shares.length > 0) {
        var temp_target;
        var temp_label;
        var n = {};
        n.id = -1;
        n.category = 's';
        n.name = "(ensemble)";
        nodes.push({ data: n });

        for (s of shares) {
            s = s.data;
            if (special_shares.indexOf(s.id) > -1) {
                temp_target = s.target;
                temp_label = s.label.split(' ')[0];
                s.target = -1;
                s.label = "";
            }
        }
        temp_data = {};
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
    localStorage['cytoData_' + entity.id] = JSON.stringify(result);
    return result;
}

function find_other_special(data, entity) {
    var targets = [];
    for (var s in data.shares.parents[entity.id]) {
        s = data.shares.parents[entity.id][s];
        if (s.share === -1 && s.special.length > 10) {
            targets.push(s);
        }
    }

    var other_parents = [];
    for (s in targets) {
        s = targets[s];
        other_parents = other_parents.concat(data.shares.children[s.child])
    }

    var result = {
        shares: [],
        nodes: [],
    };
    for (s of other_parents) {
        if (s.parent !== entity.id) {
            var e = {};
            e.target = -1;
            e.label = "";
            e.source = s.parent;
            e.id = s.id;
            result.shares.push({ data: e });
            var temp_node = data.entitys.ids[s.parent];
            temp_node.width = parseInt(temp_node.name.length * 10, 10);
            result.nodes.push({ data: temp_node });
        }
    }
    return result;
}


// function display_cyto(data, entity, container, first) {
//     var size;
//     if (localStorage['popup_size'] && !isNaN(parseInt(localStorage['popup_size']))) {
//         try {
//             size = parseInt(localStorage['popup_size']);
//         } catch (err) {
//             console.log(err);
//             size = 500;
//             localStorage['popup_size'] = 500;
//         }
//     } else {
//         size = 500;
//         localStorage['popup_size'] = 500;
//     }

//     $("body").css('width', size + 'px').css('height', size + 'px');

//     if (first) {
//         sessionStorage['history'] = JSON.stringify([entity.name]);
//         sessionStorage['return'] = 'false';
//     } else if (sessionStorage['return'] === 'false') {
//         var history = JSON.parse(sessionStorage['history']);
//         history.push(entity.name);
//         sessionStorage['history'] = JSON.stringify(history);
//     }
//     sessionStorage['return'] = 'false';
//     var cyto_data = getCytoData(data, entity);
//     var elements = cyto_data.nodes.concat(cyto_data.edges);
//     //elements.forEach(function(e){console.log(e.data)})
//     var cy = cytoscape({
//         container: $(container),
//         elements: elements,

//         style: [ // the stylesheet for the graph
//             {
//                 selector: 'node[category = "c"]',
//                 style: {
//                     'background-opacity': 0,
//                     'label': 'data(name)',
//                     'shape': 'rectangle',
//                     'font-weight': 150,
//                     'color': 'rgb(107,36,50)',
//                     'width': 'data(width)',
//                     'text-valign': "center",
//                     'font-size': '3em',
//                     // 'text-outline-width': 3,
//                     // 'text-outline-color': '#F5A45D',
//                 }
//             },

//             {
//                 selector: 'node[category = "m"]',
//                 style: {
//                     'color': 'rgb(13,60,73)', //rgb(6,63,92)',
//                     'background-opacity': 0,
//                     'label': 'data(name)',
//                     'font-weight': 'bolder',
//                     'text-valign': 'center',
//                     'shape': 'rectangle',
//                     'height': '30px',
//                     'width': 'data(width)',
//                     'text-margin-y': '4px',
//                     'font-size': '3em',
//                 }
//             },

//             {
//                 selector: 'node[category = "i"]',
//                 style: {
//                     'background-opacity': 0,
//                     'label': 'data(name)',
//                     'shape': 'rectangle',
//                     'width': 'data(width)',
//                     'height': '30px',
//                     'font-weight': 'bolder',
//                     'text-valign': "center",
//                     'font-size': '3em',
//                 }
//             },

//             {
//                 selector: 'node[category = "s"]',
//                 style: {
//                     'background-opacity': 0,
//                     'label': 'data(name)',
//                     'shape': 'rectangle',
//                     'width': '80px',
//                     'color': 'rgb(100, 100, 100)',
//                     'font-weight': 150,
//                     'text-valign': "center",
//                     // 'text-outline-width': 2,
//                     // 'text-outline-color': '#888',
//                     'border-width': 0,
//                     'border-color': '#8c8c8c',
//                     'font-size': '3em'
//                 }
//             },

//             {
//                 selector: 'edge',
//                 style: {
//                     'width': 10,
//                     'target-arrow-shape': 'triangle',
//                     'line-color': 'rgb(210, 210, 210)',
//                     'target-arrow-color': 'rgb(180, 180, 180)',
//                     'curve-style': 'bezier',
//                     'label': 'data(label)',
//                     'font-size': '3em'
//                 }
//             }
//         ],

//         layout: {
//             name: 'breadthfirst',
//             fit: true, // whether to fit the viewport to the graph
//             directed: true, // whether the tree is directed downwards (or edges can point in any direction if false)
//             padding: 0, // padding on fit
//             circle: false, // put depths in concentric circles if true, put depths top down if false
//             spacingFactor: 0.65, // positive spacing factor, larger => more space between nodes (N.B. n/a if causes overlap)
//             boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
//             avoidOverlap: true, // prevents node overlap, may overflow boundingBox if not enough space
//             nodeDimensionsIncludeLabels: true, // Excludes the label when calculating node bounding boxes for the layout algorithm
//             roots: undefined, // the roots of the trees
//             maximalAdjustments: 0, // how many times to try to position the nodes in a maximal way (i.e. no backtracking)
//             animate: true, // whether to transition the node positions
//             animationDuration: 1000, // duration of animation in ms if enabled
//             animationEasing: undefined, // easing of animation if enabled,
//             animateFilter: function (node, i) { return node.category == "m"; }, // a function that determines whether the node should be animated.  All nodes animated by default on animate enabled.  Non-animated nodes are positioned immediately when the layout starts
//             ready: undefined, // callback on layoutready
//             stop: undefined, // callback on layoutstop
//             transform: function (node, position) { return position; } // transform a given node position. Useful for changing flow direction in discrete layouts
//         }
//     });

//     cy.ready(function () {

//         if (JSON.parse(sessionStorage['history']).length > 1) {
//             if (!$('#previous_graph').length) {
//                 $(container).parent().append('<button class="btn btn-1 btn-1e" id="previous_graph">Graphe précédent</button>')
//             }

//             $('#previous_graph').click(function (event) {
//                 event.stopImmediatePropagation();
//                 var history = JSON.parse(sessionStorage['history']);
//                 history.pop();
//                 var name = history[history.length - 1];
//                 sessionStorage['history'] = JSON.stringify(history);
//                 sessionStorage['return'] = 'true';
//                 console.log('Click : ' + name);
//                 display_cyto(data, data.entitys.names[name], container, false)
//             })
//         } else if (JSON.parse(sessionStorage['history']).length == 1 && first) {
//             if ($('#previous_graph').length) {
//                 $('#previous_graph').remove();
//             }
//         } else {
//             if ($('#previous_graph').length) {
//                 $('#previous_graph').remove();
//             }
//         }

//         cy.nodes('[category != "s"]').qtip({
//             content: {
//                 text: function () {
//                     var text = '';
//                     var entity = data.entitys.names[this.data().name];
//                     if (entity.wiki) {
//                         text += '<a href=' + this.data().wiki + ' target=_blank>Wikipedia</a>';
//                         text += '<br><br>';
//                     }

//                     if (entity.website) {
//                         text += '<a href=' + this.data().website + ' target=_blank>Go to website</a>';
//                         text += '<br>';
//                     }

//                     text += '<button type = "button" class="click_qtip">Voir plus</button>';

//                     return text
//                 },
//                 title: function () {
//                     return this.data().name;
//                 },
//                 button: true
//             },
//             position: {
//                 my: 'top center',
//                 at: 'bottom center'
//             },
//             style: {
//                 classes: 'qtip-bootstrap',
//                 tip: {
//                     width: 10,
//                     height: 5
//                 }
//             },
//             events: {
//                 visible: function () {

//                     $('.click_qtip').qtip({
//                         style: { classes: 'btn btn-default' }
//                     });

//                     $('.click_qtip').click(function (event) {
//                         var name = event.target.parentNode.parentNode.childNodes[1].childNodes[0].innerHTML;
//                         var parent_1 = $(this).parent();
//                         var parent_2 = parent_1.parent();
//                         parent_2.hide();
//                         display_cyto(data, data.entitys.names[name], container, false)
//                     })
//                 },
//             }
//         });
//     });
//     window.cy = cy;
// }


function getChildren(data, entity, res) {
    var children = data.shares.parents[entity.id];
    if (!children) {
        return [];
    }

    res.push(children);
    for (var s of children) {
        getChildren(data, data.entitys.ids[s.child], res);
    }
    return res
}

function getParents(data, entity, res) {
    var parents = data.shares.children[entity.id];
    if (!parents) {
        return []
    }

    res.push(parents);
    for (var s of parents) {
        getParents(data, data.entitys.ids[s.parent], res)
    }
    return res
}