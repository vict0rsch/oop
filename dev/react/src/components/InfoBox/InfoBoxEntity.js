import React from 'react';
import { withRouter } from 'react-router-dom';
import Button from 'material-ui/Button';
import EntityCard from './EntityCard';
import Timeline from 'material-ui-icons/Timeline';

class InfoBoxEntity extends React.Component {


  handleClick = () => {
    const entity = this.props.data.entitys.ids[
      this.props.idToDisplay
    ];

    this.props.history.push(`/graph/${entity.id}`);
  };

  render() {
    const entity = this.props.data.entitys.ids[
      this.props.idToDisplay
    ];
    let graphButton;
    if (entity.category !== 's' && entity.id !== this.props.match.params.entityId) {
      graphButton = (<Button style={{color:'green'}} dense onClick={this.handleClick}>
        See Graph &nbsp; &nbsp;<Timeline />
      </Button>);
    } else {
      graphButton = undefined;
    }

    return (
      <div id={`infoBoxEntity-${this.props.idToDisplay}`}>
        <EntityCard title={entity.name} website={entity.website} wiki={entity.wiki} longName={entity.long_name} graphButton={graphButton} />
      </div>
    );
  }
}


export default withRouter(InfoBoxEntity);
