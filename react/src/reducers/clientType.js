function clientType(state = 'chromeExtension', action) {
    if (action.type === 'SET_CLIENT_TYPE') {
      return action.clientType;
    }
    return state;
  }
  
  export default clientType;