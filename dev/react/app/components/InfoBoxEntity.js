import React from 'react';
import { Link } from 'react-router';

class InfoBoxEntity extends React.Component {
    render() {
        let entity = this.props.data.entitys.ids[
            this.props.idToDisplay
        ];
        let seeMore = '';
        if (entity.category !== "s" && entity.id != this.props.params.entityId){
            let destination = '/graph/' + entity.id;
            seeMore = <Link to={destination} onClick={this.props.updateParent.bind(null, entity.id)}>See more for {entity.name}</Link>
        } 
        return (
            <div id={'infoBoxEntity-' + this.props.idToDisplay}>
                <p>
                    {entity.name || ''}
                </p>
                <p>
                    {entity.long_name || ''}
                </p>
                <p>
                    {entity.website || ''}
                </p>
                <p>
                    {entity.wiki || ''}
                </p>
                {seeMore}
            </div>
        );
    }
};

export default InfoBoxEntity;