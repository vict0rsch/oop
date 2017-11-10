import React, { Component } from 'react';
import ShowButton from "../ShowButton";
import ContactPaper from './ContactPaper';

class Contact extends Component {
    render() {

        return this.props.show.contact
            ?
            <ContactPaper {...this.props} />
            :
            <ShowButton
                {...this.props}
                toggle={this.props.toggleContact}
                toTranslate={'home.contactButton'}
            />

    }
}

export default Contact;