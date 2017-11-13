import React, { Component } from 'react';
import axios from 'axios';
import Waiting from '../../Waiting';

class WikiCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            extract: <Waiting translate={this.props.translate} toTranslate='graph.wiki.loading' />,
            count:0
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.infoBox.data === this.props.infoBox.data && this.state.count > 0) {
            return
        }
        this.setState({
            count: this.state.count + 1
        });
        const entity = this.props.data.entities.ids[nextProps.infoBox.data];
        console.log(entity.name)

        const wiki = entity.wiki.split('/');
        const pageTitle = wiki[wiki.length - 1];

        let lang = nextProps.currentLanguage;

        let query_url = 'https://' + lang + '.wikipedia.org/w/api.php?origin=*&format=json&action=query&prop=extracts&exintro=&explaintext=&titles='
        let escapedTitle = pageTitle.indexOf('%') > -1 ? pageTitle : encodeURIComponent(pageTitle);
        escapedTitle = escapedTitle.replace('%25C3%2589', 'E').replace("'", '%27');
        query_url += escapedTitle;


        axios.get(query_url).then(
            (response) => {
                if (response.data.query) {
                    const pages = response.data.query.pages;
                    const wiki_id = Object.keys(pages)[0];
                    if (wiki_id) {
                        this.setState(
                            {
                                extract: pages[wiki_id].extract
                            }
                        );
                    }
                } else {
                    console.log('No data.query', response);
                    this.setState(
                        {
                            extract: this.props.translate('graph.wiki.noData')
                        }
                    );
                }
            },
            (error) => {
                console.log('Get Wiki Error', error)
                this.setState(
                    {
                        extract: this.props.translate('graph.wiki.cannotConnect')
                    }
                );
            }
        ).catch((error) => {
            console.log('Get Wiki Javascript Caught Error', error)
            this.setState(
                {
                    extract: this.translate('graph.wiki.jsError')
                }
            );
        })
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