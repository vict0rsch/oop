import React, { Component } from 'react'
import InfoBoxEntity from './InfoBoxEntity';

export default class InfoBoxEntityUI extends Component {
    render() {
        return this.props.infoBox.type === 'entity'
            &&
            (
                <div style={{ width: '730px', margin: 'auto' }}>
                    <InfoBoxEntity {...this.props} idToDisplay={this.props.infoBox.data} changeWiki={this.props.changeWiki} />
                </div>
            )
    }
}
