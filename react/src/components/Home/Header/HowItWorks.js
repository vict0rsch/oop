import React, { Component } from 'react'
import IconButton from 'material-ui/IconButton';
import Icon from 'material-ui-icons/HelpOutline';

export default class HowItWorks extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        setTimeout(this.props.toggleHowItWorks, 100)
    }
    render() {
        return (
            <IconButton
                onClick={this.handleClick}
                style={{ height: '100%' }}>
                <Icon />
            </IconButton>
        )
    }
}
