/* eslint-disable flowtype/require-valid-file-annotation */

import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  withResponsiveFullScreen,
} from 'material-ui/Dialog';
import HowItWorksText from './HowItWorksText'
import Icon from 'material-ui-icons/HelpOutline';

class ResponsiveDialog extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { fullScreen } = this.props;

    return (
      <div style={{position:'absolute', right:'24px'}}>
        <Button style={{width:'10px', minWidth:'10px'}} onClick={this.handleClickOpen}><Icon/></Button>
        <Dialog
          fullScreen={fullScreen}
          open={this.state.open}
          onRequestClose={this.handleRequestClose}
        >
          <DialogTitle>{this.props.translate('home.intro.dialogButton')}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <HowItWorksText {...this.props} />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleRequestClose} color="primary">
              {this.props.translate('home.intro.closeButton')}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

ResponsiveDialog.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
};

export default withResponsiveFullScreen()(ResponsiveDialog);