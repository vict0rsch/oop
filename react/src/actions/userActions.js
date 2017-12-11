export function setUserIsLoggedIn(value) {
    return {
        type: 'SET_USER_IS_LOGGED_IN',
        value
    }
}

export function setUserIsConfirmed(value) {
    return {
        type: 'SET_USER_IS_CONFIRMED',
        value
    }
}

export function logOut() {
    return {
        type: 'LOGOUT'
    }
}

export function setUserData(userData) {
    return {
        type: 'SET_USER_DATA',
        userData
    }
}

export function setUserTimestamp() {
    return {
        type: 'SET_USER_TIMESTAMP'
    }
}