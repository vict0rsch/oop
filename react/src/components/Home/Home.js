import React from 'react';
import { connect } from 'react-redux';

import mapStateToProps from '../../store/defaultMapStateToProps';
import mapDispatchToProps from '../../store/defaultMapDispatchToProps';
import { check_website } from '../../utils/backgroundUtils';

// import Scroll from 'react-scroll';

import LearnAbout from './Content/LearnAbout/LearnAbout';
import HomeSearchBar from './Content/HomeSearchBar/HomeSearchBar';
import Contact from './Content/Contact/Contact';
import Settings from './Content/Settings/Settings';
import HomeContentTabs from './Content/Tabs';
import Extension from './Content/Extension/Extension';
import Header from './Header/Header';
import Example from './Content/Example/Example';

import updateData from '../../utils/updateData';

class Home extends React.Component {


  componentWillMount() {
    const component = this;
    if (this.props.clientType === 'extension') {
      window.chrome.tabs.query({ 'active': true, 'lastFocusedWindow': true }, function (tabs) {
        if (tabs.length === 0) {
          console.log('tabs.length is 0')
          return;
        }
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
            component.props.displayEntity(entity.id);
            component.props.closeAll();
            component.props.history.push('/graph/' + entity.id);
          }
        }
      });
    }
    if (this.props.location.pathname === '/') {
      this.props.closeAll();
      this.props.toggleSearchBar();
      localStorage['reduxPersist:show'] = JSON.stringify({
        'intent': false,
        'contact': false,
        'settings': false,
        'extension': false,
        'searchBar': true
      });
    } else {
      const location = this.props.location.pathname.split('/')[1];
      if (location) {
        this.props.closeAll();
        this.props.toggle(location);
        localStorage['reduxPersist:show'] = JSON.stringify({
          ...this.props.show,
          location: true
        })

      };
    }
  }


  componentWillUpdate(nextProps, nextState) {
    if (sessionStorage.graphHistory && sessionStorage.graphHistory.length > 2) {
      sessionStorage.graphHistory = "[]";
      sessionStorage.location = "-1";
    }
  }

  
  componentDidUpdate(prevProps, prevState) {
    console.log('');
    console.log(prevProps.dataIsAvailable);
    console.log(this.props.dataIsAvailable);
    console.log('');
    if (this.props.dataIsAvailable !== prevProps.dataIsAvailable){
      if (this.props.dataIsAvailable){
        updateData(this);
      }
    }
  }
  


  render() {
    const homeContentDivStyle = {
      textAlign: this.props.clientType === 'mobile' ? 'center' : 'unset',
      width: this.props.clientType === 'browser' ? '70%' : '80%',
      margin: 'auto'
    };
    return (
      <div>
        <Header {...this.props} style={homeContentDivStyle} />
        <div style={homeContentDivStyle}>
          <Example {...this.props} />
          <HomeContentTabs {...this.props} />
          <HomeSearchBar {...this.props} />
          <LearnAbout {...this.props} />
          <Contact {...this.props} />
          <Settings {...this.props} />
          <Extension {...this.props} />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);