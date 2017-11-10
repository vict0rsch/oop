import React, { Component } from 'react'
import Button from 'material-ui/Button';
import KeyboardArrowDownIcon from 'material-ui-icons/KeyboardArrowDown';
import SearchIcon from 'material-ui-icons/Search';

export default class ShowButton extends Component {
    render() {
        const iconStyle = {
            height: '30px',
            width: '30px'
        };
        const icon = this.props.search ? <SearchIcon style={iconStyle} /> : <KeyboardArrowDownIcon style={iconStyle} />;
        return (
            <div style={{ marginTop: '20px' }}>
                <Button raised onClick={this.props.toggle}>
                    {this.props.translate(this.props.toTranslate)} &nbsp;
                    {icon}
                </Button>
            </div>
        )
    }
}
