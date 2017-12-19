import React, { Component } from 'react'
import Form from '../../../../Utils/Form'
import TextInput from '../../../../Utils/TextInput'
import EntitySelect from '../../../../Utils/EntitySelect'
import { Control } from 'react-redux-form';
import Button from 'material-ui/Button';
import { isInRange, isPositiveNumber } from "../../../../../utils/formValidators";

const leftTdStyle = {
    // width: '45%',
    textAlign: 'left'
}

const rightTdStyle = {
    ...leftTdStyle,
    textAlign: 'right'
}


export default class EditEdgeForm extends Component {

    state = {
        clearParent: 0,
        clearChild: 0
    }

    reset = () => {
        this.props.rrfReset('editEdgeForm.edge.parent')
        this.props.rrfReset('editEdgeForm.edge.child')
        this.props.rrfReset('editEdgeForm.edge.value')
        this.props.rrfReset('editEdgeForm.edge.special')
        this.props.rrfReset('editEdgeForm.edge.source')
        this.setState({
            clearParent: this.state.clearParent + 1,
            clearChild: this.state.clearChild + 1
        });
    }

    componentWillUnmount() {
        this.reset();
    }


    handleSubmit = (component, form) => {
        form && console.log('Edge submitted: ', form.edge);
        setTimeout(() => { component && component.makeNotPending() }, 1000)
    }

    handleChange = (values) => {
        // console.log(values)
    }

    render() {
        let c00, c01, c10, c11, c20, c21, c30, c31, c40, c41;

        c00 = "Parent Entity"
        c10 = <Control.text
            model=".parent"
            validators={{
                required: (val) => { return val && val.label },
            }}
            validateOn="change"
            component={EntitySelect}
            controlProps={{
                placeholder: 'Entity Selector',
                autofocus: true,
                ...this.props,
                clear: this.state.clearParent,
                style: { width: '95%', display: 'inline-block' },
                initialValue: this.props.editEdgeForm.edge.parent ? this.props.editEdgeForm.edge.parent.id : ''
            }}
        />;

        c01 = "Child Entity"
        c11 = <Control.text
            model=".child"
            validators={{
                required: (val) => { return val && val.label },
            }}
            validateOn="change"
            component={EntitySelect}
            controlProps={{
                placeholder: 'Entity Selector',
                autofocus: true,
                ...this.props,
                clear: this.state.clearChild,
                style: { width: '95%', display: 'inline-block' },
                initialValue: this.props.editEdgeForm.edge.child ? this.props.editEdgeForm.edge.child.id : ''
            }}
        />;

        c20 = <Control.text
            model=".value"
            validators={{
                required: (val) => { return val !== null && val !== undefined },
                isPositiveNumber,
                isInRange
            }}
            validateOn="change"
            component={TextInput}
            controlProps={{
                model: this.props.editEdgeForm.edge,
                label: "Value",
                id: 'value',
                style: { width: '95%' }
            }} />;

        c21 = <Control.text
            model=".special"
            validateOn="change"
            component={TextInput}
            controlProps={{
                model: this.props.editEdgeForm.edge,
                label: "Special",
                id: 'special',
                style: { width: '95%' }
            }} />;

        c30 = <br />

        const source = <Control.text
            model=".source"
            validators={{
                required: (val) => { return val && val.length },
            }}
            validateOn="change"
            component={TextInput}
            controlProps={{
                model: this.props.editEdgeForm.edge,
                label: "Source",
                id: 'source',
                multiline: true,
                rowsMax: 3,
                style: { width: '100%' }
            }} />;

        const table = (<table style={{ width: '100%' }}><tbody>
            <tr><td style={leftTdStyle}>{c00 || ''}</td><td style={rightTdStyle}>{c01 || ''}</td></tr>
            <tr><td style={leftTdStyle}>{c10 || ''}</td><td style={rightTdStyle}>{c11 || ''}</td></tr>
            <tr><td style={leftTdStyle}>{c20 || ''}</td><td style={rightTdStyle}>{c21 || ''}</td></tr>
            <tr><td style={leftTdStyle}>{c30 || ''}</td><td style={rightTdStyle}>{c31 || ''}</td></tr>
        </tbody></table>);

        const content = (
            <div>
                {table}
                <br />
                {source}
            </div>
        );


        return <Form
            {...this.props}
            form={this.props.editEdgeForm.forms}
            buttonText={'Edge Submit Text'}
            model={'editEdgeForm.edge'}
            errorsLocation={'graph.editEdge.errors'}
            onSubmit={this.handleSubmit}
            fields={content}
            reset={<Button onClick={this.reset}>Reset Form</Button>}
            onChange={this.handleChange}
        />;
    }
}
