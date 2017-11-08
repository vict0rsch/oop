import React, { Component } from 'react';
import Icon from 'material-ui-icons/KeyboardArrowDown';
import Button from 'material-ui/Button';
import Intent from './Intent';

class LearnAbout extends Component {
    render() {
        const iconStyle = {
            height: '30px',
            width: '30px'
        };
        return this.props.show.intent
            ?
            <Intent {...this.props} />
            :
            <div style={{ marginTop: '20px' }}>
                <Button onClick={this.props.toggleIntent} style={{ verticalAlign: 'middle' }}><span style={{ verticalAlign: 'middle' }}>Learn about OOP &nbsp;</span> <Icon style={iconStyle} /></Button>
            </div>

    }
}

export default LearnAbout;