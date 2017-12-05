import React from 'react';
import { Control, Form, actions, Field } from 'react-redux-form';
import validator from 'validator';

const isEmail = (val) => {
    console.log('isEmail', val && validator.isEmail(val));
    return val && validator.isEmail(val);
}


class UserForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            passwordsMatch: true,
            usernameIsAvailable: true
        }
    }

    
    componentDidMount() {
        setTimeout(
            () => {
                const usnms = ['Serge', 'Michel', 'FAP', 'PROUT', 'Cool'];
                const index = parseInt(Math.random() * 5, 10);
                this.props.rrfChange('userSignupForm.user.username', usnms[index]);
            },
            2000
        )
    }
    

    asyncCheckUsername(username) {
        return new Promise((resolve, reject) => {
            setTimeout(()=>{
                resolve({usernameIsAvailable: parseInt(Math.random()*10,10) > 7});
            }, 1000)
        })
    }

    handleSubmit(user) {
        // Do whatever you like in here.
        // If you connect the UserForm to the Redux store,
        // you can dispatch actions such as:
        // dispatch(actions.submit('user', somePromise));
        // etc.
        this.props.onSubmit(user)
    }

    handleChange = (model) => {
        console.log('Form is valid:', this.props.userSignupForm.forms.$form.valid)
    }

    render() {

        const passStyle = { color: this.state.passwordsMatch ? 'inherit' : 'red' }
        const usernameStyle = { color: this.state.usernameIsAvailable ? 'inherit': 'red'}

        return (
            <Form
                model="userSignupForm.user"
                onSubmit={(user) => {
                    console.log(user);
                    this.handleSubmit(user)
                }}
                onChange={this.handleChange}
                validateOn='change'
                validators={{
                    '': {
                        passwordsMatch: (vals) => {
                            if (this.state.passwordsMatch !== (vals.password === vals.confirmPassword)) {
                                this.setState(
                                    { passwordsMatch: vals.password === vals.confirmPassword }
                                );
                            }
                            return vals.password === vals.confirmPassword && vals.password.length && vals.confirmPassword.length
                        },
                    },
                }}
            >

                <label style={usernameStyle} htmlFor=".username">Username:</label>
                <Control.text 
                    model=".username" 
                    id=".username"
                    asyncValidators={{
                        available: (val, done) =>this.asyncCheckUsername(val)
                            .then(res => {
                                console.log('Username available: ', res.usernameIsAvailable);
                                if (this.state.usernameIsAvailable !== res.usernameIsAvailable){
                                    this.setState({
                                        usernameIsAvailable: res.usernameIsAvailable
                                    })
                                }
                                done(res.usernameIsAvailable);
                            })
                    }}
                    asyncValidateOn="blur"
                /><br /><br />

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
                <label style={passStyle} htmlFor=".password">Password:</label>
                <Control.text validateOn='change' type="password" model=".password" onChange={() => { }} /><br /><br />

                <label style={passStyle} htmlFor=".confirmPassword">Confirm Password:</label>
                <Control.text validateOn='change' type="password" model=".confirmPassword" onChange={() => { }} /><br /><br />

                <button type="submit" disabled={!this.props.userSignupForm.forms.$form.valid}>
                    Finish registration!
                </button>
            </Form>
        );
    }
}

export default UserForm;