import React, { Component } from 'react'
import RegisterForm from './RegisterForm';
import Axios from 'axios';
import Dialog, {
    DialogContent,
    DialogTitle,
    withMobileDialog,
} from 'material-ui/Dialog';
import Icon from 'react-icons/lib/fa/refresh';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

const fullScreenMinWidth = 650;

const refreshUsernameButtonStyle = {
    minWidth: '15px',
    minHeight: '15px',
    padding: '8px'
};

const dialogContentStyle = {
    textAlign: 'center'
};

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            submitError: '',
            open: false
        }
    }

    setRandomUsername = () => {
        Axios.get(
            'http://localhost:5000/random_username').then(
            (res) => {
                if (res.data) {
                    console.log('Dispatching change to ', res.data.username)
                    this.props.rrfChange('userSignupForm.user.username', res.data.username);
                }
            },
            (err) => {
                console.log(err)
            }
            ).catch((e) => {
                console.log(e)
            });
    }

    showResults = values => {
        const escaped = JSON.parse(JSON.stringify(values));
        this.props.registerUser(this, escaped);
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
                <Button onClick={this.handleClickOpen} color="primary">{this.props.translate('home.profile.register')}</Button>
                <Dialog
                    fullScreen={fullScreen}
                    open={this.state.open}
                    onRequestClose={this.handleRequestClose}
                >
                    <DialogTitle>{this.props.translate('home.profile.registerTitle')}</DialogTitle>
                    <DialogContent component={'div'} style={dialogContentStyle}>
                        <Typography type="body1">
                            {this.props.translate('home.profile.registerContent')}
                            <Button onClick={this.setRandomUsername} color="primary" style={refreshUsernameButtonStyle}><Icon /></Button>
                        </Typography>
                        <br /><br />
                        <RegisterForm
                            {...this.props}
                            onSubmit={this.showResults}
                            submitError={this.state.submitError}
                            setRandomUsername={this.setRandomUsername} />
                    </DialogContent>
                </Dialog>
            </div>
        )
    }
}


export default withMobileDialog()(Register);