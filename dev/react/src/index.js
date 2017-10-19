import React from 'react';
import './style/index.css';
import store from './store';
import ReactDOM from 'react-dom';
import Home from './components/Home';
import { Provider } from 'react-redux';
import Graph from './components/Graph';
import Header from './components/Header';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const router = (
    <Provider store={store}>
        <BrowserRouter >
            <div>
                <Header />
                <Switch>
                    <Route exact path='/' component={Home}></Route>
                    <Route path='/graph/:entityId' component={Graph}></Route>
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(router, document.getElementById('root'));
registerServiceWorker();
