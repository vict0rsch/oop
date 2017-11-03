import React, { Component } from 'react';
import Icon from 'material-ui-icons/Search';
import Button from 'material-ui/Button';

class HomeSearchBar extends Component {
    render() {
        const iconStyle = {
            height: '30px',
            width: '30px'
        };
        return (
            <div style={{ marginTop: '20px' }}>
                <Button raised onClick={this.props.toggleSearchBar} style={{ verticalAlign: 'middle' }}>
                    <span style={{ verticalAlign: 'middle' }}>
                        Search the Graph &nbsp;
                    </span>
                    <Icon style={iconStyle} />
                </Button>
            </div>
        );
    }
}

export default HomeSearchBar;