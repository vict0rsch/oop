import React, { Component } from 'react';
import ShowContact from "./ShowContact";
import ContactPaper from './ContactPaper';

class Contact extends Component {
    render() {

        return this.props.show.contact
            ?
            <ContactPaper {...this.props} />
            :
            <ShowContact {...this.props} />

    }
}

export default Contact;