import React from 'react';
import { Link } from 'react-router';
import CytoContainer from './CytoContainer';

class Graph extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {}
        };
    }

    componentWillMount() {
        this.setState({
            data: JSON.parse(localStorage.data)
        });
    }

    render() {
        return (
            <div className='graph-div'>
                Graph.js Component -> {this.props.params.entityId}
                <CytoContainer {...this.props} data={this.state.data}/>
            </div>
        );
    }
};

export default Graph;