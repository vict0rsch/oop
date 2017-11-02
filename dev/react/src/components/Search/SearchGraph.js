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
        this.props.history.push(`/graph/${val.id}`);
      }
    }
  }

  render() {
    const searchStyle = {
      margin: '10px 0px 30px 0px',
      borderRadius: '0',
      border: '0 0 1 0'
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
          placeholder={''}
        />
      </div>
    );
  }
}

export default SearchGraph;
