import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Tabs, { Tab } from 'material-ui/Tabs';

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing.unit * 3,
  },
});

class HomeContentTabs extends React.Component {
  state = {
    value: 'search_bar',
  };

  handleChange = (event, value) => {
    this.setState({ value });
    this.props.closeAll();
    this.props.toggle(value);
  };

  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.root}>
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          {["search_bar", "intent", "contact", "settings"].map(
            (v, k) => {
              return <Tab
                key={'tab' + k}
                label={this.props.translate("home.tabs." + v)}
                value={v}
              />;
            }
          )}
        </Tabs>
      </Paper>
    );
  }
}

HomeContentTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HomeContentTabs);