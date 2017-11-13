import React, { Component } from 'react';
import SearchBar from '../../Search/SearchBar';
import Waiting from '../../Waiting';

class HomeSearchBar extends Component {
    render() {
        return this.props.dataIsAvailable
            ?
            this.props.show.searchBar
                ?
                <SearchBar {...this.props} hideButton/>
                :
                ''
            :
            <Waiting translate={this.props.translate} toTranslate='home.loadingData'/>
    }
}


export default HomeSearchBar;