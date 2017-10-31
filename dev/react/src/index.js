import React from 'react';
import './style/index.css';
import store from './store';
import ReactDOM from 'react-dom';
import Home from './components/Home';
import { Provider } from 'react-redux';
import Graph from './components/Graph';
import Header from './components/Header';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import baseTheme from './theme/baseTheme.js';

const router = (
    <Provider store={store}>
        {/* <MuiThemeProvider muiTheme={baseTheme}> */}
        <MuiThemeProvider>
            <BrowserRouter >
                <div>
                    <Header />
                    <Switch>
                        <Route exact path='/' component={Home}></Route>
                        <Route path='/graph/:entityId' component={Graph}></Route>
                    </Switch>
                </div>
            </BrowserRouter>
        </MuiThemeProvider>
    </Provider>
);

ReactDOM.render(router, document.getElementById('root'));
registerServiceWorker();
