// let's go!
import React from 'react';
import { render } from 'react-dom';

//import css
// import css from './styles/style.styl';
import App from './components/App';
import Home from './components/Home';
import Graph from './components/Graph';
// import Single from './components/Single';
// import Photogrid from './components/Photogrid';
// import Test from './components/Test';

import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import store, { history } from './store';

const router = (
    <Provider store={store}>
        <Router history={history}>
            <Route path='/' component={App}>
                <IndexRoute component={Home}></IndexRoute>
                <Route path='/graph/:entityId' component={Graph}></Route>
            </Route>
        </Router>
    </Provider>
);

render(router, document.getElementById('root'));
