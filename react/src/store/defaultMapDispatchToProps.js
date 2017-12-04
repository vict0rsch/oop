import { bindActionCreators } from 'redux';
import { setActiveLanguage } from 'react-localize-redux';
import * as actionCreators from '../actions/actionCreators';
import * as toggleActions from '../actions/toggleActions';
import {actions as rrfActions} from 'react-redux-form';

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
      {
        ...actionCreators,
        ...toggleActions,
        setActiveLanguage,
        rrfActions
      },
      dispatch);
  }

export default mapDispatchToProps