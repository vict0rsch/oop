import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import entitys from './entitys';
import shares from './shares';

function dummy1(state = [], action) {
    console.log('dummy1', arguments);
    return state
}

function dummy2(state = [], action) {
    console.log('dummy2', arguments);
    return state
}



const rootReducer = combineReducers({
    entitys, shares, routing: routerReducer
});

export default rootReducer;