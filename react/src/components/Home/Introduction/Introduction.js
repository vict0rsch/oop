import React, { Component } from 'react'
import Tooltip from 'material-ui/Tooltip'
import Button from 'material-ui/Button';


export default class Introduction extends Component {
    render() {
        const defaultIntroStyle = {
            margin: '5% 15%',
            textAlign: 'justify',
            lineHeight: '1.6em'
        }

        const introStyles = {
            'mobile': {
                ...defaultIntroStyle,
                margin: '5%',
                fontWeight: 400
            },
            'browser': {
                ...defaultIntroStyle
            },
            'chromeExtension': {
                ...defaultIntroStyle,
                margin: '5% 10%',
                fontSize: '1.15em'
            }
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

        let content;
        if (this.props.clientType === "chromeExtension" || 1) {
            if (this.props.show.howItWorks) {
                content = (
                    <div style={introStyles[this.props.clientType]}>
                        {this.props.translate('home.intro.a')}
                        <br /><br />
                        {this.props.translate('home.intro.b')}
                        <Tooltip placement="bottom" title={tooltipTitle}>
                            <span> <span style={{ borderBottom: '1px dashed #999' }}>
                                {this.props.translate('home.intro.c')}
                            </span> </span>
                        </Tooltip>
                        {this.props.translate('home.intro.d')}
                        <br /><br />
                        {this.props.translate('home.intro.f')}<br />
                        <div style={{ textAlign: 'right' }}>
                            <Button color='primary' onClick={this.props.toggleHowItWorks} style={{ minHeight: '1em' }}>
                                {this.props.translate('home.intro.button')}
                            </Button>
                        </div>
                    </div>
                );
            } else {
                content = ''
            }

        } else {
            content = (
                <div style={introStyles[this.props.clientType]}>
                    {this.props.clientType === "mobile" && this.props.translate('home.intro.am')}
                    {this.props.clientType === "browser" && this.props.translate('home.intro.aw')}
                    <br /><br />
                    {this.props.translate('home.intro.f')}
                </div>
            );

        }

        return content;
    }
}
