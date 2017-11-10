import { bindActionCreators } from 'redux';
import { setActiveLanguage } from 'react-localize-redux';
import * as actionCreators from '../actions/actionCreators';
import * as toggleActions from '../actions/toggleActions';

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
      {
        ...actionCreators,
        ...toggleActions,
        setActiveLanguage
      },
      dispatch);
  }

export default mapDispatchToProps