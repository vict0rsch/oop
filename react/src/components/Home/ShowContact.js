import React, { Component } from 'react'
import Button from 'material-ui/Button';
import Icon from 'material-ui-icons/KeyboardArrowDown';

export default class ShowContact extends Component {
    render() {
        const iconStyle = {
            height: '30px',
            width: '30px'
        };
        return (
            <div style={{ marginTop: '20px' }}>
                <Button raised onClick={this.props.toggleContact}>
                    {this.props.translate('home.contact')} &nbsp;
                    <Icon style={iconStyle} />
                </Button>
            </div>
        )
    }
}
