import React, { Component } from 'react';
import ShowButton from '../ShowButton';
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
                <ShowButton
                    {...this.props}
                    toggle={this.props.toggleSearchBar}
                    toTranslate={'home.searchBar'}
                    search
                />
            :
            <Waiting translate={this.props.translate} toTranslate='home.loadingData'/>
    }
}


export default HomeSearchBar;