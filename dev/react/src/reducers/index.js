import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import data from './data';
import currentDisplay from './currentDisplay';
import infoBox from './infoBox';
import dataIsAvailable from './dataIsAvailable';
import showSearchBar from './showSearchBar';
import showIntent from './showIntent';


const rootReducer = combineReducers({
    showIntent, showSearchBar, dataIsAvailable, data, currentDisplay, infoBox, router: routerReducer
});

export default rootReducer;