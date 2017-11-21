import React from 'react';
import cytoscape from 'cytoscape';
import { cytoParamsFromContainer } from '../../utils/cytoParams';
import getCytoData from '../../utils/getCytoData';
import InfoBoxEntityUI from './InfoBox/InfoBoxEntityUI';
import SideButtons from './SideButtons/SideButtons';
import SearchBar from '../Search/SearchBar';


class CytoContainer extends React.Component {
  constructor(props) {
    super(props);
    this.renderCytoscapeElement = this.renderCytoscapeElement.bind(this);
    this.props.updateEntityInfoBox(this.props.match.params.entityId);
    this.focusSearchBar = this.focusSearchBar.bind(this)

    this.state = {
      update: false,
      changeWiki: false,
      focus: 0
    };
  }

  focusSearchBar() {
    this.setState({
      focus: this.state.focus + 1
    })
  }


  renderCytoscapeElement() {
    console.log('rendering.')

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

    const graphHistory = sessionStorage.getItem('graphHistory');
    if (!graphHistory) {
      sessionStorage.setItem('graphHistory', JSON.stringify(
        [id]
      ));
      sessionStorage.setItem('location', JSON.stringify(
        0
      ));
    }

    if (time) {
      console.timeEnd('      Data Cyto');
      console.time('      Render Cyto');
    }
    const cy = cytoscape(cytoParamsFromContainer(document.getElementById('cy'), cytoData, entity.id));
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
      this.props.updateEntityInfoBox(location);
      this.renderCytoscapeElement();
    }
  }

  render() {
    let defaultStyle = {
      margin: 'auto',
      width: '70%',
      height: parseInt(window.screen.availHeight / 2, 10) + 'px',
    };

    if (!this.props.show.searchBar) {
      defaultStyle.marginTop = '20px'
    }

    const cyStyles = {
      'browser': {
        ...defaultStyle,
      },
      'chromeExtension': {
        ...defaultStyle,
        height: '400px',
        width: '770px',
        padding: '0px'
      },
      'mobile': {
        ...defaultStyle,
        minHeight: '300px'
      }
    }

    return (
      <div>
        {this.props.show.searchBar && this.props.dataIsAvailable && <SearchBar {...this.props} focus={this.state.focus} />}
        <div id="cy" style={cyStyles[this.props.clientType]} onContextMenu={this.handleContextMenu} />
        <SideButtons {...this.props} focusSearchBar={this.focusSearchBar} reRenderGraph={this.renderCytoscapeElement}/>
        <InfoBoxEntityUI {...this.props} changeWiki={this.state.changeWiki} />
      </div>
    );
  }
}


export default CytoContainer;