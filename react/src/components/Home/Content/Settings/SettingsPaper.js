import React, { Component } from 'react';
import LanguageSelect from './LanguageSelect';
import ResetApp from './ResetApp';
import HomePaper from '../../Paper/HomePaper'
import MarkdownPaper from '../../Paper/MarkdownPaper';


class SettingsPaper extends Component {

    render() {
        const extra = this.props.clientType === 'extension' ? this.props.translate('home.contactNewLink') : '';

        return (
            <div style={{ textAlign: 'center' }}>
                <HomePaper
                    {...this.props}
                    toggle={this.props.toggleSettings}
                    content={
                        <div style={{ textAlign: 'center' }}>
                            <LanguageSelect {...this.props} />
                            <ResetApp {...this.props} />
                        </div>
                    } />
                <MarkdownPaper
                    {...this.props}
                    source={this.props.translate('home.contactPaperMd') + extra}
                    toggle={this.props.toggleContact}
                />
            </div>
        );
    }
}

export default SettingsPaper;