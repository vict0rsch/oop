import React, { Component } from 'react';
import SearchButton from './SearchButton';
import HomeButton from './HomeButton';

class SideButtons extends Component {
    render() {
        return (
            <div>
                <HomeButton {...this.props} />
                <SearchButton {...this.props} />
            </div>
        );
    }
}


export default SideButtons;