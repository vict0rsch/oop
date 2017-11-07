import _ from 'lodash';

export function formatData(serverData) {
    let shareId = -100;
    let data = {
        entities: {
            names: {},
            ids: {}
        },
        shares: {
            children: {},
            parents: {}
        }
    };

    serverData.entities.map((v, i) => {
        data.entities.names[v.name] = v;
        data.entities.ids[v.id] = v;
        return undefined;
    });

    serverData.shares.map((v, i) => {
        const newShare = {
            child_id: v.child_id,
            parent_id: v.parent_id,
            special: v.special,
            share: v.value,
            id: shareId
        };
        shareId -= 1;

        if (_.has(data.shares.children, newShare.child_id)) {
            data.shares.children[newShare.child_id].push(newShare);
        } else {
            data.shares.children[newShare.child_id] = [newShare];
        }

        if (_.has(data.shares.parents, newShare.parent_id)) {
            data.shares.parents[newShare.parent_id].push(newShare);
        } else {
            data.shares.parents[newShare.parent_id] = [newShare];
        }
        return undefined;
    });
    return data;

};