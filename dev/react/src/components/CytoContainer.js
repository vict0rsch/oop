import React from 'react';
import cytoscape from 'cytoscape';
import { cytoParamsFromContainer } from '../utils/cytoParams';
import { getCytoData } from '../utils/cytoUtils';
import InfoBoxEntity from './InfoBox/InfoBoxEntity';
import InfoBoxShare from './InfoBox/InfoBoxShare';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
    marginBotton: theme.spacing.unit * 3
  }),
});


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
    let cytoData = getCytoData(data, entity);
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
      height: '500px',
      width: '100%',
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
    const { classes } = this.props;
    return (
      <div>
        <Paper className={classes.root} elevation={10}>
          <div id="cy" style={cyStyle} onContextMenu={this.handleContextMenu} />
        </Paper>
        {infoBox}
      </div>
    );
  }
}


export default withStyles(styles)(CytoContainer);