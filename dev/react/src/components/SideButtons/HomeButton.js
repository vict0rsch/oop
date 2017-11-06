// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import HomeIcon from 'material-ui-icons/Home';


const styles = theme => ({
    button: {
        position: "fixed",
        height: '10px',
        width: '38px',
        margin: "-340px 15px"
    },
});

class HomeButton extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.toggleSearchBar();
        this.props.history.push('/');
    }

    render() {
        return (
            <Button raised fab aria-label="search" className={this.props.classes.button} onClick={this.handleClick}>
                {this.props.showSearchBar ? <HomeIcon /> : <HomeIcon />}
            </Button>
        );
    }
}

HomeButton.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HomeButton);