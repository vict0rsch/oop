import React, { Component } from 'react';
import ShowButton from "../ShowButton";
import SettingsPaper from './SettingsPaper';

class Settings extends Component {
    render() {

        return this.props.show.settings
            ?
            <SettingsPaper {...this.props} />
            :
            <ShowButton
                {...this.props}
                toggle={this.props.toggleSettings}
                toTranslate={'home.settingsButton'}
            />

    }
}

export default Settings;