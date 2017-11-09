import React, { Component } from 'react';
import SearchButton from './SearchButton';
import HomeButton from './HomeButton';

class SideButtons extends Component {
    render() {

        const sideButtonDivStyle = {
            position: 'fixed',
            top: '80px',
            left: '5%'
        }

        return (
            <div style={sideButtonDivStyle}>
                <HomeButton {...this.props} />
                <SearchButton {...this.props} />
            </div>
        );
    }
}


export default SideButtons;