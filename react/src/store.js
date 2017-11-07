import { createStore, compose, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import {autoRehydrate, persistStore} from 'redux-persist';
import { createBrowserHistory, createHashHistory } from 'history';


// import the root reducer
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

const middleware = routerMiddleware(history);

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

const enhancers = compose(autoRehydrate(), applyMiddleware(middleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
);

const store = createStore(rootReducer, defaultState, enhancers);

persistStore(store);

// By default reducers are not hot reloaded, only components
// To make them hot reloadable : 
if (module.hot) {
    module.hot.accept('./reducers/', () => {
        const nextRootReducer = require('./reducers/index').default;
        store.replaceReducer(nextRootReducer);
    })
}

export default store;

