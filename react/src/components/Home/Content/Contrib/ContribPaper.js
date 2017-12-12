import React, { Component } from 'react';
import HomePaper from '../../Paper/HomePaper'

class ProfilePaper extends Component {

    render() {
        return (
            <div style={{ textAlign: 'center' }}>
                <HomePaper
                    {...this.props}
                    toggle={this.props.toggleProfile}
                    content={
                        <div style={{ textAlign: 'center' }}>

                        </div>
                    } />
            </div>
        );
    }
}

export default ProfilePaper;