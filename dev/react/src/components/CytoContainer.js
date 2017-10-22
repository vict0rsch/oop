import React from 'react';
import cytoscape from 'cytoscape';
import { cytoParamsFromContainer } from '../utils/cytoParams';
import { getCytoData } from '../utils/cytoUtils';
import InfoBoxEntity from './InfoBoxEntity';
import InfoBoxShare from './InfoBoxShare';

class CytoContainer extends React.Component {
    constructor(props) {
        super(props);
        this.renderCytoscapeElement = this.renderCytoscapeElement.bind(this);
        this.props.updateEntityInfoBox(this.props.match.params.entityId);
    }


    renderCytoscapeElement() {
        let container = this;
        let data = this.props.data;
        let id = this.props.match.params.entityId;
        console.log('* Cytoscape.js is rendering the graph.. with id', id);

        let entity = data.entitys.ids[id];
        let cytoData = getCytoData(data, entity);
        console.log(cytoData);
        let cy = cytoscape(
            cytoParamsFromContainer(document.getElementById('cy'), cytoData)
        );
        cy.ready(function () {
            cy.elements('node[category != "s"]').on(
                'click',
                function (event) {
                    container.props.updateEntityInfoBox(event.target.id())
                }
            );
            cy.elements('edge').on(
                'click',
                function (event) {
                    if (parseInt(event.target.data().target, 10) >= 0 && parseInt(event.target.data().source, 10) >= 0) {
                        container.props.updateShareInfoBox(event.target.data());
                    }
                }
            );
        });
        this.cy = cy;
    }

    componentDidMount() {
        this.renderCytoscapeElement();
    }

    componentDidUpdate(){
        let location = parseInt(this.props.match.params.entityId, 10);
        if (location !== this.props.currentDisplay){
            this.props.displayEntity(location);
            this.renderCytoscapeElement()
        }
    }

    render() {
        let cyStyle = {
            height: '600px',
            width: '80%',
            margin: '20px 0px',
            border: '1px solid black'
        };
        let infoBox;
        if (this.props.infoBox.type === 'entity') {
            infoBox = <InfoBoxEntity {...this.props} idToDisplay={this.props.infoBox.data}/>;
        } else if (this.props.infoBox.type === 'share'){
            console.log(this.props.infoBox);
            infoBox = <InfoBoxShare {...this.props} share={this.props.infoBox.data} />;
        } else {
            infoBox = <p>Error</p>;
        }
        return (
            <div className="node_selected">
                <div id="cy" style={cyStyle} onContextMenu={this.handleContextMenu}>
                </div>
                {infoBox}
            </div >
        );
    }
}



export default CytoContainer;