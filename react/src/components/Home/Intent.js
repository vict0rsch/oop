import React, { Component } from 'react';
import MarkdownPaper from './MarkdownPaper';
import enMdSource from '../../static/texts/intentEn';
import frMdSource from '../../static/texts/intentFr';

class Intent extends Component {
    render() {
        const link = <a href="https://www.monde-diplomatique.fr/cartes/ppa" rel="noopener noreferrer" target="_blank">*Le Monde Diplomatique</a>;
        return (
            <div style={{textAlign:'center'}}>
                <MarkdownPaper
                    {...this.props}
                    enMdSource={enMdSource}
                    frMdSource={frMdSource}
                    extra={link}
                    toggle={this.props.toggleIntent}
                />
            </div>
        );
    }
}

export default Intent;