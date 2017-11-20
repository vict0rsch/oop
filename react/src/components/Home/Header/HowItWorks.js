import React, { Component } from 'react'
import IconButton from 'material-ui/IconButton';
import Icon from 'material-ui-icons/HelpOutline';

export default class HowItWorks extends Component {
    render() {
        return (
            <IconButton
                onClick={this.props.toggleHowItWorks}
                style={{ height: '100%' }}>
                <Icon />
            </IconButton>
        )
    }
}
