// let's go!
import React from 'react';
import { render } from 'react-dom';

//import css
// import css from './styles/style.styl';
// import App from './components/App';
// import Single from './components/Single';
// import Photogrid from './components/Photogrid';
// import Test from './components/Test';

import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
// import store, { history } from './store';

// const router = (
//     <Provider store={store}>
//         <Router history={history}>
//             <Route path='/' component={App}>
//                 <IndexRoute component={Photogrid}></IndexRoute>
//                 <Route path='/view/:postId' component={Single}></Route>
//                 <Route path='test/:testId' component={Test}></Route>
//             </Route>
//         </Router>
//     </Provider>
// );

const router = (
    <div>Hello World</div>
);

render(router, document.getElementById('root'));
