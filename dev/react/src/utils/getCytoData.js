const WIDTH_FACTOR = 20;

export default function getCytoData(data, entity) {
    if (localStorage['cytoData_' + entity.id]) {
        // console.log('using local data');
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
        var width = parseInt(e.name.length * WIDTH_FACTOR, 10);
        if (e.category === 'm') {
            width *= 1.5;
            width = parseInt(width, 10);
        }
        e.width = width;
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

    result = { nodes: nodes.concat(other_parents.nodes), edges: shares.concat(other_parents.shares) };

    // let newResult = {
    //     nodes: [],
    //     edges: []
    // };
    // newResult.edges = result.edges.map((v, k) => {
    //     let newV = { data: {...v.data} };
    //     const src = newV.data.source;
    //     const trgt = newV.data.target;
    //     const srcName = src > 0 ? data.entitys.ids[src].name : 'special';
    //     const trgtName = trgt > 0 ? data.entitys.ids[trgt].name : 'special';
    //     console.log(src, srcName, '--->', trgtName, trgt, newV);
    //     return newV;
    // });

    // newResult.nodes = result.nodes.map((v, k) => {
    //     let newV = { data: {...v.data} };
    //     return newV;
    // });

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
            temp_node.width = temp_node.name.length * WIDTH_FACTOR;
            result.nodes.push({ data: temp_node });
        }
    }
    return result;
}


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