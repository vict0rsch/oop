import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import URL from 'url-parse';

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

        const wiki = this.props.wiki ? <Button  color="primary" className={classes.button} href={this.props.wiki}>Wikipedia</Button> : undefined;
        const website = this.props.website ? <Button  className={classes.button} href={this.props.website}>{URL(this.props.website).hostname} </Button> : undefined;
        
        return (
            <div>
                {/* <Card className={classes.card}>
                    <CardContent> */}
                        <Typography type="body1" className={classes.title}>
                            {this.props.longName || ''}
                        </Typography>
                        <Typography type="headline" component="h2">
                            {this.props.title}
                        </Typography>
                        {wiki}
                        {website}
                        {this.props.graphButton}
                    {/* </CardContent>
                </Card> */}
            </div>
        );

    }
}

export default withStyles(styles)(EntityCard);