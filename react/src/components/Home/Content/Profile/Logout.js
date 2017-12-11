import React, { Component } from 'react';
import Icon from 'react-icons/lib/fa/plane';
import Button from 'material-ui/Button';

export default class Logout extends Component {

    handleClick = (event) => {
        this.props.userLogOut()
    }

    render() {
        return (
            <div>
                <Button color='accent' onClick={this.handleClick}>
                   {this.props.translate('home.profile.logout')} &nbsp; <Icon />
                </Button>
            </div>
        )
    }
}
