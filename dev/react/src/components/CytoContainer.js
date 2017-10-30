import React from 'react';
import cytoscape from 'cytoscape';
import { cytoParamsFromContainer } from '../utils/cytoParams';
import { getCytoData } from '../utils/cytoUtils';
import InfoBoxEntity from './InfoBox/InfoBoxEntity';
import InfoBoxShare from './InfoBox/InfoBoxShare';

class CytoContainer extends React.Component {
  constructor(props) {
    super(props);
    this.renderCytoscapeElement = this.renderCytoscapeElement.bind(this);
    this.props.updateEntityInfoBox(this.props.match.params.entityId);
  }


  renderCytoscapeElement() {
    const container = this;
    const data = this.props.data;
    const id = this.props.match.params.entityId;
    console.log('* Cytoscape.js is rendering the graph.. with id', id);

    const entity = data.entitys.ids[id];
    const cytoData = getCytoData(data, entity);
    console.log(cytoData);
    const cy = cytoscape(cytoParamsFromContainer(document.getElementById('cy'), cytoData));
    cy.ready(() => {
      cy.elements('node[category != "s"]').on(
        'click',
        (event) => {
          container.props.updateEntityInfoBox(event.target.id());
        },
      );
      cy.elements('edge').on(
        'click',
        (event) => {
          if (parseInt(event.target.data().target, 10) >= 0 && parseInt(event.target.data().source, 10) >= 0) {
            container.props.updateShareInfoBox(event.target.data());
          }
        },
      );
    });
    this.cy = cy;
  }

  componentDidMount() {
    this.renderCytoscapeElement();
  }

  componentDidUpdate() {
    const location = parseInt(this.props.match.params.entityId, 10);
    if (location !== this.props.currentDisplay) {
      this.props.displayEntity(location);
      this.renderCytoscapeElement();
    }
  }

  render() {
    const cyStyle = {
      height: '60%',
      width: '60%%',
      margin: '20px 0px',
      border: '4px solid slategrey',
      'border-radius': '5px'
    };
    let infoBox;
    if (this.props.infoBox.type === 'entity') {
      infoBox = <InfoBoxEntity {...this.props} idToDisplay={this.props.infoBox.data} />;
    } else if (this.props.infoBox.type === 'share') {
      console.log(this.props.infoBox);
      infoBox = <InfoBoxShare {...this.props} share={this.props.infoBox.data} />;
    } else {
      infoBox = <p>Error</p>;
    }
    return (
      <div className="node_selected">
        <div id="cy" style={cyStyle} onContextMenu={this.handleContextMenu} />
        {infoBox}
      </div >
    );
  }
}


export default CytoContainer;
