import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../actions/actionCreators';
import mapStateToProps from '../../store/defaultMapStateToProps';
import { setActiveLanguage } from 'react-localize-redux';


import CytoContainer from './CytoContainer';
import Waiting from '../Waiting';

class _Graph extends React.Component {

  render() {

    return this.props.dataIsAvailable ?
      <CytoContainer {...this.props} />
      :
      <Waiting />;
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      ...actionCreators,
      setActiveLanguage
    },
    dispatch);
}
const Graph = connect(mapStateToProps, mapDispatchToProps)(_Graph);

export default Graph;
