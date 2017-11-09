import React, { Component } from 'react';
import MarkdownPaper from '../MarkdownPaper';

class ContactPaper extends Component {

    

    render() {
        return (
            <div style={{textAlign:'center'}}>
                <MarkdownPaper
                    {...this.props}
                    source={this.props.translate('home.contactPaperMd')}
                    toggle={this.props.toggleContact}
                />
            </div>
        );
    }
}

export default ContactPaper;