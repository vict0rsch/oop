import { createStore, compose, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/es/storage';
import { createBrowserHistory, createHashHistory } from 'history';
import rootReducer from './reducers/index';



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


const defaultState = {
    data: {},
    dataIsAvailable: false,
    show: {},
    currentDisplay: -1,
    infoBox: {
        type: '',
        data: []
    }
};


const middleware = routerMiddleware(history);
const enhancers = compose(applyMiddleware(middleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
);
const store = createStore(rootReducer, defaultState, enhancers);


// By default reducers are not hot reloaded, only components
// To make them hot reloadable : 
if (module.hot) {
    module.hot.accept('./reducers/', () => {
        const nextRootReducer = require('./reducers/index').default;
        store.replaceReducer(nextRootReducer);
    })
}

export default store;

