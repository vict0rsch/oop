import React from 'react';
import cytoscape from 'cytoscape';
import { cytoParamsFromContainer } from '../../utils/cytoParams';
import getCytoData from '../../utils/getCytoData';
import InfoBoxEntity from './InfoBox/InfoBoxEntity';
import InfoBoxShare from './InfoBox/InfoBoxShare';
import SideButtons from './SideButtons/SideButtons';
import SearchBar from '../Search/SearchBar';


class CytoContainer extends React.Component {
  constructor(props) {
    super(props);
    this.renderCytoscapeElement = this.renderCytoscapeElement.bind(this);
    this.props.updateEntityInfoBox(this.props.match.params.entityId);
    this.state = {
      update: false,
      changeWiki: false
    };
  }


  renderCytoscapeElement() {
    const time = false;
    if (time) {
      console.time('Full Cyto');
      console.time('      Data Cyto');
    }
    const container = this;
    const data = this.props.data;
    const id = this.props.match.params.entityId;

    const entity = data.entities.ids[id];
    let cytoData = getCytoData(data, entity);
    if (time) {
      console.timeEnd('      Data Cyto');
      console.time('      Render Cyto');
    }
    const cy = cytoscape(cytoParamsFromContainer(document.getElementById('cy'), cytoData));
    cy.ready(() => {
      cy.elements('node[category != "s"]').on(
        'tap',
        (event) => {
          this.setState({
            changeWiki: true
          });
          container.props.updateEntityInfoBox(event.target.id());
        },
      );
      if (time) {
        console.timeEnd('      Render Cyto');
        console.timeEnd('Full Cyto');
      }
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
    this.setState({
      update: true
    });
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
      width: '770px',
      padding: '0px'
    };
    let infoBox;
    if (this.props.infoBox.type === 'entity') {
      infoBox = <InfoBoxEntity {...this.props} idToDisplay={this.props.infoBox.data} changeWiki={this.state.changeWiki}/>;
    } else if (this.props.infoBox.type === 'share') {
      console.log(this.props.infoBox);
      infoBox = <InfoBoxShare {...this.props} share={this.props.infoBox.data} />;
    } else {
      infoBox = <p>Error</p>;
    }
    return (
      <div>
        {this.props.show.searchBar && this.props.dataIsAvailable && <SearchBar {...this.props} />}
        <div id="cy" style={cyStyle} onContextMenu={this.handleContextMenu} />
        <SideButtons {...this.props} />
        {infoBox}
      </div>
    );
  }
}


export default CytoContainer;