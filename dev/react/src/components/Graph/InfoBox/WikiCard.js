import React, { Component } from 'react';
import axios from 'axios';

class WikiCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            extract: ''
        }
    }

    componentWillReceiveProps(nextProps) {

        const entity = nextProps.entity;

        const wiki = entity.wiki.split('/');
        const pageTitle = wiki[wiki.length - 1];

        let lang = navigator.language || navigator.userLanguage;
        lang = lang === 'fr' ? lang : 'en';

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
            }, (error) => {
                console.log('Get Wiki Error', error)
            }
        )
    }

    render() {
        // const query = getWikiExtract(this.props.entity);
        return (
            <span>
                {this.state.extract}
            </span>
        );
    }
}

export default WikiCard;