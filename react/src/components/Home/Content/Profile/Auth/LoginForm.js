import React from 'react';
import { Control, Form } from 'react-redux-form';
import TextInput from '../../../../Utils/TextInput';
import Button from 'material-ui/Button';
import { CircularProgress } from 'material-ui/Progress';
import { isEmail, checkPass } from "../../../../../utils/formValidators";


const buttonDivStyle = {
    textAlign: 'right'
}

class RegisterForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            submitError: this.props.submitError || ''
        }
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.submitError !== this.state.submitError) {
            this.setState({
                submitError: nextProps.submitError
            })
        }
    }


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
        this.setState({
            submitError: ''
        })
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
                    {this.props.pending ?
                        <CircularProgress />
                        :
                        (<Button type="submit" color="primary" disabled={!form.$form.valid} onClick={this.handleClick}>
                            {this.props.translate('login.form.submit')}
                        </Button>)
                    }
                    <br /><br />
                </div>

                {this.state.submitError && this.props.translate('home.profile.errors.' + this.state.submitError)}
            </Form>
        );
    }
}

export default RegisterForm;