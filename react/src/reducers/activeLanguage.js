import {setActiveLanguage } from 'react-localize-redux';

function activeLanguage(state = '', action) {
    if (action.type === 'SET_LANGUAGE') {
        setActiveLanguage(action.language);
        return action.language
    }
    return state;
  }
  
  export default activeLanguage;
  