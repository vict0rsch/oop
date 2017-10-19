function dataToOptions(data) {
    let dict = data.entitys.ids
    return Object.keys(dict).map(k => {
        let label = dict[k].name;
        let value = label.toLowerCase();
        let id = k;
        return { label, value, id }
    })
}

function getIdSet(data) {
    let s = new Set(Object.keys(data.entitys.ids).map(k => parseInt(k, 10)))
    return s;
}

function data(state = [], action) {

    switch (action.type) {
        case 'SET_DATA':
            let data = action.data;
            return {
                ...data,
                idSet: getIdSet(data),
                optionsData: dataToOptions(data)
            };

        default:
            return state;
    }
}

export default data;