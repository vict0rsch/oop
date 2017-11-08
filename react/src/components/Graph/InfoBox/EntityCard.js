import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import OpenInNew from 'material-ui-icons/OpenInNew';
import WikiCard from './WikiCard';

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

        const wiki = this.props.entity.wiki ? (
            <Button target='_blank' color="primary" className={classes.button} href={this.props.entity.wiki}>
                Wikipedia &nbsp;<OpenInNew />
            </Button>) : undefined;

        const website = this.props.entity.website ? (
            <Button target='_blank' className={classes.button} href={this.props.entity.website}>
                {this.props.translate('graph.websiteButton')} &nbsp; <OpenInNew />
            </Button>) : undefined;

        const style = {
            marginTop: '40px'
        };

        return (
            <div style={style}>

                {/* <CardContent> */}
                <div>
                    <Typography type="headline" style={{ display: 'inline-block' }}>
                        {this.props.entity.name}
                    </Typography>
                    <Typography type="body2" className={classes.title} style={{ display: 'inline-block', marginLeft: '20px' }}>
                        {this.props.entity.long_name}
                    </Typography>
                </div>

                {wiki}
                {website}
                {this.props.graphButton}
                {/* </CardContent> */}
                <div style={{ textAlign: 'justify', textJustify: 'auto' }}>
                    <Typography type="body1" className={classes.title}>
                        <WikiCard entity={this.props.entity} changeWiki={this.props.changeWiki}/>
                    </Typography>
                </div>

            </div>
        );

    }
}

export default withStyles(styles)(EntityCard);