import React from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/actionCreators';
import Intent from './Intent';
import LearnAbout from './LearnAbout';
import SearchGraph from '../Search/SearchGraph';
import HomeSearchBar from './HomeSearchBar';

class Home extends React.Component {
  render() {
    return (
      <div>
        <h1>
          Welcome to the Open Ownership Project
        </h1>
        <br />

        {this.props.showSearchBar ? <SearchGraph {...this.props}/> : <HomeSearchBar {...this.props}/>}
        {!this.props.showIntent && <LearnAbout {...this.props}/>}

        {this.props.showIntent && <Intent {...this.props} />}
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
    showSearchBar: state.showSearchBar,
    showIntent: state.showIntent
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
