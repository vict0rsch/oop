// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import SearchIcon from 'material-ui-icons/Search';



const styles = theme => ({
    button: {
        position: "fixed",
        height: '10px',
        width: '38px',
        margin: "-340px 15px"
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
            <Button raised disabled={this.props.showSearchBar} fab aria-label="search" className={this.props.classes.button} onClick={this.handleClick}>
                 <SearchIcon />
            </Button>
        );
    }
}

SearchButton.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SearchButton);