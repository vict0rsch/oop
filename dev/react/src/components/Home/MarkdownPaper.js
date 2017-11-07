import React, { Component } from 'react';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import Markdown from 'react-markdown';
import Paper from 'material-ui/Paper';
import ClearIcon from 'material-ui-icons/Clear';
import Button from 'material-ui/Button';



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


class MarkdownPaper extends Component {
    constructor(props) {
        super(props);
        this.toggleLanguage = this.toggleLanguage.bind(this);

        var lang = navigator.language || navigator.userLanguage;
        lang = lang === 'fr' ? lang : 'en';
        
        var mdSource, swicthToLang;
        if (lang === 'fr') {
            mdSource = this.props.frMdSource;
            swicthToLang = 'en';
        } else {
            mdSource = this.props.enMdSource;
            swicthToLang = 'fr';
        }

        this.state = {
            mdSource,
            swicthToLang,
        };

    }


    toggleLanguage() {
        if (this.state.mdSource === this.props.frMdSource) {
            this.setState(
                {
                    mdSource: this.props.enMdSource,
                    swicthToLang: 'fr'
                }
            );
        } else {
            this.setState(
                {
                    mdSource: this.props.frMdSource,
                    swicthToLang: 'en'
                }
            );
        }
    }


    render() {
        const typoStyle = {
            fontSize: '1.2em',
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
            <div>
                <Paper className={classes.root} elevation={4}>
                    <Button onClick={this.toggleLanguage} style={{ fontSize: '0.8em' }}>
                        (Switch to {this.state.swicthToLang})
                    </Button>
                    <br />
                    <Button onClick={this.props.toggle}>
                        <ClearIcon style={clearStyle} />
                    </Button>
                    <Typography type="body1" style={typoStyle} component="div" className={classes.pos}>
                        <Markdown source={this.state.mdSource} escapeHtml={false} />
                        {this.props.extra}
                    </Typography>
                </Paper>
            </div>
        );

    }
}

export default withStyles(styles)(MarkdownPaper);