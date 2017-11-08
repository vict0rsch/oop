import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { check_website } from '../../utils/backgroundUtils';
import * as actionCreators from '../../actions/actionCreators';
import mapStateToProps from '../../store/defaultMapStateToProps';

import LearnAbout from './LearnAbout';
import HomeSearchBar from './HomeSearchBar';


class Home extends React.Component {


  componentWillMount() {
    const component = this;
    if (this.props.clientType === 'chromeExtension') {
      window.chrome.tabs.query({ 'active': true, 'lastFocusedWindow': true }, function (tabs) {
        var url = tabs[0].url;
        if (component.props.dataIsAvailable) {
          const entity = check_website(component.props.data, url);
          if (entity && !sessionStorage['default_' + entity.id]) {
            sessionStorage['default_' + entity.id] = 'true';
            component.props.updateEntityInfoBox(entity.id);
            component.props.history.push('/graph/' + entity.id);
          }
        }
      });
    }
  }


  render() {
    return (
      <div>
        <h1 style={{ textAlign: 'center' }}>
          Open Ownership Project
        </h1>
        <br />
        <HomeSearchBar {...this.props} />
        <LearnAbout {...this.props} />
      </div>
    );
  }
}




function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
