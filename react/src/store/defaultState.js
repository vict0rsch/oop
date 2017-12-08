const defaultState = {
    data: {},
    dataIsAvailable: false,
    show: {
        howItWorks: true
    },
    currentDisplay: -1,
    infoBox: {
        type: '',
        data: []
    },
    user: {
        isLoggedIn: false,
        isConfirmed: false,
        isValid: false
    }
};

export default defaultState;