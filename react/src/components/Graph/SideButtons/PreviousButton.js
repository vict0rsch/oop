// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import UndoIcon from 'material-ui-icons/Undo';
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
    }
});

class PreviousButton extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        const history = JSON.parse(sessionStorage.graphHistory);
        const location = JSON.parse(sessionStorage.location);
        sessionStorage.location = location - 1;
        this.props.history.push('/graph/' + history[location - 1])

    }

    render() {
        const disabled = sessionStorage.graphHistory && JSON.parse(sessionStorage.location) === 0;
        return (
            <Tooltip
                id="tooltip-ResetButton"
                title={this.props.translate('graph.sideButtons.previousTooltip')}
                placement="bottom"
                style={{ textAlign: 'center' }}
            >
                <Button raised fab disabled={disabled} className={this.props.classes.button} onClick={this.handleClick}>
                    <UndoIcon className={this.props.classes.icon} />
                </Button>
            </Tooltip>
        );
    }
}

PreviousButton.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PreviousButton);