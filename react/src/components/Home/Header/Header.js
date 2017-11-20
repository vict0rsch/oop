import React, { Component } from 'react'
import HowItWorks from "./HowItWorks";

export default class Header extends Component {

    render() {
        const style = {
            ...this.props.style,
            height: '90px'
        };
        return (
            <div style={style}>
                <div style={{ display: 'inline-block', height: '100%', float: 'left' }}>
                    <h1>Open Ownership Project</h1>
                </div>
                <div style={{ display: 'inline-block', height: '100%', float:'right' }}>
                    {!this.props.show.howItWorks && <HowItWorks {...this.props}/>}
                </div>
            </div>
        )
    }
}
