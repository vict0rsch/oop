import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import URL from 'url-parse';
import OpenInNew from 'material-ui-icons/OpenInNew';

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



class EntityCard extends Component {

    render() {
        const { classes } = this.props;

        const wiki = this.props.wiki ? (
            <Button target='_blank' color="primary" className={classes.button} href={this.props.wiki}>
                Wikipedia &nbsp;<OpenInNew />
            </Button>) : undefined;

        const website = this.props.website ? (
            <Button target='_blank' className={classes.button} href={this.props.website}>
                Website &nbsp; <OpenInNew />
            </Button>) : undefined;

        const style = {
            marginTop: '40px'
        };

        return (
            <div style={style}>
                {/* <Card className={classes.card}>
                    <CardContent> */}
                <Typography type="headline" component="h2">
                    {this.props.title}
                </Typography>
                    {wiki}
                {website}
                {this.props.graphButton}
                {/* </CardContent>
                </Card> */}
                <Typography type="body1" className={classes.title}>
                    {this.props.longName || ''}
                </Typography>
            </div>
        );

    }
}

export default withStyles(styles)(EntityCard);