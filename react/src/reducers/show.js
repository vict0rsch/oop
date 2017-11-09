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
        case 'TOGGLE_CONTACT':
            return {
                ...state,
                contact: !state.contact
            };
        case 'TOGGLE_SETTINGS':
            return {
                ...state,
                settings: !state.settings
            };
        default:
            return state;
    }
}

export default show;