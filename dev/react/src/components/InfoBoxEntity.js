import React from 'react';
import { Link, withRouter } from 'react-router-dom';


class InfoBoxEntity extends React.Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        let entity = this.props.data.entitys.ids[
            this.props.idToDisplay
        ];
        // let location = this.props.location.pathname;
        // let index = location.indexOf('/graph/');
        // let newPath = location.slice(0, index) + '/graph/' + entity.id

        this.props.history.push('/graph/' + entity.id);
    }

    render() {
        let entity = this.props.data.entitys.ids[
            this.props.idToDisplay
        ];
        let seeMore = '';
        if (entity.category !== "s" && entity.id !== this.props.match.params.entityId) {
            let destination = '/graph/' + entity.id;
            seeMore = <Link to={destination} onClick={this.handleClick}>See more for {entity.name}</Link>
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


export default withRouter(InfoBoxEntity);