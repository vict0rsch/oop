import React, { Component } from 'react';
import ShowSettings from "./ShowSettings";
import SettingsPaper from './SettingsPaper';

class Settings extends Component {
    render() {

        return this.props.show.settings
            ?
            <SettingsPaper {...this.props} />
            :
            <ShowSettings {...this.props} />

    }
}

export default Settings;