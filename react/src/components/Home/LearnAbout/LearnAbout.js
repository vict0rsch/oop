import React, { Component } from 'react';
import ShowIntent from "./ShowIntent";
import Intent from './Intent';

class LearnAbout extends Component {
    render() {

        return this.props.show.intent
            ?
            <Intent {...this.props} />
            :
            <ShowIntent {...this.props} />

    }
}

export default LearnAbout;