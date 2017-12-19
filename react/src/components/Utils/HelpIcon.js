import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import Icon from 'react-icons/lib/md/help-outline';
import ClearIcon from 'react-icons/lib/md/clear';
import Popover from 'material-ui/Popover';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import { withStyles } from 'material-ui/styles';


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
            <div>
                <IconButton ref={node => {
                    this.button = node;
                }}
                    onClick={this.handleClickButton}
                    style={this.props.iconStyle} >
                    <Icon />
                </IconButton>
                <Popover
                    open={this.state.open}
                    anchorReference='anchorEl'
                    anchorEl={this.state.anchorEl}
                    onClose={this.handleClose}
                >
                    <Typography component='div' className={this.props.classes.typography}>{this.props.content}<br />
                        <div style={{ width: '100%', textAlign: 'center' }}>
                            <ClearIcon onClick={this.handleClose} />
                        </div>
                    </Typography>
                </Popover>
            </div>
        )
    }
}

export default withStyles(styles)(HelpIcon);