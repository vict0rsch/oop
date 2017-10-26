function dataToOptions(data) {
  const dict = data.entitys.ids;
  return Object.keys(dict).map((k) => {
    const label = dict[k].name;
    const value = label.toLowerCase();
    const id = k;
    return { label, value, id };
  });
}

function getIdSet(data) {
  const s = new Set(Object.keys(data.entitys.ids).map(k => parseInt(k, 10)));
  return s;
}

function data(state = [], action) {
  switch (action.type) {
    case 'SET_DATA':
      return {
        ...action.data,
        idSet: getIdSet(action.data),
        optionsData: dataToOptions(action.data),
      };

    default:
      return state;
  }
}

export default data;
