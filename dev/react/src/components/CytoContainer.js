import React from 'react';
import cytoscape from 'cytoscape';
import { cytoParamsFromContainer } from '../utils/cytoParams';
import getCytoData from '../utils/getCytoData';
import InfoBoxEntity from './InfoBox/InfoBoxEntity';
import InfoBoxShare from './InfoBox/InfoBoxShare';
import SearchButton from './Buttons/SearchButton';
import HomeButton from './Buttons/HomeButton';
import SearchGraph from './Search/SearchGraph';


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

    const entity = data.entities.ids[id];
    let cytoData = getCytoData(data, entity);
    const cy = cytoscape(cytoParamsFromContainer(document.getElementById('cy'), cytoData));
    cy.ready(() => {
      cy.elements('node[category != "s"]').on(
        'tap',
        (event) => {
          container.props.updateEntityInfoBox(event.target.id());
        },
      );
      // cy.elements('edge').on(
      //   'click',
      //   (event) => {
      //     if (parseInt(event.target.data().target, 10) >= 0 && parseInt(event.target.data().source, 10) >= 0) {
      //       container.props.updateShareInfoBox(event.target.data());
      //     }
      //   },
      // );
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
      height: '400px',
      width: '785px',
      padding: '0px'
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
      <div>
        {this.props.show.searchBar && this.props.dataIsAvailable && <SearchGraph {...this.props} />}
        <div id="cy" style={cyStyle} onContextMenu={this.handleContextMenu} />
        <SearchButton {...this.props} />
        <HomeButton {...this.props} />
        {infoBox}
      </div>
    );
  }
}


export default CytoContainer;