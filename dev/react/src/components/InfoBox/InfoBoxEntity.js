import React from 'react';
import Button from 'material-ui/Button';
import EntityCard from './EntityCard';
import Timeline from 'material-ui-icons/Timeline';


class InfoBoxEntity extends React.Component {


  handleClick = () => {
    const entity = this.props.data.entities.ids[
      this.props.idToDisplay
    ];

    this.props.history.push(`/graph/${entity.id}`);
  };

  render() {
    const entity = this.props.data.entities.ids[
      this.props.idToDisplay
    ];
    let graphButton;
    if (entity.category !== 's' && entity.id !== parseInt(this.props.match.params.entityId, 10)) {
      graphButton = (<Button style={{ color: 'green' }} dense onClick={this.handleClick}>
        See Graph &nbsp; &nbsp;<Timeline />
      </Button>);
    } else {
      graphButton = undefined;
    }

    return (
      <div style={{width: '784px'}}>
          <EntityCard entity={entity} graphButton={graphButton} />
      </div>
    );
  }
}

export default InfoBoxEntity;