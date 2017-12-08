function user(state = {}, action) {
    switch (action.type) {
        case 'SET_USER_IS_LOGGED_IN':
            return {
                ...state,
                isLoggedIn: action.value,
                isValid: action.value && state.isConfirmed
            }
        case 'SET_USER_IS_CONFIRMED':
            return {
                ...state,
                isConfirmed: action.value,
                isValid: action.value && state.isLoggedIn
            }
        default:
            return state;
    }
}

export default user;