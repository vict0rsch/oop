import React, { Component } from 'react';
import LanguageSelect from './LanguageSelect';
import ResetApp from './ResetApp';
import ShowLegend from './ShowLegend';
import ShowChips from './ShowChips';
import HomePaper from '../../Paper/HomePaper'

const leftTdStyle = {
    width: '50%',
    textAlign: 'left'
}

const rightTdStyle = {
    ...leftTdStyle,
    textAlign: 'right'
}

class SettingsPaper extends Component {

    render() {
        return (
            <div style={{ textAlign: 'center' }}>
                <HomePaper
                    {...this.props}
                    toggle={this.props.toggleSettings}
                    content={
                        <table style={{
                            margin: 'auto',
                            width: '80%'
                        }}>
                            <tbody>
                                <tr>
                                    <td style={leftTdStyle}>
                                        <LanguageSelect {...this.props} />
                                    </td>
                                    <td style={rightTdStyle}>
                                        <ResetApp {...this.props} />
                                    </td>
                                </tr>
                                <tr>
                                    <td style={leftTdStyle}>
                                        <ShowLegend {...this.props} />
                                    </td>
                                    <td style={rightTdStyle}>
                                        <ShowChips {...this.props} />
                                    </td>
                                </tr>

                                <tr>
                                    <td style={leftTdStyle}>

                                    </td>

                                    <td style={rightTdStyle}>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    } />
            </div>
        );
    }
}

export default SettingsPaper;