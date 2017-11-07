import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/actionCreators';
import Intent from './Intent';
import LearnAbout from './LearnAbout';
import SearchBar from '../Search/SearchBar';
import ShowSearchBar from './ShowSearchBar';
import {check_website} from '../../utils/backgroundUtils';


class Home extends React.Component {


  componentWillMount() {
    const component = this;
    try {
      window.chrome.tabs.query({ 'active': true, 'lastFocusedWindow': true }, function (tabs) {
        var url = tabs[0].url;
        if (component.props.dataIsAvailable){
          const entity = check_website(component.props.data, url);
          if (entity){
            component.props.history.push('/graph/' + entity.id);
          }
        }
      });
    }
    catch (err) {
      console.log(err);
    }
  }


  render() {
    return (
      <div>
        <h1 style={{ textAlign: 'center' }}>
          Welcome to the Open Ownership Project
        </h1>
        <br />

        {this.props.show.searchBar ? <div> <SearchBar {...this.props} /> </div> : <ShowSearchBar {...this.props} />}

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
