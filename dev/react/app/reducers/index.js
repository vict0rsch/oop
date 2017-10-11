import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
// import posts from './posts';
// import comments from './comments';

function dummy1(state = [], action) {
    console.log('dummy1', arguments);
    return state
}

function dummy2(state = [], action) {
    console.log('dummy2', arguments);
    return state
}

const rootReducer = combineReducers({
    dummy1, dummy2, routing: routerReducer
});

export default rootReducer;