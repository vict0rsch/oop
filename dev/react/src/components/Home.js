import React from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actionCreators';

class Home extends React.Component {
  render() {
    return (
      <div>
        <h3>
          OOP Home Component Is COOOOool
        </h3>
        <br />
        <div className="home-div">
          <Link to="/graph/142">Go to Graph 142</Link>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
