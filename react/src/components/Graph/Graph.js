import React from 'react';
import CytoContainer from './CytoContainer';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/actionCreators';
import Waiting from '../Waiting';
import { getTranslate, getActiveLanguage } from 'react-localize-redux';

class _Graph extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {

    return this.props.dataIsAvailable ?
      <CytoContainer {...this.props} printGraphProps={this.printProps} />
      :
      <Waiting />;
  }
}


function mapStateToProps(state) {
  return {
    data: state.data,
    dataIsAvailable: state.dataIsAvailable,
    currentDisplay: state.currentDisplay,
    infoBox: state.infoBox,
    show: state.show,
    translate: getTranslate(state.locale),
    currentLanguage: getActiveLanguage(state.locale).code
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

const Graph = connect(mapStateToProps, mapDispatchToProps)(_Graph);

export default Graph;
