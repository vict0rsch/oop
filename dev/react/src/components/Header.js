import React from 'react';
import { Link } from 'react-router-dom';
import fetchData from '../utils/fetchData';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actionCreators';
import SearchGraph from './SearchGraph';

class Header extends React.Component {
    componentDidMount(){
        const element = this;
        fetchData(element);
    }
    render() {

        return (
            <div>
                <h1>
                    Wecome to OOP
                    </h1>
                <Link to='/'>Go Home</Link>
                <SearchGraph {...this.props}/>
            </div>
        )
    };
};


function mapStateToProps(state) {
    return {
        data: state.data,
        dataIsAvailable: state.dataIsAvailable,
        currentDisplay: state.currentDisplay,
        infoBox: state.infoBox
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

const ConnectHeader = connect(mapStateToProps, mapDispatchToProps)(Header);

export default ConnectHeader;