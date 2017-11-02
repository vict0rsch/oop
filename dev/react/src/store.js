import { createStore, compose } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { createBrowserHistory, createHashHistory } from 'history';


// import the root reducer
import rootReducer from './reducers/index';

const browserHistory = createBrowserHistory();
const hashHistory = createHashHistory();

const USE_BROWsER_HISTORY = false;

let _history;
if (USE_BROWsER_HISTORY) {
    _history = browserHistory;
} else {
    _history = hashHistory;
}

// create an object for the default data
const defaultState = {
    data: {},
    dataIsAvailable: false,
    currentDisplay: -1,
    infoBox: {
        type: '',
        data: []
    }
};

const enhancers = compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f
);

const store = createStore(rootReducer, defaultState, enhancers);

export const history = syncHistoryWithStore(_history, store);

// By default reducers are not hot reloaded, only components
// To make them hot reloadable : 
if (module.hot) {
    module.hot.accept('./reducers/', () => {
        const nextRootReducer = require('./reducers/index').default;
        store.replaceReducer(nextRootReducer);
    })
}

export default store;

