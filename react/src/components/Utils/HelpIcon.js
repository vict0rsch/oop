import React, { Component } from 'react';
import Icon from 'react-icons/lib/md/help-outline';
import { withStyles } from 'material-ui/styles';
import Tooltip from 'material-ui/Tooltip';


const styles = theme => ({
    icon: {
        height: '30px',
        width: '30px',
        verticalAlign: 'middle'
    },
    tooltip: {
        opacity: 0.95
    }
});

const titleStyle = {
    fontSize: '1.5em',
    padding: 4,
}

class HelpIcon extends Component {

    render() {
        return (
            <Tooltip
                id={"tooltip-HelpIcon-" + this.props.id}
                title={<div style={titleStyle}>{this.props.content}</div>}
                placement="left"
                style={{ textAlign: 'center', fontSize: '1.2em', color: 'lightgrey' }}
                leaveDelay={250}
                classes={{ tooltip: this.props.classes.tooltip }}
            >
                <Icon />
            </Tooltip>
        )
    }
}

export default withStyles(styles)(HelpIcon);