// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import HomeIcon from 'material-ui-icons/Home';
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

class HomeButton extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.show.searchBar && this.props.toggleSearchBar();
        this.props.history.push('/');
    }

    render() {

        return (
            <Tooltip
                id="tooltip-HomeButton"
                title={this.props.translate('graph.sideButtons.homeTooltip')}
                placement="bottom"
                style={{ textAlign: 'center' }}
            >
                <Button raised fab className={this.props.classes.button} onClick={this.handleClick}>
                    <HomeIcon className={this.props.classes.icon} />
                </Button>
            </Tooltip>
        );
    }
}

HomeButton.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HomeButton);