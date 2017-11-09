import React, { Component } from 'react';
import LanguageSelect from './LanguageSelect';
import HomePaper from '../Paper/HomePaper'

class SettingsPaper extends Component {

    render() {
        return (
            <div style={{ textAlign: 'center' }}>
                <HomePaper
                    {...this.props}
                    toggle={this.props.toggleSettings}
                    content={
                        <LanguageSelect {...this.props} />
                    } />
            </div>
        );
    }
}

export default SettingsPaper;