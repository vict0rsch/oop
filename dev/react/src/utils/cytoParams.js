import cytoscape from 'cytoscape';
import dagre from 'cytoscape-dagre';

cytoscape.use(dagre);

const breadthFirstLayout = {
    name: 'breadthfirst',
    fit: true, // whether to fit the viewport to the graph
    directed: true, // whether the tree is directed downwards (or edges can point in any direction if false)
    padding: '2px', // padding on fit
    circle: false, // put depths in concentric circles if true, put depths top down if false
    spacingFactor: 1, // positive spacing factor, larger => more space between nodes (N.B. n/a if causes overlap)
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
};

const dagreLayout = {
    name: 'dagre',
    // dagre algo options, uses default value on undefined
    nodeSep: undefined, // the separation between adjacent nodes in the same rank
    edgeSep: undefined, // the separation between adjacent edges in the same rank
    rankSep: undefined, // the separation between adjacent nodes in the same rank
    rankDir: 'TB', // 'TB' for top to bottom flow, 'LR' for left to right,
    ranker: undefined, // Type of algorithm to assign a rank to each node in the input graph. Possible values: 'network-simplex', 'tight-tree' or 'longest-path'
    minLen: function (edge) { return 1; }, // number of ranks to keep between the source and target of the edge
    edgeWeight: function (edge) { return 1; }, // higher weight edges are generally made shorter and straighter than lower weight edges

    // general layout options
    fit: true, // whether to fit to viewport
    padding: 10, // fit padding
    spacingFactor: undefined, // Applies a multiplicative factor (>0) to expand or compress the overall area that the nodes take up
    nodeDimensionsIncludeLabels: true, // whether labels should be included in determining the space used by a node (default true)
    animate: false, // whether to transition the node positions
    animateFilter: function (node, i) { return true; }, // whether to animate specific nodes when animation is on; non-animated nodes immediately go to their final positions
    animationDuration: 500, // duration of animation in ms if enabled
    animationEasing: undefined, // easing of animation if enabled
    boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
    transform: function (node, pos) { return pos; }, // a function that applies a transform to the final node position
    ready: function () { }, // on layoutready
    stop: function () { } // on layoutstop
};

export function cytoParamsFromContainer(containerElement, cytoData) {
    if (cytoData.edges.length < 10){
        const spacing = 1.8 * Math.pow(cytoData.edges.length, 0.08);
        var layout = dagreLayout;
        layout.spacingFactor = spacing;
    } else {
        const spacing = 0.5 * Math.pow(cytoData.edges.length, 0.08);
        var layout = breadthFirstLayout;
        layout.spacingFactor = spacing;
    }
    
    const nodes = cytoData.nodes.map((v, k) => {
        return {
            data: {
                ...v.data,
                name: v.data.name.replace(/ /g, '\n'),
                widthPx: v.data.width + 'px'
            }
        }
    });

    const baseNodeStyle = {
        'background-opacity': 0,
        'label': 'data(name)',
        'shape': 'bottomroundrectangle',
        'font-weight': 'bold',
        'width': 'data(widthPx)',
        'text-valign': "center",
        'font-size': '3em',
        'compound-sizing-wrt-labels': 'include',
        'source-text-margin-y': '30px',
        'target-text-margin-y': '30px'
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
                }
            },

            {
                selector: 'node[category = "i"]',
                style: {
                    ...baseNodeStyle,
                    'height': '30px',
                    'font-weight': 'bolder',
                }
            },

            {
                selector: 'node[category = "s"]',
                style: {
                    ...baseNodeStyle,
                    'color': 'rgb(100, 100, 100)',
                    'width': '80px',
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
                    'width': 10,
                    'target-arrow-shape': 'triangle',
                    'line-color': 'rgb(210, 210, 210)',
                    'target-arrow-color': 'rgb(180, 180, 180)',
                    'curve-style': 'bezier', // haystack bezier segments unbundled-bezier
                    'label': 'data(label)',
                    'font-size': '3em',
                    'text-rotation': cytoData.edges.length > 10 ? 'autorotate' : 'none',
                }
            }
        ],

        layout: layout
    }
};