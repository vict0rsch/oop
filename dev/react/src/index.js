import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';

// import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

import store from './store';
import Home from './components/Home';
import Graph from './components/Graph';
import Header from './components/Header/Header';

import './style/index.css';


// import baseTheme from './theme/baseTheme.js';

const router = (
    <Provider store={store}>
        {/* <MuiThemeProvider muiTheme={baseTheme}> */}
        <MuiThemeProvider theme={createMuiTheme()}>
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
