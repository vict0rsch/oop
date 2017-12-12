import React, { Component } from 'react';
import HomePaper from '../../Paper/HomePaper'
import Auth from './Auth/Auth'
import EditProfile from './EditProfile/EditProfile';

class ProfilePaper extends Component {

    render() {
        return (
            <div style={{ textAlign: 'center' }}>
                <HomePaper
                    {...this.props}
                    toggle={this.props.toggleProfile}
                    content={
                        <div style={{ textAlign: 'center' }}>
                            <Auth {...this.props} />
                            <EditProfile {...this.props} />
                        </div>
                    } />
            </div>
        );
    }
}

export default ProfilePaper;