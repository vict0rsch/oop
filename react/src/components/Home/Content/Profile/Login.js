import React, { Component } from 'react'
import LoginForm from './LoginForm';
import Axios from 'axios';
import Dialog, {
    DialogContent,
    DialogTitle,
    withMobileDialog,
} from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

const fullScreenMinWidth = 650;


const dialogContentStyle = {
    textAlign: 'center'
};

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            submitError: '',
            open: false
        }
    }

    showResults = values => {
        const escaped = JSON.parse(JSON.stringify(values));
        console.log('submitted')
        Axios.post("http://localhost:5000/auth/login", escaped).then(
            (resp) => {
                console.log(resp);
                if (resp.data) {
                    if (resp.data.status === 'success' && resp.data.auth_token) {
                        localStorage.setItem('_jwt', resp.data.auth_token);
                        this.setState(
                            { submitError: '' }
                        );
                        this.handleRequestClose();
                        this.props.setUserIsLoggedIn(true);
                        this.props.setUserIsConfirmed(resp.data.user.confirmed);
                        this.props.setUserData(resp.data.user);
                        this.props.setUserTimestamp();
                    }
                }
            },
            (err) => {
                console.log(err, err.response)
                if (err.response.status === 401) {
                    this.setState(
                        { submitError: err.response.data.message }
                    );
                }
            }
        )
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleRequestClose = () => {
        this.setState({ open: false });
    };


    render() {
        let { fullScreen } = this.props;
        if (this.props.clientType === 'extension' || window.innerWidth > fullScreenMinWidth) {
            fullScreen = false;
        }

        return (
            <div>
                <Button onClick={this.handleClickOpen} color="primary">
                    {/* {this.props.translate('home.profile.register')} */}
                    Log In
                </Button>
                <Dialog
                    fullScreen={fullScreen}
                    open={this.state.open}
                    onRequestClose={this.handleRequestClose}
                >
                    <DialogTitle>Log In</DialogTitle>
                    <DialogContent component={'div'} style={dialogContentStyle}>
                        <Typography type="body1">
                            Welcome Back!
                        </Typography>
                        <br /><br />
                        <LoginForm
                            {...this.props}
                            onSubmit={this.showResults}
                            submitError={this.state.submitError}
                        />
                    </DialogContent>
                </Dialog>
            </div>
        )
    }
}


export default withMobileDialog()(Login);