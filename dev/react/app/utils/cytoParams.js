import cytoscape from 'cytoscape';

export function cytoParamsFromContainer(containerElement, cytoData) {
    return {
        container: containerElement,
        elements: {
            nodes: cytoData.nodes,
            edges: cytoData.edges
        },

        style: [ // the stylesheet for the graph
            {
                selector: 'node[category = "c"]',
                style: {
                    'background-opacity': 0,
                    'label': 'data(name)',
                    'shape': 'rectangle',
                    'font-weight': 'bold',
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
                    'font-weight': 'bold',
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
            maximalAdjustments: 100, // how many times to try to position the nodes in a maximal way (i.e. no backtracking)
            animate: false, // whether to transition the node positions
            animationDuration: 1000, // duration of animation in ms if enabled
            animationEasing: undefined, // easing of animation if enabled,
            animateFilter: function (node, i) { return node.category == "m"; }, // a function that determines whether the node should be animated.  All nodes animated by default on animate enabled.  Non-animated nodes are positioned immediately when the layout starts
            ready: undefined, // callback on layoutready
            stop: undefined, // callback on layoutstop
            transform: function (node, position) { return position; } // transform a given node position. Useful for changing flow direction in discrete layouts
        }
    }
};

export function cytoReady(cy) {

    // if (JSON.parse(sessionStorage['history']).length > 1) {
    //     if (!$('#previous_graph').length) {
    //         $(container).parent().append('<button class="btn btn-1 btn-1e" id="previous_graph">Graphe précédent</button>')
    //     }

    //     $('#previous_graph').click(function (event) {
    //         event.stopImmediatePropagation();
    //         var history = JSON.parse(sessionStorage['history']);
    //         history.pop();
    //         var name = history[history.length - 1];
    //         sessionStorage['history'] = JSON.stringify(history);
    //         sessionStorage['return'] = 'true';
    //         console.log('Click : ' + name);
    //         display_cyto(data, data.entitys.name[name], container, false)
    //     })
    // } else if (JSON.parse(sessionStorage['history']).length == 1 && first) {
    //     if ($('#previous_graph').length) {
    //         $('#previous_graph').remove()
    //     }
    // } else {
    //     if ($('#previous_graph').length) {
    //         $('#previous_graph').remove()
    //     }
    // }
    cy.on('click', 'node', function (event) {
        console.log(event);
        var target = event.cyTarget;
        console.log(target);
        var sourceName = target.data("source");
        var targetName = target.data("target");

        var x = event.cyPosition.x;
        var y = event.cyPosition.y;

        console.log(target)
    });
}

            // cy.nodes('[category != "s"]').qtip({
            //     content: {
            //         text: function () {
            //             var text = '';
            //             var entity = data.entitys.name[this.data().name];
            //             if (entity.wiki) {
            //                 text += '<a href=' + this.data().wiki + ' target=_blank>Wikipedia</a>';
            //                 text += '<br><br>'
            //             }

            //             if (entity.website) {
            //                 text += '<a href=' + this.data().website + ' target=_blank>Go to website</a>';
            //                 text += '<br>'
            //             }

            //             text += '<button type = "button" class="click_qtip">Voir plus</button>';

            //             return text
            //         },
            //         title: function () {
            //             return this.data().name
            //         },
            //         button: true
            //     },
            //     position: {
            //         my: 'top center',
            //         at: 'bottom center'
            //     },
            //     style: {
            //         classes: 'qtip-bootstrap',
            //         tip: {
            //             width: 10,
            //             height: 5
            //         }
            //     },
            //     events: {
            //         visible: function () {

            //             $('.click_qtip').qtip({
            //                 style: { classes: 'btn btn-default' }
            //             });

            //             $('.click_qtip').click(function (event) {
            //                 var name = event.target.parentNode.parentNode.childNodes[1].childNodes[0].innerHTML;
            //                 var parent_1 = $(this).parent();
            //                 var parent_2 = parent_1.parent();
            //                 parent_2.hide();
            //                 display_cyto(data, data.entitys.name[name], container, false)
            //             })
            //         },
            //     }
            // });
            // }