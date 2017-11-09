import React, { Component } from 'react';
import LanguageSelect from './LanguageSelect';
import HomePaper from '../Paper/HomePaper'

class SettingsPaper extends Component {

    render() {
        return <HomePaper content={
            <LanguageSelect {...this.props} />
        } />
    }
}

export default SettingsPaper;