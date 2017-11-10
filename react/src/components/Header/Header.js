import React from 'react';

import { connect } from 'react-redux';
import mapStateToProps from '../../store/defaultMapStateToProps';
import mapDispatchToProps from '../../store/defaultMapDispatchToProps';


import fetchData from '../../utils/fetchData';


class Header extends React.Component {
  constructor(props) {
    super(props);
    this.redirect = this.redirect.bind(this);
  }

  componentDidMount() {
    const element = this;
    fetchData(element);
  }
  redirect(val) {
    this.props.history.push(`/graph/${val.id}`)
  }
  render() {
    return (
      <div>
        
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);

