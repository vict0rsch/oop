import React, { Component } from 'react';
import ContribPaper from './ContribPaper';

class Contrib extends Component {
    render() {

        return this.props.show.contrib
            ?
            <ContribPaper {...this.props} />
            :
            ''

    }
}

export default Contrib;