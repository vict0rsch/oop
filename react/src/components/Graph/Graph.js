import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../actions/actionCreators';
import mapStateToProps from '../../store/defaultMapStateToProps';

import CytoContainer from './CytoContainer';
import Waiting from '../Waiting';

class _Graph extends React.Component {

  render() {

    return this.props.dataIsAvailable ?
      <CytoContainer {...this.props} printGraphProps={this.printProps} />
      :
      <Waiting />;
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

const Graph = connect(mapStateToProps, mapDispatchToProps)(_Graph);

export default Graph;
