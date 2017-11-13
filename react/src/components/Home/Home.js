import React from 'react';
import { connect } from 'react-redux';

import { check_website } from '../../utils/backgroundUtils';
import mapStateToProps from '../../store/defaultMapStateToProps';
import mapDispatchToProps from '../../store/defaultMapDispatchToProps';

import Scroll from 'react-scroll';

import LearnAbout from './LearnAbout/LearnAbout';
import HomeSearchBar from './HomeSearchBar/HomeSearchBar';
import Contact from './Contact/Contact';
import Settings from './Settings/Settings';
import Introduction from './Introduction/Introduction';
import HomeContentTabs from './HomeContentTabs';

class Home extends React.Component {


  componentWillMount() {
    const component = this;
    if (this.props.clientType === 'chromeExtension') {
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
        'searchBar': true
      });
    }
  }


  // componentWillUpdate(nextProps, nextState) {
  //   // does not work
  //   if (this.props.show.intent && !nextProps.show.intent) {
  //     console.log('scrolling')
  //     Scroll.animateScroll.scrollToTop({
  //       duration: 15000,
  //       delay: 1000,
  //       smooth: true
  //     });
  //   }
  // }


  render() {
    return (
      <div>
        <h1 style={{ textAlign: 'center' }}>
          Open Ownership Project
        </h1>
        <br />
        <Introduction {...this.props} />
        <div style={{
          textAlign: this.props.clientType === 'mobile' ? 'center' : 'unset',
          width: this.props.clientType === 'browser' ? '70%' : '80%',
          margin: 'auto'
        }}>


          <HomeContentTabs {...this.props} />

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