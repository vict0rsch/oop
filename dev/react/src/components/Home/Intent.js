import React, { Component } from 'react';
import enMdSource from '../../static/texts/intentFr';
import frMdSource from '../../static/texts/intentFr';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import Markdown from 'react-markdown';
import Paper from 'material-ui/Paper';
import ClearIcon from 'material-ui-icons/Clear';
import Button from 'material-ui/Button';

let lang = navigator.language || navigator.userLanguage;
lang = lang === 'fr' ? lang : 'en';

var mdSource;
if (lang === 'fr') {
    mdSource = frMdSource;
} else {
    mdSource = enMdSource;
}

const styles = theme => ({
    root: theme.mixins.gutters({
        padding: 30,
        marginTop: theme.spacing.unit * 3,
        width: '700px',
        display: 'inline-block',
        marginBottom: '30px'
    }),
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
        color: theme.palette.text.primary,
    },
});


class Intent extends Component {

    render() {
        const typoStyle = {
            fontSize: '1em',
            textAlign: 'justify',
            textJustify: 'auto',
            fontWeight: 200,
            padding: '20px 50px'
        };

        const clearStyle = {
            height: '40px',
            width: '40px'
        };

        const { classes } = this.props;

        return (
            <div style={{
                textAlign: 'center',
                marginLeft: '-8px',
                width: '800px'
            }}>
                <Paper className={classes.root} elevation={4}>
                    <Typography type="body1" style={typoStyle} component="div" className={classes.pos}>
                        <Markdown source={mdSource} escapeHtml={false} />
                        <a href="https://www.monde-diplomatique.fr/cartes/ppa" rel="noopener noreferrer" target="_blank">*Le Monde Diplomatique</a>
                    </Typography>
                    <Button  onClick={this.props.toggleIntent}>
                        <ClearIcon style={ clearStyle }/>
                    </Button>
                </Paper>
            </div>
        );

    }
}

export default withStyles(styles)(Intent);