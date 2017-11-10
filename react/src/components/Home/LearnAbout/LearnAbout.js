import React, { Component } from 'react';
import ShowButton from "../ShowButton";
import Intent from './Intent';

class LearnAbout extends Component {
    render() {

        return this.props.show.intent
            ?
            <Intent {...this.props} />
            :
            <ShowButton
                {...this.props}
                toggle={this.props.toggleIntent}
                toTranslate={'home.learnAbout'}
            />

    }
}

export default LearnAbout;