// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import ResetIcon from 'material-ui-icons/Autorenew';
import Tooltip from 'material-ui/Tooltip';



const styles = theme => ({
    button: {
        height: '50px',
        width: '50px',
        display: 'block',
        margin: '15px 20px',
        verticalAlign: 'middle'
    },
    icon: {
        height: '30px',
        width: '30px',
    }
});

class HomeButton extends React.Component {

    handleClick = () => {
        this.props.reRenderGraph();
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
                    <ResetIcon className={this.props.classes.icon} />
                </Button>
            </Tooltip>
        );
    }
}

HomeButton.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HomeButton);