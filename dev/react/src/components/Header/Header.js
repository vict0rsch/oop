import React from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import fetchData from '../../utils/fetchData';
import * as actionCreators from '../../actions/actionCreators';

// import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import HomeIcon from 'material-ui-icons/Home'

import HeaderBar from './HeaderBar';
// import MaterialSearchGraph from '../Search/MaterialSearchGraph';
import SearchGraph from '../Search/SearchGraph';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.redirect = this.redirect.bind(this);
  }

  componentDidMount() {
    const element = this;
    fetchData(element);
  }
  redirect(val) {
    console.log('OOOOKKKKK');
    this.props.history.push(`/graph/${val.id}`)
  }
  render() {
    const classes = this.props;
    const iconButton = (
      <IconButton className={classes.menuButton} color="primary" aria-label="Menu">
        <Link to="/"><HomeIcon style={{color: 'white'}}/></Link>
      </IconButton>
    );
    return (
      <div>
        <HeaderBar {...this.props} iconButton={iconButton} />
        <SearchGraph {...this.props} />
        {/* <MaterialSearchGraph {...this.props} redirect={this.redirect}/> */}
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    data: state.data,
    dataIsAvailable: state.dataIsAvailable,
    currentDisplay: state.currentDisplay,
    infoBox: state.infoBox,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);

