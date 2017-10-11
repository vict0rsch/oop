import React from 'react';
import { Link } from 'react-router';

class InfoBoxShare extends React.Component {
    render() {
        
        let label = this.props.share.label;
        let source = this.props.share.source;
        let target = this.props.share.target;
        let sourceName = this.props.data.entitys.ids[source].name;
        let targetName = this.props.data.entitys.ids[target].name;

        let str = sourceName + ' owns ' + targetName + ' (' + label + ')';
        return (
            <div id={'infoBoxShare-' + this.props.idToDisplay}>
                {str}
            </div>
        );
    }
};

export default InfoBoxShare;