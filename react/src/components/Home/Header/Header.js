import React, { Component } from 'react'
import HowItWorks from "./HowItWorks";

const defaultTitleStyle = {
    display: 'inline-block',
    height: 'fit-content',
    float: 'left'
}
const titleStyle = {
    "browser": {
        ...defaultTitleStyle,
        height: '100px'
    },
    "mobile": {
        ...defaultTitleStyle,
        height: '150px'
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


    componentDidMount() {
        if (localStorage.getItem('_jwt')) {
            if (this.props.user.timestamp && Math.round(new Date().getTime() / 1000) - this.props.user.timestamp > 15) {
                console.log('Fetching status...')
                this.props.setUserStatus(this);
            }
        }
    }


    render() {

        return (
            <div id='HomeHeader' style={{ ...this.props.style, ...parentDivstyle[this.props.clientType] }}>
                <div style={titleStyle[this.props.clientType]}>
                    <h1>Open Ownership Project</h1>
                </div>
                <HowItWorks {...this.props} />
            </div>
        )
    }
}
