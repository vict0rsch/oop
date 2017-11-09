import React, { Component } from 'react';
import ShowSearchBar from './ShowSearchBar';
import SearchBar from '../../Search/SearchBar';
import Waiting from '../../Waiting';

class HomeSearchBar extends Component {
    render() {
        return this.props.dataIsAvailable 
            ? 
                this.props.show.searchBar
                ?
                <SearchBar {...this.props} />
                :
                <ShowSearchBar {...this.props} />
            :
            <Waiting/>
    }
}


export default HomeSearchBar;