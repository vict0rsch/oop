import React, { Component } from 'react'
import Icon from 'react-icons/lib/go/gift';
import Button from 'material-ui/Button';
import RefreshIcon from 'material-ui-icons/Refresh'

const buttonStyle = {
    width: '50px',
    minWidth: '20px'
};


export default class ResendEmail extends Component {

    state = {
        refreshStatusDisabled: false,
        resendDisabled: false
    }

    handleResendClick = (event) => {
        this.props.resendEmail()
        this.setState({
            resendDisabled: true
        });
        setTimeout(
            () => {
                this.setState({ resendDisabled: false })
            }, 1500)
    }

    handleRefreshStatusClick = (event) => {
        this.props.setUserStatus(this, true);
        this.setState({
            refreshStatusDisabled: true
        });
        setTimeout(
            () => {
                if (!JSON.parse(localStorage['reduxPersist:user']).isConfirmed) {
                    this.setState({ refreshStatusDisabled: false })
                }
            }, 3000)
    }

    render() {
        return (
            <div>
                {this.props.translate('home.profile.resend.confirm')}
                <Button onClick={this.handleRefreshStatusClick} style={buttonStyle} disabled={this.state.refreshStatusDisabled}>
                    <RefreshIcon />
                </Button>
                <br /><br />
                {this.props.translate('home.profile.resend.notReceived')}

                <Button onClick={this.handleResendClick} style={buttonStyle} disabled={this.state.resendDisabled}>
                    <Icon />
                </Button>
            </div>
        )
    }
}
