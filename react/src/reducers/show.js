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
        case 'TOGGLE_EXTENSION':
        return {
            ...state,
            extension: !state.extension
        }
        case 'CLOSE_ALL':
            let newState = {
                ...state
            }
            for (var i in state){
                newState[i] = false
            }
            return newState;

        default:
            return state;
    }
}

export default show;