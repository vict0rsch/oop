import React from 'react';

import { connect } from 'react-redux';
import mapStateToProps from '../../store/defaultMapStateToProps';
import mapDispatchToProps from '../../store/defaultMapDispatchToProps';
import Axios from 'axios';

import fetchData from '../../utils/fetchData';


class Header extends React.Component {

  componentDidMount() {
    const component = this;
    fetchData(component);
  }


  componentWillMount() {
    const pathname = this.props.history.location.pathname;
    const locations = ['/extension', '/settings', '/about', '/search', '/contact', '/', '/profile'];
    if (pathname && (locations.indexOf(pathname) === -1 && pathname.indexOf('graph') === -1)) {
      this.props.history.push('/');
    }
    if (localStorage.getItem('_jwt') && this.props.user.timestamp && Math.round(new Date().getTime() / 1000) - this.props.user.timestamp > 15) {
      console.log('Fetching status')
      Axios.post(
        "http://localhost:5000/auth/status",
        { status: true },
        {
          headers: {
            Authorization: 'Bearer: ' + localStorage['_jwt']
          }
        }
      ).then(
        (resp) => {
          console.log(resp);
          if (resp.data) {
            if (resp.data.status === 'success' && resp.data.auth_token) {
              localStorage.setItem('_jwt', resp.data.auth_token);
              this.props.setUserIsLoggedIn(true);
              this.props.setUserIsConfirmed(resp.data.user.confirmed);
              this.props.setUserData(resp.data.user);
              this.props.setUserTimestamp();
            }
          }
        },
        (err) => {
          console.log(err);
          this.props.logOut()
        }
        )
    }
  }


  redirect = (val) => {
    this.props.history.push(`/graph/${val.id}`);
  }
  render() {
    return (
      <div id='headerDiv'>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);

