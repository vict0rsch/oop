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
            height: 'fit-content',
            float: 'left'
        };

        if (this.props.clientType === 'chromeExtension') {
            titleStyle.linetHeight = '200%';
        }

        return (
            <div style={parentDivstyle}>
                <div style={titleStyle}>
                    <h1>Open Ownership Project</h1>
                </div>
                <HowItWorks {...this.props} />
            </div>
        )
    }
}
