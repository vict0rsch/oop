import React, { Component } from 'react'
import Chip from './Chip';
import logGraph from '../../../../utils/logGraph'


export default class Example extends Component {
    constructor(props) {
        super(props)
        this.handleChipClick = this.handleChipClick.bind(this);
        this.showChips = this.showChips.bind(this);
        this.state = {
            content: ''
        };
    }

    handleChipClick(entity) {
        logGraph(entity.id)
        this.props.show.searchBar && ['/', '/search'].indexOf(this.props.location.pathname) > -1 && this.props.closeAll();
        this.props.history.push('/graph/' + entity.id)
    }


    componentWillUpdate(nextProps, nextState) {
        if (!nextProps.dataIsAvailable || nextState.content.length > 0) {
            return;
        }
        this.showChips(nextProps);
    }


    showChips(props) {
        let indexes = [1, 2]
        const leMonde = props.data.entities.ids[1];
        const patrickDrahi = props.data.entities.ids[149]

        let index1 = Math.floor(Math.random() * props.data.idSet.length);
        let id1 = props.data.idSet[index1];
        while (indexes.indexOf(id1) > -1) {
            index1 = Math.floor(Math.random() * props.data.idSet.length);
            id1 = props.data.idSet[index1];
        }
        indexes.push(id1)
        const entity1 = props.data.entities.ids[id1];

        let index2 = Math.floor(Math.random() * props.data.idSet.length);
        let id2 = props.data.idSet[index2];
        while (indexes.indexOf(id2) > -1) {
            index2 = Math.floor(Math.random() * props.data.idSet.length);
            id2 = props.data.idSet[index2];
        }
        const entity2 = props.data.entities.ids[id2];

        const content = (
            <div style={{ textAlign: 'center' }}>
                <Chip
                    handleChipClick={this.handleChipClick}
                    entity={leMonde}
                />
                <Chip
                    handleChipClick={this.handleChipClick}
                    entity={patrickDrahi}
                />
                <Chip
                    handleChipClick={this.handleChipClick}
                    entity={entity1}
                />
                <Chip
                    handleChipClick={this.handleChipClick}
                    entity={entity2}
                />
            </div>
        );
        if (this.state.content.length === 0) {
            this.setState({
                content
            })
        }
    }


    render() {
        return (
            <div>
                {this.props.translate('home.example')} <br />
                {this.state.content}
            </div>
        )
    }
}
