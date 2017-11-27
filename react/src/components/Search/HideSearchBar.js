import React, { Component } from 'react';
import Icon from 'material-ui-icons/Clear';
import Button from 'material-ui/Button';

class HideSearchBar extends Component {

    
    handleCLick = () => {
        this.props.toggleSearchBar();
        this.props.toggleFocusSearchBar();
    }

    render() {
        const iconStyle = {
            height: '30px',
            width: '30px',
        };
        return (
            <div style={{display:'inline-block', verticalAlign:'top'}}>
                <Button onClick={this.handleCLick} style={{ verticalAlign: 'middle', height:'30px', 'padding': 0}}><Icon style={iconStyle}/></Button>
            </div>
        );
    }
}

export default HideSearchBar;