import React, { Component } from 'react';
import SearchButton from './SearchButton';
import HomeButton from './HomeButton';
import RefreshButton from './RefreshButton';
import PreviousButton from './PreviousButton';
import NextButton from './NextButton';

class SideButtons extends Component {
    render() {

        let sideButtonDivStyle = {
            position: 'fixed',
            top: '80px',
            left: '5%'
        }

        if (this.props.clientType === 'mobile'){
            sideButtonDivStyle.top = '30px';
            sideButtonDivStyle.width = '70px';
            sideButtonDivStyle.left= '2%'
        }

        return (
            <div style={sideButtonDivStyle}>
                <HomeButton {...this.props} />
                <SearchButton {...this.props} />
                {this.props.clientType !== 'mobile' && <RefreshButton {...this.props} />}
                {this.props.clientType !== 'mobile' && <PreviousButton {...this.props} />}
                {this.props.clientType !== 'mobile' && <NextButton {...this.props} />}
            </div>
        );
    }
}


export default SideButtons;