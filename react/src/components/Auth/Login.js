import React, { Component } from 'react'
import LoginForm from './LoginForm';
import { connect } from 'react-redux';
import mapStateToProps from '../../store/defaultMapStateToProps';
import mapDispatchToProps from '../../store/defaultMapDispatchToProps';
import Axios from 'axios';

const showResults = values => {
    const escaped = JSON.parse(JSON.stringify(values));
    alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);
    Axios.post("http://localhost:5000/auth/register", escaped).then(
        (resp) => {
            console.log(resp);
        },
        (err) => {
            console.log(err);
        }
    )
}
class Login extends Component {
    render() {
        return (
            <div>
                <LoginForm {...this.props} onSubmit={showResults} />
            </div>
        )
    }
}

const _Login = connect(mapStateToProps, mapDispatchToProps)(Login);

export default _Login;
