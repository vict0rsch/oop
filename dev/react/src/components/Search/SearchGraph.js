import React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

class SearchGraph extends React.Component {
  constructor(props) {
    super(props);
    this.logChange = this.logChange.bind(this);
  }

  logChange(val) {
    if (val && val.id) {
      if (this.props.data.idSet.has(parseInt(val.id, 10))) {
        this.props.updateEntityInfoBox(val.id);
        this.props.history.push(`/graph/${val.id}`);
      }
    }
  }

  render() {
    let searchStyle = {
      margin: '0px 0px 15px 0px',
      border: '0px 0px 1px 0px',
      borderRadius: '0px',
      zIndex:999,
      width:'785px'
    };
    return (
      <div>
        <Select
          name="form-field-name"
          value="one"
          options={this.props.data.optionsData}
          onChange={this.logChange}
          ignoreCase
          ignoreAccents
          style={searchStyle}
          placeholder={'Search for Entity...'}
        />
      </div>
    );
  }
}

export default SearchGraph;
