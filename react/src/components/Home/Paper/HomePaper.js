import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';

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

        const { classes } = this.props;

        return (
            <div>
                <Paper style={{ width: widths[this.props.clientType] }} className={classes.root} elevation={4}>
                    {this.props.content}
                </Paper>
            </div>
        );

    }
}

export default withStyles(styles)(HomePaper);