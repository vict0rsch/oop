import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import WikiCard from './WikiCard';
import WikiButton from "./WikiButton";
import WebsiteButton from "./WebsiteButton";

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


    componentWillMount() {
        const location = parseInt(this.props.match.params.entityId, 10);
        const persistedInfoBox = JSON.parse(localStorage.getItem('reduxPersist:infoBox'))

        if (persistedInfoBox && persistedInfoBox.data !== location) {
            console.log('update')
            localStorage.setItem('reduxPersist:infoBox', JSON.stringify({
                ...persistedInfoBox,
                data: location
            }))
        }
    }

    render() {

        const { classes } = this.props;

        const style = {
            marginTop: '40px'
        };

        return (
            <div style={style}>

                <div>
                    <Typography type="headline" style={{ display: 'inline-block' }}>
                        {this.props.entity.name}
                    </Typography>
                    <Typography type="body2" className={classes.title} style={{ display: 'inline-block', marginLeft: '20px' }}>
                        {this.props.entity.long_name}
                    </Typography>
                </div>

                <WikiButton {...this.props} />
                <WebsiteButton {...this.props} />
                {this.props.graphButton}

                <div style={{ textAlign: 'justify', textJustify: 'auto' }}>
                    <Typography type="body1" className={classes.title} component='div'>
                        <WikiCard {...this.props} />
                    </Typography>
                </div>

            </div>
        );

    }
}

export default withStyles(styles)(EntityCard);