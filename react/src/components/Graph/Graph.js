import React from 'react';
import CytoContainer from './CytoContainer';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/actionCreators';
import Spinner from 'react-spinner';

class _Graph extends React.Component {
  constructor(props) {
    super(props);
    this.printProps = this.printProps.bind(this);
  }
  render() {

    return this.props.dataIsAvailable ?
      <CytoContainer {...this.props} printGraphProps={this.printProps} />
      :
      <div><p style={{ textAlign: 'center' }}>Getting Data... </p><br /><Spinner style={{
        height: 50,
        width: 50,
      }} /></div>;
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
