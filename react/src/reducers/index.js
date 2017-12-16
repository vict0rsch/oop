import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { localeReducer as locale } from 'react-localize-redux';
import {
  combineForms
} from 'react-redux-form';

import data from './data';
import show from './show';
import infoBox from './infoBox';
import clientType from './clientType';
import currentDisplay from './currentDisplay';
import dataIsAvailable from './dataIsAvailable';
import user from './user';


const initialUserState = {
  first_name: 'Jane',
  last_name: 'Doe',
  password: '',
  confirmPassword: '',
  email: ''
};



const rootReducer = combineReducers({
  clientType,
  currentDisplay,
  data,
  dataIsAvailable,
  infoBox,
  locale,
  router: routerReducer,
  show,
  user,
  signupForm: combineForms({
    user: initialUserState,
  }, 'signupForm'),
  loginForm: combineForms({
    user: initialUserState,
  }, 'loginForm'),
  editProfileForm: combineForms({
    user: initialUserState,
  }, 'editProfileForm')
});

export default rootReducer;