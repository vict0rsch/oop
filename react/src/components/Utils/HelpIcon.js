import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import Icon from 'react-icons/lib/md/help-outline';
import ClearIcon from 'react-icons/lib/md/clear';
import Popover from 'material-ui/Popover';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import { withStyles } from 'material-ui/styles';
import Tooltip from 'material-ui/Tooltip';
import Button from 'material-ui/Button';

const styles = theme => ({
    button: {
        marginBottom: theme.spacing.unit * 4,
    },
    typography: {
        padding: theme.spacing.unit * 2,
        margin: 0,
        backgroundColor: 'rgb(237, 234, 232)',
        width: '200px'
    },
    icon: {
        height: '30px',
        width: '30px',
        verticalAlign: 'middle'
    }
});

class HelpIcon extends Component {

    state = {
        open: false,
        anchorEl: null,

    }

    button = null;

    handleClickButton = () => {
        this.setState({
            open: true,
            anchorEl: findDOMNode(this.button),
        });
    };

    handleClose = () => {
        this.setState({
            open: false,
        });
    };

    render() {
        return (
            <Tooltip
                id="tooltip-HomeButton"
                title={<div style={{ fontSize: '1.5em', padding: 4 }}>{this.props.content}</div>}
                placement="left"
                style={{ textAlign: 'center', fontSize: '1.2em', color: 'grey' }}
            >
                <Icon />
            </Tooltip>
        )
    }
}

export default withStyles(styles)(HelpIcon);