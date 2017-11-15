import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Tabs, { Tab } from 'material-ui/Tabs';
import SearchIcon from 'material-ui-icons/Search';
import SettingsIcon from 'react-icons/lib/go/settings';
import ContactIcon from 'react-icons/lib/go/mail';
import AboutIcon from 'react-icons/lib/go/organization';
import ExtensionIcon from 'react-icons/lib/go/package';


const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing.unit * 3,
  },
});

class HomeContentTabs extends React.Component {
  state = {
    value: 'search',
    update: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
    this.props.closeAll();
    this.props.toggle(value);
    this.props.history.push('/' + value)
  };


  componentWillReceiveProps(nextProps) {
    if (this.state.update === 0) {
      let location = this.props.location.pathname.split('/')[1];
      if (location === "") {
        location = 'search'
      }
      this.setState({
        value: location,
        update: this.state.update + 1
      });
    }
  }


  render() {

    let tabs = ["search", "about", "contact", "settings"];
    if (this.props.clientType !== "chromeExtension") {
      tabs = [
        ...tabs.slice(0, 2),
        "extension",
        ...tabs.slice(2)
      ];
    }

    const { classes } = this.props;
    const iconStyle = {
      width: "20px",
      height: "20px"
    };
    const icons = {
      'search': <SearchIcon style={iconStyle} />,
      'about': <AboutIcon style={iconStyle} />,
      'contact': <ContactIcon style={iconStyle} />,
      'settings': <SettingsIcon style={iconStyle} />,
      'extension': <ExtensionIcon style={iconStyle} />
    };

    const tabStyle = this.props.clientType !== 'chromeExtension' ?
      {
        width: '100px'
      }
      :
      {
        width: '140px'
      };

    const labelStyle = this.props.clientType !== 'chromeExtension' ?
      {
        fontSize: '0.7em'
      }
      :
      {
        fontSize: '0.7em'
      };

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
          {tabs.map(
          (v, k) => {
            return <Tab
              className={classes.labelContainer}
              key={'tab' + k}
              label={
                <span style={labelStyle}>{this.props.translate("home.tabs." + v)}</span>
              }
              icon={icons[v]}
              value={v}
              style={tabStyle}
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