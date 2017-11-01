import _ from 'lodash';

export function formatData(serverData) {
    let shareId = -100;
    let data = {
        entitys: {
            names: {},
            ids: {}
        },
        shares: {
            children: {},
            parents: {}
        }
    };

    serverData.entities.map((v, i) => {
        data.entitys.names[v.name] = v;
        data.entitys.ids[v.id] = v;
    });

    serverData.shares.map((v, i) => {
        console.log(v);
        const newShare = {
            child: v.child_id,
            parent: v.parent_id,
            special: v.special,
            share: v.value,
            id:shareId
        };
        shareId -= 1;
        console.log(newShare);
        if (_.has(data.shares.children, newShare.child)) {
            data.shares.children[newShare.child].push(newShare);
        } else {
            data.shares.children[newShare.child] = [newShare];
        }

        if (_.has(data.shares.parents, newShare.parent)) {
            data.shares.parents[newShare.parent].push(newShare);
        } else {
            data.shares.parents[newShare.parent] = [newShare];
        }
    });
    console.log('FORMATTED DATA', data);
    return data;

};