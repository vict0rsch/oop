import React, { Component } from 'react';
import enMdSource from '../../static/texts/intentFr';
import frMdSource from '../../static/texts/intentFr';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import Markdown from 'react-markdown';

let lang = navigator.language || navigator.userLanguage;
lang = lang === 'fr' ? lang : 'en';

var mdSource;
if (lang === 'fr') {
    mdSource = frMdSource;
} else {
    mdSource = enMdSource;
}

const styles = theme => ({
    card: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        marginBottom: 16,
        fontSize: 14,
        color: theme.palette.text.secondary,
    },
    pos: {
        marginBottom: 12,
        color: theme.palette.text.secondary,
    },
});


class Intent extends Component {

    render() {
        const typoStyle = {
            display: 'inline-block',
            fontSize: '0.8em',
            width: '700px',
            textAlign: 'justify',
            textJustify: 'auto',
            fontWeight:350,
            marginLeft:'-8px',
            letterSpacing: '2'
        };

        return (
            <div style={{ width: '100%', textAlign: 'center' }}>
                <Typography type="headline" style={typoStyle} >
                    <Markdown source={mdSource} escapeHtml={false}/>
                    <a href="https://www.monde-diplomatique.fr/cartes/ppa" target="_blank">*Le Monde Diplomatique</a>
                </Typography>
                
            </div>);

    }
}

export default withStyles(styles)(Intent);