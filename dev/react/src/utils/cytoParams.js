export function cytoParamsFromContainer(containerElement, cytoData) {
    const spacing = 0.65 * Math.pow(cytoData.edges.length, 0.08);
    console.log(spacing);
    const nodes = cytoData.nodes.map((v, k) => {
        return {
            data: {
                ...v.data,
                name: v.data.name.replace(/ /g, '\n'),
                widthPx: v.data.width + 'px'
            }
        }
    });
    console.log(nodes);

    const baseNodeStyle = {
        'background-opacity': 0,
        'label': 'data(name)',
        'shape': 'rectangle',
        'font-weight': 'bold',
        'width': 'data(widthPx)',
        'text-valign': "center",
        'font-size': '3em',
    };

    return {
        container: containerElement,
        elements: {
            nodes: nodes,
            edges: cytoData.edges
        },

        style: [ // the stylesheet for the graph
            {
                selector: 'node[category = "c"]',
                style: {
                    ...baseNodeStyle,
                    'color': 'rgb(107,36,50)',
                }
            },

            {
                selector: 'node[category = "m"]',
                style: {
                    ...baseNodeStyle,
                    'color': 'rgb(13,60,73)',
                    'font-weight': 'bolder',
                    'height': '30px',
                    'text-margin-y': '4px',
                    'font-size': '3em',
                }
            },

            {
                selector: 'node[category = "i"]',
                style: {
                    ...baseNodeStyle,
                    'height': '30px',
                    'font-weight': 'bolder',
                    'text-valign': "center",
                    'font-size': '3em',
                }
            },

            {
                selector: 'node[category = "s"]',
                style: {
                    ...baseNodeStyle,
                    'color': 'rgb(100, 100, 100)',
                    'font-size': '3em',
                    'width':'80px',
                }
            },

            {
                selector: 'node[width > 250]',
                style: {
                    ...baseNodeStyle,
                    'height': '100px',
                    'text-valign': 'center',
                    'text-wrap': 'wrap',
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
            padding: '2px', // padding on fit
            circle: false, // put depths in concentric circles if true, put depths top down if false
            spacingFactor: spacing, // positive spacing factor, larger => more space between nodes (N.B. n/a if causes overlap)
            boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
            avoidOverlap: true, // prevents node overlap, may overflow boundingBox if not enough space
            nodeDimensionsIncludeLabels: false, // Excludes the label when calculating node bounding boxes for the layout algorithm
            roots: undefined, // the roots of the trees
            maximalAdjustments: 10, // how many times to try to position the nodes in a maximal way (i.e. no backtracking)
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