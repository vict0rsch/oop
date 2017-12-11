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
        case 'LOGOUT':
            localStorage.removeItem('_jwt');
            return {
                ...state,
                isLoggedIn: false,
                isConfirmed: false,
                isValid: false,
                data: {}
            }
        case 'SET_USER_DATA':
            return {
                ...state,
                data: action.userData
            }
        case 'SET_USER_TIMESAMP':
            return {
            ...state,
            timestamp: Math.round((new Date()).getTime() / 1000)
        }
        default:
            return state;
    }
}

export default user;