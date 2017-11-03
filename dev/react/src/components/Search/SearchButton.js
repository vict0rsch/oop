// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import SearchIcon from 'material-ui-icons/Search';
import ClearIcon from 'material-ui-icons/Clear';


const styles = theme => ({
    button: {
        position: "fixed",
        height: '10px',
        width: '38px',
        margin: "-388px 15px"
    },
});

class SearchButton extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.toggleSearchBar()
    }

    render() {
        return (
            <Button raised fab aria-label="search" className={this.props.classes.button} onClick={this.handleClick}>
                {this.props.showSearchBar ? <ClearIcon /> : <SearchIcon />}
            </Button>
        );
    }
}

SearchButton.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SearchButton);