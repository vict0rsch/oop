import React, { Component } from 'react';
import SearchButton from './SearchButton';
import HomeButton from './HomeButton';

class SideButtons extends Component {
    render() {
        return (
            <div>
                {!this.props.show.searchBar && <SearchButton {...this.props} />}
                <HomeButton {...this.props} />
            </div>
        );
    }
}


export default SideButtons;