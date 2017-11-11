import React from 'react';
import { connect } from 'react-redux';

import { check_website } from '../../utils/backgroundUtils';
import mapStateToProps from '../../store/defaultMapStateToProps';
import mapDispatchToProps from '../../store/defaultMapDispatchToProps';


import LearnAbout from './LearnAbout/LearnAbout';
import HomeSearchBar from './HomeSearchBar/HomeSearchBar';
import Contact from './Contact/Contact';
import Settings from './Settings/Settings';


class Home extends React.Component {


  componentWillMount() {
    const component = this;
    if (this.props.clientType === 'chromeExtension') {
      window.chrome.tabs.query({ 'active': true, 'lastFocusedWindow': true }, function (tabs) {
        var url = tabs[0].url;
        if (component.props.dataIsAvailable) {
          const entity = check_website(component.props.data, url);
          if (entity && !sessionStorage['default_' + entity.id]) {
            // an entity was found and it is the first time 
            // the Extension sees this entity for this session
            // (It is assumed that if the user re-clicks on the Extension
            // during the session they intend to access the whole Extension)
            sessionStorage['default_' + entity.id] = 'true';
            component.props.updateEntityInfoBox(entity.id);
            component.props.displayEntity(entity.id)
            component.props.closeALl()
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
        <div style={{
          paddingLeft: this.props.clientType === 'browser' ? '50px' : '0px',
          textAlign: this.props.clientType === 'mobile' ? 'center' : 'unset'
        }}>
          <HomeSearchBar {...this.props} />
          <LearnAbout {...this.props} />
          <Contact {...this.props} />
          <Settings {...this.props} />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);