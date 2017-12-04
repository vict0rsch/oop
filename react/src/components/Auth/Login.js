import React, { Component } from 'react'
import LoginForm from './LoginForm';
import { connect } from 'react-redux';
import mapStateToProps from '../../store/defaultMapStateToProps';
import mapDispatchToProps from '../../store/defaultMapDispatchToProps';

const showResults = values => {
    console.log(values);
    return new Promise(resolve => {
        setTimeout(() => {
            // simulate server latency
            alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`)
            resolve()
        }, 500)
    })
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
