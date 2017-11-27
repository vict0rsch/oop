// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import MenuIcon from 'material-ui-icons/Menu';
import ClearIcon from 'material-ui-icons/Clear';
import Tooltip from 'material-ui/Tooltip';



const styles = theme => ({
    button: {
        height: '50px',
        width: '50px',
        display: 'block',
        margin: '20px',
        verticalAlign: 'middle'
    },
    icon: {
        height: '30px',
        width: '30px',
        verticalAlign: 'middle'
    }
});

class HideMobileButton extends React.Component {


    handleClick = () => {
        this.props.toggleSideMobile();
    }

    render() {

        return (
            <Tooltip
                id="tooltip-ResetButton"
                title={this.props.translate('graph.sideButtons.resetTooltip')}
                placement="bottom"
                style={{ textAlign: 'center' }}
            >
                <Button raised fab className={this.props.classes.button} onClick={this.handleClick}>
                    {!this.props.show.sideMobile && <MenuIcon className={this.props.classes.icon} />}
                    {this.props.show.sideMobile && <ClearIcon className={this.props.classes.icon} />}
                </Button>
            </Tooltip>
        );
    }
}

HideMobileButton.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HideMobileButton);