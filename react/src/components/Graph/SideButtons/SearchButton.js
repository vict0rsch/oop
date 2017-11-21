// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import SearchIcon from 'material-ui-icons/Search';
import Tooltip from 'material-ui/Tooltip';
import Scroll from 'react-scroll';


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
    },
    tooltip: {
        textAlign: 'center'
    }
});

class SearchButton extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        if (!this.props.show.searchBar) {
            this.props.toggleSearchBar()
        } else {
            Scroll.animateScroll.scrollToTop({
                duration: 300,
                delay: 0,
                smooth: true
            });
            setTimeout(this.props.focusSearchBar, 200)
        }
    }

    render() {
        const { classes } = this.props
        return (
            <Tooltip
                id="tooltip-SearchButton"
                title={
                    this.props.show.searchBar ?
                        this.props.translate('graph.sideButtons.searchTooltipDisabled')
                        :
                        this.props.translate('graph.sideButtons.searchTooltip')
                }
                placement="bottom"
                className={classes.tooltip}
            >
                <Button raised fab className={classes.button} onClick={this.handleClick}>
                    <SearchIcon className={classes.icon} />
                </Button>
            </Tooltip>
        );
    }
}

SearchButton.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SearchButton);