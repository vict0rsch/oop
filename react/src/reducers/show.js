function show(state = false, action) {
    switch (action.type) {
        case 'TOGGLE_INTENT':
            return {
                ...state,
                intent: !state.intent
            };
        case 'TOGGLE_SEARCH_BAR':
            return {
                ...state,
                searchBar: !state.searchBar
            };
        default:
            return state;
    }
}

export default show;