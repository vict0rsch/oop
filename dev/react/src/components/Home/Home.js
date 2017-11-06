import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/actionCreators';
import Intent from './Intent';
import LearnAbout from './LearnAbout';
import SearchGraph from '../Search/SearchGraph';
import ShowSearchBar from './ShowSearchBar';


class Home extends React.Component {
  render() {
    return (
      <div>
        <h1>
          Welcome to the Open Ownership Project
        </h1>
        <br />

        {this.props.show.searchBar ? <div><SearchGraph {...this.props}/> </div> : <ShowSearchBar {...this.props} />}

        {!this.props.show.intent && <LearnAbout {...this.props} />}
        {this.props.show.intent && <Intent {...this.props} />}
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
    show: state.show
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
