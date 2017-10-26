import React from 'react';
import { withRouter } from 'react-router-dom';
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
        // let location = this.props.location.pathname;
        // let index = location.indexOf('/graph/');
        // let newPath = location.slice(0, index) + '/graph/' + val.id

        // this.props.history.push(newPath);
        this.props.history.push(`/graph/${val.id}`);
      }
    }
  }

  render() {
    const searchStyle = {
      margin: '10px 0px 30px 0px',
      width: '400px',
    };
    return (
      <div>
        <p>Search for entity :</p>
        <Select
          name="form-field-name"
          value="one"
          options={this.props.data.optionsData}
          onChange={this.logChange}
          autofocus
          ignoreCase
          ignoreAccents
          style={searchStyle}
        />
      </div>
    );
  }
}

export default withRouter(SearchGraph);