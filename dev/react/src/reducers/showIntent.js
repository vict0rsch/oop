function showIntent(state = false, action) {
    switch (action.type) {
        case 'TOGGLE_INTENT':
            return !state;
        default:
            return state;
    }
}

export default showIntent;