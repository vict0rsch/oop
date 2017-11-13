import { routerMiddleware } from 'react-router-redux';
import { autoRehydrate, persistStore } from 'redux-persist';
import { createStore, compose, applyMiddleware } from 'redux';
import { createBrowserHistory, createHashHistory } from 'history';
import { initialize, addTranslation, setActiveLanguage } from 'react-localize-redux';

// import the root reducer
import combinedReducer from '../reducers/index';
import defaultState from './defaultState';

const browserHistory = createBrowserHistory();
const hashHistory = createHashHistory();
const USE_BROWSER_HISTORY = false;
let _history;
if (USE_BROWSER_HISTORY) {
    _history = browserHistory;
} else {
    _history = hashHistory;
}
export const history = _history;

const middleware = routerMiddleware(history);

const enhancers = compose(autoRehydrate(), applyMiddleware(middleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
);

const store = createStore(combinedReducer, defaultState, enhancers);

// Multi-language support
let languageToUse = navigator.language || navigator.userLanguage;
languageToUse = languageToUse === 'fr' ? languageToUse : 'en';
const languages = ['en', 'fr'];
store.dispatch(initialize(languages));//, { defaultLanguage: 'fr' }));
const json = require('../static/texts/global.locale.json');
store.dispatch(addTranslation(json));
store.dispatch(setActiveLanguage(languageToUse));

// Set Client type
let clientType, isChromeExtension;
try{
    isChromeExtension = window.chrome.tabs !== undefined;
} catch (error){
    //Not Chrome browser
    isChromeExtension = false;
}
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    clientType = 'mobile';
} else if (isChromeExtension){
    clientType = 'chromeExtension';
} else {
    clientType = "browser";
}

store.dispatch({
    type: 'SET_CLIENT_TYPE',
    clientType
});

persistStore(store);

// By default reducers are not hot reloaded, only components
// To make them hot reloadable : 
if (module.hot) {
    module.hot.accept('../reducers/', () => {
        const nextCombinedReducer = require('../reducers/index').default;
        store.replaceReducer(nextCombinedReducer);
    })
}

export default store;

