import React, { Component } from 'react';

import Waiting from '../../Waiting';
import getWikiData from '../../../utils/getWikiData';

class WikiCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            extract: <Waiting translate={this.props.translate} toTranslate='graph.wiki.loading' />,
            count: 0
        }
    }

    componentWillReceiveProps(nextProps) {

        // entity.wiki = {
        //     lang: 'language en fr etc.',
        //     title: 'wikipedia page title',
        //     pageid: 'int, pageid'
        // }
        // change 'frwiki' to wiki.lang + 'wiki'

        if (nextProps.infoBox.data === this.props.infoBox.data && this.state.count > 0) {
            return
        }
        this.setState({
            extract: <Waiting translate={this.props.translate} toTranslate='graph.wiki.loading' />,
            count: this.state.count + 1
        });
        const entity = this.props.data.entities.ids[nextProps.infoBox.data];
        console.log(entity.name)

        getWikiData(this, entity);


    }

    render() {
        return (
            <span>
                {this.state.extract}
            </span>
        );
    }
}

export default WikiCard;