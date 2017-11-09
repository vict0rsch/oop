import React, { Component } from 'react';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import Markdown from 'react-markdown';
import HomePaper from './HomePaper';
import ClearIcon from 'material-ui-icons/Clear';
import Button from 'material-ui/Button';

const styles = theme => ({
    root: theme.mixins.gutters({
        padding: 30,
        marginTop: theme.spacing.unit * 3,
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

        return <HomePaper
            content={
                (<div>
                    <Button onClick={this.props.toggle}>
                        <ClearIcon style={clearStyle} />
                    </Button>
                    <Typography type="body1" style={typoStyle} component="div" className={classes.pos}>
                        <Markdown source={this.props.source} escapeHtml={false} />
                        {this.props.extra}
                    </Typography>
                </div>
                )
            }
        />

    }
}

export default withStyles(styles)(MarkdownPaper);