import React, { Component } from 'react';
import Spinner from 'react-spinner';

class Waiting extends Component {
    render() {
        return (
            <div>
                <p style={{ textAlign: 'center' }}>Getting Data... </p>
                <br />
                <Spinner
                    style={
                        {
                            height: 50,
                            width: 50,
                        }
                    }
                />
            </div>
        );
    }
}

export default Waiting;