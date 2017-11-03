function showSearchBar(state = false, action) {
    switch (action.type) {
        case 'TOGGLE_SEARCH_BAR':
            return !state;
        default:
            return state;
    }
}

export default showSearchBar;