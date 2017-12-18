import React, { Component } from 'react'
import Switch from 'material-ui/Switch';

const labelStyle = {
    float: 'left',
    textAlign: 'left'
}

const switchStyle = {
    float: 'right'
}

const divStyle = {
    margin: '10px 0px',
    display: 'inline-block'
}


export default class ShowChips extends Component {
    constructor(props) {
        super(props)
        this.state = {
            checked: this.props.show.chips,
        };
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.show.chips !== this.props.show.chips) {
            this.setState({
                checked: nextProps.show.chips
            })
        }
    }


    handleChange = (event, checked) => {
        if (this.props.show.chips !== checked) {
            this.props.toggleChips();
        }
        this.setState({ checked });
    };

    render() {
        return (
            <div style={divStyle} >
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <div style={labelStyle}>
                                    {this.props.translate('home.settings.showChips')}
                                </div>
                            </td>
                            <td>
                                <div style={switchStyle}>
                                    <Switch
                                        checked={this.state.checked}
                                        onChange={this.handleChange}
                                        aria-label="checked"
                                    />
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </ div>
        )
    }
}