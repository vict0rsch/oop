import React from 'react';
import { Control, Form } from 'react-redux-form';
import validator from 'validator';
import TextInput from './TextInput';
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

    handleChange = (model) => {
        console.log('Form is valid:', this.props.userLoginForm.forms.$form.valid)
    }

    render() {

        const form = this.props.userLoginForm.forms;
        console.log('Hello Form')
        return (
            <Form
                model="userLoginForm.user"
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
                        model: this.props.userLoginForm.user,
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
                        model: this.props.userLoginForm.user,
                        label: this.props.translate('login.password.label'),
                        id: 'password',
                        type: "password",
                    }}
                /><br /><br />

                <div style={buttonDivStyle}>
                    <Button type="submit" color="primary" disabled={!form.$form.valid}>
                        {this.props.translate('login.form.submit')}
                    </Button><br /><br />
                </div>

                {this.props.submitError}
            </Form>
        );
    }
}

export default RegisterForm;