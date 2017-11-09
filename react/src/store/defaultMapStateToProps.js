import { getTranslate, getActiveLanguage } from 'react-localize-redux';

function mapStateToProps(state) {
    return {
      data: state.data,
      dataIsAvailable: state.dataIsAvailable,
      currentDisplay: state.currentDisplay,
      infoBox: state.infoBox,
      show: state.show,
      translate: getTranslate(state.locale),
      currentLanguage: getActiveLanguage(state.locale).code,
      activeLanguage: state.activeLanguage,
      clientType: state.clientType
    };
  }

  export default mapStateToProps;