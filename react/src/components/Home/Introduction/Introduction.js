import React, { Component } from 'react'
import Tooltip from 'material-ui/Tooltip'

export default class Introduction extends Component {
    render() {
        const introStyle = {
            margin: '5% 15%',
            textAlign: 'justify',
            lineHeight: '1.6em'
        }
        
        const tooltipTitle = (
            <div style={{
                fontSize: '1.3em',
                textAlign: 'center',
                padding: '5px',
            }}>
                {this.props.translate('home.intro.e')}<br />
                <img alt='Extension Icon' src='/icon.png' style={{
                    height: '20px',
                    width: '20px'
                }} />
            </div>
        );

        return (
            <div style={introStyle}>
                {this.props.translate('home.intro.a')} 
                <br/><br/>
                {this.props.translate('home.intro.b')} 
                <Tooltip placement="bottom" title={tooltipTitle}><span> <span style={{ borderBottom: '1px dashed #999' }}>{this.props.translate('home.intro.c')}</span> </span></Tooltip>
                {this.props.translate('home.intro.d')}
                <br/><br/>
                {this.props.translate('home.intro.f')}
            </div>
        )
    }
}
