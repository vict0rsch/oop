import React from 'react';
import { Link, withRouter } from 'react-router-dom';


class InfoBoxEntity extends React.Component {


  handleClick = () => {
    const entity = this.props.data.entitys.ids[
      this.props.idToDisplay
    ];
    // let location = this.props.location.pathname;
    // let index = location.indexOf('/graph/');
    // let newPath = location.slice(0, index) + '/graph/' + entity.id

    this.props.history.push(`/graph/${entity.id}`);
  };

  render() {
    const entity = this.props.data.entitys.ids[
      this.props.idToDisplay
    ];
    return (
      <div id={`infoBoxEntity-${this.props.idToDisplay}`}>
        <p>
          {entity.name || ''}
        </p>
        <p>
          {entity.long_name || ''}
        </p>
        <p>
          {entity.website || ''}
        </p>
        <p>
          {entity.wiki || ''}
        </p>
        {entity.category !== 's' && entity.id !== this.props.match.params.entityId &&
        <Link
            to={`/graph/${entity.id}`}
            onClick={this.handleClick}>See more for {entity.name}
            </Link>
        }
      </div>
    );
  }
}


export default withRouter(InfoBoxEntity);
