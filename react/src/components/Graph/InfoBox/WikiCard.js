import React, { Component } from 'react';
import axios from 'axios';
import Waiting from '../../Waiting';

class WikiCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            extract: <Waiting translate={this.props.translate} toTranslate='graph.loadingWiki' />
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.changeWiki) {
            this.setState(
                {
                    extract: <Waiting translate={this.props.translate} toTranslate='graph.loadingWiki' />
                }
            );
        }

        const entity = nextProps.entity;

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
                            extract: ''
                        }
                    );
                }
            },
            (error) => {
                console.log('Get Wiki Error', error)
                this.setState(
                    {
                        extract: ''
                    }
                );
            }
        ).catch((error) => {
            console.log('Get Wiki Javascript Caught Error', error)
            this.setState(
                {
                    extract: ''
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