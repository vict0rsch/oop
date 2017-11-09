import React, { Component } from 'react'
import Button from 'material-ui/Button';
import Icon from 'material-ui-icons/KeyboardArrowDown';

export default class ShowIntent extends Component {
    render() {
        const iconStyle = {
            height: '30px',
            width: '30px'
        };
        return (
            <div style={{ marginTop: '20px' }}>
                <Button raised onClick={this.props.toggleIntent} className='show'>
                    {this.props.translate('home.learnAbout')} &nbsp;
                    <Icon style={iconStyle} />
                </Button>
            </div>
        )
    }
}
