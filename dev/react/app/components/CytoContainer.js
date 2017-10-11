import React from 'react';
import cytoscape from 'cytoscape';
import { cytoParamsFromContainer, cytoReady } from '../utils/cytoParams';
import { getCytoData } from '../utils/cytoUtils';
import InfoBoxEntity from './InfoBoxEntity';
import InfoBoxShare from './InfoBoxShare';

class CytoContainer extends React.Component {
    constructor(props) {
        super(props);
        this.renderCytoscapeElement = this.renderCytoscapeElement.bind(this);
        this.updateInfoEntity = this.updateInfoEntity.bind(this);
        this.updateInfoShare = this.updateInfoShare.bind(this);
        this.updateGraph = this.updateGraph.bind(this);
        console.log(this.props.data);
        this.state = {
            idToDisplay: this.props.params.entityId,
            type: 'entity'
        }
    }

    renderCytoscapeElement(updateId = undefined) {
        let container = this;
        let data = this.props.data;
        let id = updateId || this.props.params.entityId;
        console.log('* Cytoscape.js is rendering the graph.. with id', id);

        let entity = data.entitys.ids[id];
        let cytoData = getCytoData(data, entity);
        let cy = cytoscape(
            cytoParamsFromContainer(document.getElementById('cy'), cytoData)
        );
        cy.ready(function () {
            cy.elements('node[category != "s"]').on(
                'click',
                function (event) {
                    container.updateInfoEntity(event.target.id(), 'entity')
                }
            );
            cy.elements('edge').on(
                'click',
                function (event) {
                    console.log(event.target.data())
                    if (parseInt(event.target.data().target) >= 0) {
                        container.updateInfoShare(event.target.data());
                    }
                }
            );
        });
        this.cy = cy;
    }

    updateInfoEntity(updateId) {
        this.setState({
            idToDisplay: updateId,
            type: 'entity'
        });
    }

    updateInfoShare(share) {
        this.setState({
            type: 'share',
            share: share
        })
    }

    updateGraph(updateId) {
        this.renderCytoscapeElement(updateId);
        updateInfoEntity(updateId, 'entity');
    }

    updateInfoShare(share) {
        this.setState({
            type: 'share',
            share: share
        })
    }

    componentDidMount() {
        this.renderCytoscapeElement();
    }

    render() {
        let cyStyle = {
            height: '500px',
            width: '1000px',
            margin: '20px 0px',
            border: '1px solid black'
        };
        let infoBox;
        if (this.state.type === 'entity') {
            infoBox = <InfoBoxEntity {...this.props} idToDisplay={this.state.idToDisplay} updateParent={this.updateGraph} />;
        } else {
            infoBox = <InfoBoxShare {...this.props} share={this.state.share} />
        }
        return (
            <div className="node_selected">
                <div id="cy" style={cyStyle}>
                </div>
                {infoBox}
            </div >
        );
    }
}



export default CytoContainer;