export function cytoParamsFromContainer(containerElement, cytoData) {
    const newEdges = cytoData.edges.map((v, k) => {
        return {
            data : {
                ...v.data,
                id: v.data.id * 1000
            }
        }
    });
    console.log(newEdges);
    return {
        container: containerElement,
        elements: {
            nodes: [...cytoData.nodes],
            edges: [...newEdges]
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
                    'width': 15,
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
            spacingFactor: 1, // positive spacing factor, larger => more space between nodes (N.B. n/a if causes overlap)
            boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
            avoidOverlap: true, // prevents node overlap, may overflow boundingBox if not enough space
            nodeDimensionsIncludeLabels: true, // Excludes the label when calculating node bounding boxes for the layout algorithm
            roots: undefined, // the roots of the trees
            maximalAdjustments: 1000, // how many times to try to position the nodes in a maximal way (i.e. no backtracking)
            animate: false, // whether to transition the node positions
            animationDuration: 1000, // duration of animation in ms if enabled
            animationEasing: undefined, // easing of animation if enabled,
            animateFilter: function (node, i) { return node.category === "m"; }, // a function that determines whether the node should be animated.  All nodes animated by default on animate enabled.  Non-animated nodes are positioned immediately when the layout starts
            ready: undefined, // callback on layoutready
            stop: undefined, // callback on layoutstop
            transform: function (node, position) { return position; } // transform a given node position. Useful for changing flow direction in discrete layouts
        }
    }
};