import React, { Component } from 'react'
import Button from 'material-ui/Button';
import Icon from 'material-ui-icons/KeyboardArrowDown';

export default class ShowSettings extends Component {
    render() {
        const iconStyle = {
            height: '30px',
            width: '30px'
        };
        return (
            <div style={{ marginTop: '20px' }}>
                <Button raised onClick={this.props.toggleSettings}>
                    {this.props.translate('home.settingsButton')} &nbsp;
                    <Icon style={iconStyle} />
                </Button>
            </div>
        )
    }
}
