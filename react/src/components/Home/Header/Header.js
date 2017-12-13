import React, { Component } from 'react'
import HowItWorks from "./HowItWorks";

const defaultTitleStyle = {
    display: 'inline-block',
    height: 'fit-content',
}
const titleStyle = {
    "browser": {
        ...defaultTitleStyle,
        height: '100px',
    },
    "mobile": {
        ...defaultTitleStyle,
        height: '80px',
        fontSize: '0.7em',
        margin: 'auto'
    },
    "extension": {
        ...defaultTitleStyle,
        height: '100px',
    },
};

const parentDivstyle = {
    "browser": {
        height: '100px'
    },
    "mobile": {
        height: '150px'
    },
    "extension": {
        height: '100px'
    }
};

export default class Header extends Component {

    render() {
        const title = this.props.clientType === "mobile" ? <span>Open<br />Ownership<br />Project</span> : "Open Ownership Project"
        return (
            <div id='HomeHeader' style={{ ...this.props.style, ...parentDivstyle[this.props.clientType] }}>
                <div style={titleStyle[this.props.clientType]}>
                    <h1>{title}</h1>
                </div>
                <HowItWorks {...this.props} />
            </div>
        )
    }
}