import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { localeReducer as locale } from 'react-localize-redux';

import data from './data';
import show from './show';
import infoBox from './infoBox';
import currentDisplay from './currentDisplay';
import dataIsAvailable from './dataIsAvailable';



const rootReducer = combineReducers({
    locale, show, dataIsAvailable, data, currentDisplay, infoBox, router: routerReducer
});

export default rootReducer;