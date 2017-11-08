import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { check_website } from '../../utils/backgroundUtils';
import * as actionCreators from '../../actions/actionCreators';
import { getTranslate, getActiveLanguage } from 'react-localize-redux';

import LearnAbout from './LearnAbout';
import HomeSearchBar from './HomeSearchBar';


class Home extends React.Component {


  componentWillMount() {
    const component = this;
    try {
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
    catch (err) {
      console.log('Not Chrome Extension');
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
