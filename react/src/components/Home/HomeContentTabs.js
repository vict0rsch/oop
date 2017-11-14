import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Tabs, { Tab } from 'material-ui/Tabs';
import SearchIcon from 'material-ui-icons/Search';
import SettingsIcon from 'material-ui-icons/Settings';
import ChatIcon from 'react-icons/lib/md/chat';
import BulbIcon from 'react-icons/lib/go/organization';


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
    const iconStyle = {
      width: "25px",
      height: "25px"
    };
    const icons = {
      'search_bar': <SearchIcon style={iconStyle}/>,
      'intent': <BulbIcon style={iconStyle}/>,
      'contact': <ChatIcon style={iconStyle}/>,
      'settings': <SettingsIcon style={iconStyle}/>
    }

    return (
      <Paper className={classes.root}>
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
            scrollable={window.innerWidth < 630}
            scrollButtons="auto"
          >
            {["search_bar", "intent", "contact", "settings"].map(
              (v, k) => {
                return <Tab
                  key={'tab' + k}
                  label={this.props.translate("home.tabs." + v)}
                  icon={icons[v]}
                  value={v}
                  style={{width:'130px'}}
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