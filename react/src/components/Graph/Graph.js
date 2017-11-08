import React from 'react';
import CytoContainer from './CytoContainer';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/actionCreators';
import Waiting from '../Waiting';

class _Graph extends React.Component {
  constructor(props) {
    super(props);
    this.printProps = this.printProps.bind(this);
  }
  render() {

    return this.props.dataIsAvailable ?
      <CytoContainer {...this.props} printGraphProps={this.printProps} />
      :
      <Waiting/>;
  }

  printProps() {
    console.log('GRAPH PROPS', this.props);
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

const Graph = connect(mapStateToProps, mapDispatchToProps)(_Graph);

export default Graph;
