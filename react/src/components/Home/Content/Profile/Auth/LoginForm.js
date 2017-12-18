import React from 'react';
import { Control, Form } from 'react-redux-form';
import validator from 'validator';
import TextInput from '../TextInput';
import Button from 'material-ui/Button';


const isEmail = (val) => {
    return val && validator.isEmail(val);
}

const checkPass = val => {
    return val && val.length > 5;
}


const buttonDivStyle = {
    textAlign: 'right'
}

class RegisterForm extends React.Component {

    handleSubmit = (user) => {
        // Do whatever you like in here.
        // If you connect the RegisterForm to the Redux store,
        // you can dispatch actions such as:
        // dispatch(actions.submit('user', somePromise));
        // etc.
        this.props.onSubmit(user)
    }

    handleClick = (event) => {
        this.props.makePending();
        this.props.rrfSubmit('loginForm.user')
    }

    handleChange = (model) => {
        if (this.props.pending) {
            this.props.makeNotPending();
        }
    }

    render() {

        const form = this.props.loginForm.forms;
        return (
            <Form
                model="loginForm.user"
                onSubmit={(user) => {
                    console.log(user);
                    this.handleSubmit(user)
                }}
                onChange={this.handleChange}
            >

                <Control.text
                    model=".email"
                    validators={{
                        required: (val) => val && val.length,
                        isEmail
                    }}
                    validateOn="change"
                    component={TextInput}
                    controlProps={{
                        model: this.props.loginForm.user,
                        label: this.props.translate('login.email.label'),
                        id: 'email',
                    }}
                /><br /><br />

                <Control.text
                    validators={{
                        required: (val) => val && val.length,
                        checkPass
                    }}
                    validateOn='change'
                    type="password"
                    model=".password"
                    component={TextInput}
                    controlProps={{
                        model: this.props.loginForm.user,
                        label: this.props.translate('login.password.label'),
                        id: 'password',
                        type: "password",
                    }}
                /><br /><br />

                <div style={buttonDivStyle}>
                    <Button type="submit" color="primary" disabled={!form.$form.valid || this.props.pending} onClick={this.handleClick}>
                        {this.props.translate('login.form.submit')}
                    </Button><br /><br />
                </div>

                {this.props.submitError && this.props.translate('home.profile.errors.' + this.props.submitError)}
            </Form>
        );
    }
}

export default RegisterForm;