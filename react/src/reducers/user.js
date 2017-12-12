import Axios from 'axios';

function user(state = {}, action) {
    switch (action.type) {

        case 'SET_USER_DATA':
            return {
                ...state,
                data: action.userData
            }

        case 'SET_USER_TIMESTAMP':
            return {
                ...state,
                timestamp: Math.round((new Date()).getTime() / 1000)
            }

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

        case 'REGISTER':
            let { component, values } = action;
            Axios.post("http://localhost:5000/auth/register", values).then(
                (resp) => {
                    let closed = false;
                    if (resp.data) {
                        if (resp.data.status === 'success' && resp.data.auth_token) {
                            console.log("User successfully registered");
                            localStorage.setItem('_jwt', resp.data.auth_token);
                            component.setState(
                                { submitError: '' }
                            );
                            component.props.setUserIsLoggedIn(true);
                            component.props.setUserData(resp.data.user);
                            component.props.setUserTimestamp();
                            component.handleRequestClose();
                            closed = true;

                        }
                    }
                    if (!closed) {
                        component.makeNotPending();
                    }
                },
                (err) => {
                    if (err.response.status === 401) {
                        component.setState(
                            { submitError: err.response.data.message }
                        );
                    }
                    component.makeNotPending();
                }
            )
            return {
                ...state
            }

        case 'LOGOUT':
            Axios.post(
                "http://localhost:5000/auth/logout",
                { logout: true },
                {
                    headers: {
                        Authorization: "Bearer " + localStorage['_jwt']
                    }
                }
            ).then(
                (resp) => {
                    if (resp.data) {
                        if (resp.data.status === 'success') {
                            console.log('Remote Logged Out');
                        }
                    }
                },
                (err) => {
                    console.log('LOGOUT error', err.response.data.message);
                }
                )
            localStorage.removeItem('_jwt');
            return {
                ...state,
                isLoggedIn: false,
                isConfirmed: false,
                isValid: false,
                data: {}
            }


        case 'SET_USER_STATUS':
            component = action.component;
            const checkTimeout = 15;
            const ts = component.props.user.timestamp;

            if (ts && Math.round(new Date().getTime() / 1000) - ts < checkTimeout) {
                return {
                    ...state
                }
            }
            Axios.post(
                "http://localhost:5000/auth/status",
                { status: true },
                {
                    headers: {
                        Authorization: 'Bearer: ' + localStorage['_jwt']
                    }
                }
            ).then(
                resp => {
                    console.log(resp);
                    if (resp.data) {
                        if (resp.data.status === 'success' && resp.data.auth_token) {
                            localStorage.setItem('_jwt', resp.data.auth_token);
                            component.props.setUserIsLoggedIn(true);
                            component.props.setUserIsConfirmed(resp.data.userData.confirmed);
                            component.props.setUserData(resp.data.userData);
                            component.props.setUserTimestamp();
                        }
                    }
                },
                err => {
                    console.log('SET_USER_STATUS', err.response.data.message);
                    component.props.userLogOut();
                }
                )
            return {
                ...state
            }

        case 'RESEND_EMAIL':
            Axios.post(
                "http://localhost:5000/auth/resend_email",
                { resend: true },
                {
                    headers: {
                        Authorization: "Bearer " + localStorage['_jwt']
                    }
                }
            ).then(
                (resp) => {
                    if (resp.data) {
                        if (resp.data.status === 'success') {
                            console.log('Email Resent');
                        }
                    }
                },
                (err) => {
                    console.log('RESEND_EMAIL', err.response.data.message);
                })
            return {
                ...state
            }
        case 'USER_LOGIN':
            component = action.component;
            values = action.values;
            Axios.post("http://localhost:5000/auth/login", values).then(
                (resp) => {
                    let closed = false;
                    if (resp.data) {
                        if (resp.data.status === 'success' && resp.data.auth_token) {
                            localStorage.setItem('_jwt', resp.data.auth_token);
                            component.setState(
                                { submitError: '' }
                            );
                            component.handleRequestClose();
                            component.props.setUserIsLoggedIn(true);
                            component.props.setUserIsConfirmed(resp.data.user.confirmed);
                            component.props.setUserData(resp.data.user);
                            component.props.setUserTimestamp();
                            closed = true;
                        }
                    }
                    if (!closed) {
                        component.makeNotPending();
                    }
                },
                (err) => {
                    console.log('USER_LOGIN', err.response.data.message);
                    console.log(err.response)
                    if (err.response.data.message) {
                        component.setState(
                            { submitError: err.response.data.message }
                        );
                    }
                    component.makeNotPending()
                }
            );
            return {
                ...state
            }
        default:
            return state;
    }
}

export default user;