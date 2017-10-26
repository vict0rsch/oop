import React from 'react';
import CytoContainer from './CytoContainer';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actionCreators';

class _Graph extends React.Component {
  constructor(props) {
    super(props);
    this.printProps = this.printProps.bind(this);
  }
  render() {
    const toBeDisplayed = 'unused_variable';

    return (
      <div className="graph-div">
                Graph.js Component -> {this.props.match.params.entityId}
        {this.props.dataIsAvailable ?
          <CytoContainer {...this.props} printGraphProps={this.printProps} />
            :
          <p>Waiting</p>}
      </div>
    );
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
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

const Graph = connect(mapStateToProps, mapDispatchToProps)(_Graph);

export default Graph;
