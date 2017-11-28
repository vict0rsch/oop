import React, { Component } from 'react'
import InfoBoxEntity from './InfoBoxEntity';

export default class InfoBoxEntityUI extends Component {
    render() {

        const defaultStyle = {
            margin: 'auto'
        };

        const styles = {
            'browser': {
                ...defaultStyle,
                width: '70%'    
            },
            'extension': {
                ...defaultStyle,
                width: '634px'
            },
            'mobile': {
                ...defaultStyle
            }
        }
        return this.props.infoBox.type === 'entity'
            &&
            (
                <div style={styles[this.props.clientType]}>
                    <InfoBoxEntity {...this.props} idToDisplay={this.props.infoBox.data} changeWiki={this.props.changeWiki} />
                </div>
            )
    }
}
