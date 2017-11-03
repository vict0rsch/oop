import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import fetchData from '../../utils/fetchData';
import * as actionCreators from '../../actions/actionCreators';

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
    return (
      <div>
        {this.props.showSearchBar && this.props.dataIsAvailable && <SearchGraph {...this.props} />}
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
    showSearchBar: state.showSearchBar
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);

