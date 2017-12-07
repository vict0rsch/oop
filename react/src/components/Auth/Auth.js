/* eslint-disable flowtype/require-valid-file-annotation */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import mapStateToProps from '../../store/defaultMapStateToProps';
import mapDispatchToProps from '../../store/defaultMapDispatchToProps';
import Dialog, {
  DialogContent,
  DialogTitle,
  withMobileDialog,
} from 'material-ui/Dialog';
import Register from './Register'
import Icon from 'material-ui-icons/HelpOutline';
import Button from 'material-ui/Button';


const fullScreenMinWidth = 650;

const buttonDivPositionStyle = {
  position: 'absolute',
  right: '24px'
};
const buttonStyle = {
  width: '10px',
  minWidth: '10px'
};

class Auth extends React.Component {
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
    let { fullScreen } = this.props;
    if (this.props.clientType === 'extension' || window.innerWidth > fullScreenMinWidth) {
      fullScreen = false;
    }

    return (
      <div style={buttonDivPositionStyle}>
        <Button style={buttonStyle} onClick={this.handleClickOpen}><Icon /></Button>
        <Dialog
          fullScreen={fullScreen}
          open={this.state.open}
          onRequestClose={this.handleRequestClose}
        >
          <DialogTitle>{this.props.translate('home.intro.dialogButton')}</DialogTitle>
          <DialogContent component={'div'}>
              <Register {...this.props} close={this.handleRequestClose}/>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

Auth.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
};

const _Auth = connect(mapStateToProps, mapDispatchToProps)(Auth);

export default withMobileDialog()(_Auth);