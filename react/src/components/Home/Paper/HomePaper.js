import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import ClearIcon from 'material-ui-icons/Clear';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

const styles = theme => ({
    root: theme.mixins.gutters({
        padding: 30,
        marginTop: theme.spacing.unit * 3,
        display: 'inline-block',
        marginBottom: '30px'
    }),
});


class HomePaper extends Component {

    render() {

        const widths = {
            'chromeExtension': '700px',
            'mobile': '90%',
            'browser': '60%'
        }

        const clearStyle = {
            height: '40px',
            width: '40px'
        };

        const typoStyle = {
            fontSize: '1.2em',
            textAlign: 'justify',
            textJustify: 'auto',
            fontWeight: 200,
            padding: '20px 50px'
        };

        const typoStyles = {
            'browser': {
                ...typoStyle,
                fontSize: '1em',
            },
            'chromeExtension': {
                ...typoStyle
            },
            'mobile': {
                ...typoStyle,
                fontSize: '0.8em',
                padding: '20px'
            }
        }




        const { classes } = this.props;

        return (
            <div style={{ marginLeft: this.props.clientType === 'browser' ? '-50px' : '0' }}>
                <Paper style={{ width: widths[this.props.clientType] }} className={classes.root} elevation={4}>
                    <Button onClick={this.props.toggle}>
                        <ClearIcon style={clearStyle} />
                    </Button>
                    <Typography type="body1" style={typoStyles[this.props.clientType]} component="div" >
                        {this.props.content}
                    </Typography>
                </Paper>
            </div>
        );

    }
}

export default withStyles(styles)(HomePaper);