import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import data from './data';
import currentDisplay from './currentDisplay';
import infoBox from './infoBox';
import dataIsAvailable from './dataIsAvailable'


const rootReducer = combineReducers({
    dataIsAvailable, data, currentDisplay, infoBox, router: routerReducer
});

export default rootReducer;