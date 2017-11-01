import React from 'react';
import { Link } from 'react-router-dom';
import fetchData from '../utils/fetchData';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actionCreators';
import SearchGraph from './SearchGraph';
import AppBar from 'material-ui/AppBar';
import MaterialSearchGraph from './MaterialSearchGraph';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.redirect = this.redirect.bind(this);
  }
  
  componentDidMount() {
    const element = this;
    fetchData(element);
  }
  redirect(val){
    console.log('OOOOKKKKK');
    this.props.history.push(`/graph/${val.id}`)
  }
  render() {
    return (
      <div>
        <AppBar showMenuIconButton={false}/>
        <h1>
                    Wecome to OOP
        </h1>
        <Link to="/">Go Home</Link>
        <SearchGraph {...this.props} />
        {/* <MaterialSearchGraph {...this.props} redirect={this.redirect}/> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(Header);

