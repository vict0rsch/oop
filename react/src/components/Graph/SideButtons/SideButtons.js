import React, { Component } from 'react';
import SearchButton from './SearchButton';
import HomeButton from './HomeButton';
import RefreshButton from './RefreshButton';
import PreviousButton from './PreviousButton';
import NextButton from './NextButton';
import HideSideButton from './HideSideButton';
import Legend from './Legend';



class SideButtons extends Component {
    render() {

        if (!sessionStorage.graphHistory || !sessionStorage.location) {
            const location = this.props.match.params.entityId
            sessionStorage.graphHistory = '["' + location + '"]';
            sessionStorage.location = '0';
        }

        let sideButtonDivStyle = {
            position: 'unset'
        }

        if (this.props.clientType === 'mobile') {
            sideButtonDivStyle.top = '30px';
            sideButtonDivStyle.width = '70px';
            sideButtonDivStyle.left = '3px';
            sideButtonDivStyle.top = '40px';
            sideButtonDivStyle.position = 'fixed';
        }
        else {
            const left = this.props.clientType === 'browser' ? 0.15 * window.innerWidth - 20 + 8 + 'px' : '6%';
            sideButtonDivStyle.top = '40px';
            sideButtonDivStyle.left = left
            sideButtonDivStyle.position = 'absolute'
        }

        let legendDivStyle = { ...sideButtonDivStyle };
        legendDivStyle.right = legendDivStyle.left;
        legendDivStyle.width = this.props.clientType === 'mobile' ? '125px' : sideButtonDivStyle.width;

        delete legendDivStyle.left;

        return (
            <div>
                <div style={sideButtonDivStyle}>
                    <HideSideButton {...this.props} />
                    {this.props.show.sideButtons && <HomeButton {...this.props} />}
                    {this.props.show.sideButtons && <SearchButton {...this.props} />}
                    {this.props.clientType !== 'mobile' && this.props.show.sideButtons && <RefreshButton {...this.props} />}
                    {this.props.clientType !== 'mobile' && this.props.show.sideButtons && <PreviousButton {...this.props} />}
                    {this.props.clientType !== 'mobile' && this.props.show.sideButtons && <NextButton {...this.props} />}
                </div>
                <div style={legendDivStyle}>
                    {this.props.show.sideButtons && this.props.show.legend && <Legend {...this.props} />}
                </div>
            </div>
        );
    }
}


export default SideButtons;
