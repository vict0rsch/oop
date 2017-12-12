/* eslint-disable flowtype/require-valid-file-annotation */

import React from 'react';
import Register from './Register'
import ResendEmail from './ResendEmail';
import Logout from './Logout';
import Login from './Login';

export default class Auth extends React.Component {

    render() {
        return (
            <div>
                {!this.props.user.isLoggedIn && <Register {...this.props} />}
                {!this.props.user.isLoggedIn && <Login {...this.props} />}
                {this.props.user.isLoggedIn && <Logout {...this.props} />} <br/><br/>
                {this.props.user.isLoggedIn && !this.props.user.isConfirmed && <ResendEmail {...this.props} />}
            </div>
        );
    }
}