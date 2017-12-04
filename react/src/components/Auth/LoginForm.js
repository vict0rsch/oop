import React from 'react';
import { Control, Form, actions, Field } from 'react-redux-form';
import validator from 'validator';

const isEmail = (val) => {
    console.log('isEmail', val && validator.isEmail(val));
    return val && validator.isEmail(val);
}


class UserForm extends React.Component {
    handleSubmit(user) {
        // Do whatever you like in here.
        // If you connect the UserForm to the Redux store,
        // you can dispatch actions such as:
        // dispatch(actions.submit('user', somePromise));
        // etc.
    }

    handleChange = (model) => {
        console.log(this.props.userSignupForm.forms.$form.valid)
    }

    render() {
        return (
            <Form
                model="userSignupForm.user"
                onSubmit={(user) => {
                    console.log(user);
                    this.handleSubmit(user)
                }}
                onChange={this.handleChange}
                validators={{
                    '': {
                        passwordsMatch: (vals) => { console.log('passwordsMatch', vals.password === vals.confirmPassword); return vals.password === vals.confirmPassword },
                    },
                }}
            >
                <label htmlFor=".firstName">First name:</label>
                <Control.text model=".firstName" id=".firstName" /><br /><br />

                <label htmlFor=".lastName">Last name:</label>
                <Control.text model=".lastName" id=".lastName" /><br /><br />
                <label htmlFor=".email">Email:</label>
                <Control.text
                    model=".email"
                    validators={{
                        required: (val) => val && val.length,
                        isEmail
                    }}
                    validateOn="change"
                /><br /><br />




                <label htmlFor=".password">Password:</label>
                <Control type="password" model=".password" onChange={()=>{}}/><br /><br />

                <label htmlFor=".confirmPassword">Confirm Password:</label>
                <Control type="password" model=".confirmPassword" onChange={()=>{}} /><br /><br />

                <button type="submit">
                    Finish registration!
                </button>
            </Form>
        );
    }
}

export default UserForm;