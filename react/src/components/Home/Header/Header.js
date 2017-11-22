import React, { Component } from 'react'
import HowItWorks from "./HowItWorks";

export default class Header extends Component {

    render() {
        const parentDivstyle = {
            ...this.props.style,
            height: this.props.clientType === 'mobile' ? '150px' : '100px',
        };
        const titleStyle = {
            display: 'inline-block', 
            height: '100%', 
            float: 'left'
        };

        if (this.props.clientType === 'chromeExtension'){
            titleStyle.linetHeight = '200%';
        }

        let buttonStyle = {
            display: 'inline-block', 
            height: '100%', 
            float: 'left'
        };

        if (this.props.clientType === 'mobile'){
            buttonStyle = {
                position: 'absolute',
                right: '0px'
            };
        }

        return (
            <div style={parentDivstyle}>
                <div style={titleStyle}>
                    <h1>Open Ownership Project</h1>
                </div>
                <div style={buttonStyle}>
                    {!this.props.show.howItWorks && <HowItWorks {...this.props} />}
                </div>
            </div>
        )
    }
}
