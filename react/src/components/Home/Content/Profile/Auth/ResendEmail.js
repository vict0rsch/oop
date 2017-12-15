import React, { Component } from 'react'
import Icon from 'react-icons/lib/go/gift';
import Button from 'material-ui/Button';

const buttonStyle = {
    width: '50px',
    minWidth: '20px'
};


export default class ResendEmail extends Component {

    handleClick = (event) => {
        this.props.resendEmail()
    }

    render() {
        return (
            <div>
                {this.props.translate('home.profile.resend.confirm')}
                <br /><br />
                {this.props.translate('home.profile.resend.notReceived')}
                
                <Button onClick={this.handleClick} style={buttonStyle}>
                    <Icon />
                </Button>
            </div>
        )
    }
}
