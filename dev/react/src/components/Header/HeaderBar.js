// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';


const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 3,
    width: '100%',
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
});

function HeaderBar(props) {
  const { classes } = props;
  console.log(props);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {props.iconButton}
          <Typography type="title" color="inherit" className={classes.flex}>
            Welcom to the Ownership Graph
          </Typography>
          {/* <Button color="contrast">Login</Button> */}
        </Toolbar>
      </AppBar>
    </div>
  );
}

HeaderBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HeaderBar);