import React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import HideSearchBar from './HideSearchBar';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.logChange = this.logChange.bind(this);
  }

  logChange(val) {
    if (val && val.id) {
      if (this.props.data.idSet.indexOf(parseInt(val.id, 10)) > -1) {
        if (this.props.location.pathname !== '/graph/' + val.id) {
          if (this.props.show.intent) {
            this.props.toggleIntent();
          }
          this.props.show.searchBar && this.props.location.pathname === '/' && this.props.toggleSearchBar();
          this.props.updateEntityInfoBox(val.id);
          this.props.history.push(`/graph/${val.id}`);
        }
      }
    }
  }

  render() {

    let selectStyle = {
      borderWidth: '1px',
      borderRadius: '0px',
      zIndex: 999,
      width: '630px',
      margin: 'auto',
      marginBottom: '15px'
    };
    if (this.props.clientType === 'mobile') {
      selectStyle.width = '250px';
    }


    const textAligns = {
      'browser': 'center',
      'mobile': 'inherit',
      'chromeExtension': 'center'
    }
    const searchBarDivStyle = {
      marginBottom: '15px',
      textAlign: textAligns[this.props.clientType]
    };

    const selectDivStyle = {
      ...selectStyle
    };

    return (
      <div style={searchBarDivStyle}>
        <div style={selectDivStyle}>
          <Select
            name="form-field-name"
            value="one"
            options={this.props.data.optionsData}
            onChange={this.logChange}
            ignoreCase
            ignoreAccents
            style={selectStyle}
            menuStyle={{ backgroundColor: 'rgba(204, 172, 149, 0.35)' }}
            placeholder={this.props.translate('search.searchPlaceholder')}
            arrowRenderer={() => null}
            autoBlur
            clearable={false}
          />
        </div>
        <HideSearchBar {...this.props} />
      </div>
    );
  }
}

export default SearchBar;
