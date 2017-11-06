import React, { Component } from 'react';
import Icon from 'material-ui-icons/Clear';
import Button from 'material-ui/Button';

class HideSearchBar extends Component {
    render() {
        const iconStyle = {
            height: '30px',
            width: '30px',
        };
        return (
            <div style={{display:'inline-block', verticalAlign:'middle'}}>
                <Button onClick={this.props.toggleSearchBar} style={{ verticalAlign: 'middle', height:'30px', 'padding': 0}}><Icon style={iconStyle}/></Button>
            </div>
        );
    }
}

export default HideSearchBar;