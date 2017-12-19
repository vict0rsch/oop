import React, { Component } from 'react'
import Form from '../../../../Utils/Form'
import TextInput from '../../../../Utils/TextInput'
import EntitySelect from '../../../../Utils/EntitySelect'
import { Control } from 'react-redux-form';
import Button from 'material-ui/Button';
import { isInRange, isPositiveNumber } from "../../../../../utils/formValidators";
import Radio from 'material-ui/Radio';
import { isURL } from 'validator';
import Help from '../../../../Utils/HelpIcon';


const leftTdStyle = {
    width: '45%',
    textAlign: 'left'
}

const rightTdStyle = {
    ...leftTdStyle,
    textAlign: 'right'
}

const switchStyle = {
    float: 'right',
    marginRight: '-14px'
}


export default class EditEntityForm extends Component {

    state = {
        clearParent: 0,
        clearChild: 0,
        radio: "modify",
        showForm: false
    }

    reset = () => {
        this.props.rrfReset('editEntityForm.entity')
        this.setState({
            clearParent: this.state.clearParent + 1,
            clearChild: this.state.clearChild + 1
        });
    }

    componentWillUnmount() {
        this.reset();
    }


    handleSubmit = (component, form) => {
        form && console.log('Entity submitted: ', form.entity);
        setTimeout(() => { component && component.makeNotPending() }, 1000)
    }

    handleChange = (values) => {
        // console.log(values)
    }

    handleRadioChange = (event) => {
        this.setState({
            radio: event.target.value,
            showForm: this.props.editEntityForm.forms.entity.selectedEntity.value || event.target.value === "create" ? true : false
        })
    }

    handleEntityChange = (values, form) => {
        if (values && values.id) {
            const entity = this.props.data.entities.ids[values.id];
            console.log(entity)
            if (entity) {
                this.props.rrfChange('editEntityForm.entity.name', entity.name);
                this.props.rrfChange('editEntityForm.entity.long_name', entity.long_name);
                this.props.rrfChange('editEntityForm.entity.other_groups', entity.other_groups);
                this.props.rrfChange('editEntityForm.entity.wiki_link', entity.wiki_link);
                this.props.rrfChange('editEntityForm.entity.website', entity.website);
            }
            this.setState({
                showForm: true
            })
        }
    }

    render() {
        let c00, c01, c10, c11, c20, c21, c30, c31, c40, c41, c50, c51;

        c00 = (<div>
            Modify an Entity
            <Radio
                checked={this.state.radio === "modify"}
                onChange={this.handleRadioChange}
                value="modify"
            />
            <Radio
                checked={this.state.radio === "create"}
                onChange={this.handleRadioChange}
                value="create"
            />Create an Entity
        </div>)
        c10 = this.state.radio === "modify" ? "Entity" : '';
        c20 = this.state.radio === "modify" ?
            <Control.text
                model=".selectedEntity"
                validators={{
                    required: (val) => { return (val && val.label) || this.state.radio === "create" },
                }}
                validateOn="change"
                component={EntitySelect}
                controlProps={{
                    placeholder: 'Entity Selector',
                    autofocus: true,
                    ...this.props,
                    clear: this.state.clearParent,
                    style: { width: '95%', display: 'inline-block' },
                    initialValue: this.props.editEntityForm.entity.name || ''
                }}
                onChange={this.handleEntityChange}
            /> : '';

        c30 = this.state.showForm && <Control.text
            model=".name"
            validators={{
                required: (val) => { return val !== null && val !== undefined },
            }}
            validateOn="change"
            component={TextInput}
            controlProps={{
                model: this.props.editEntityForm.entity,
                label: "Name",
                id: 'name',
                style: { width: '95%' }
            }} />;

        c31 = this.state.showForm && <Control.text
            model=".long_name"
            validateOn="change"
            component={TextInput}
            controlProps={{
                model: this.props.editEntityForm.entity,
                label: "Long Name",
                id: 'long_name',
                style: { width: '95%' }
            }} />;

        c40 = this.state.showForm && <Control.text
            model=".other_groups"
            validateOn="change"
            component={TextInput}
            controlProps={{
                model: this.props.editEntityForm.entity,
                label: "Other Groups",
                id: 'other_groups',
                style: { width: '95%' }
            }} />;

        c41 = this.state.showForm && <Control.text
            validators={{
                emptyOrUrl: (val) => {
                    return val ? isURL(val) : true
                }
            }}
            model=".website"
            validateOn="change"
            component={TextInput}
            controlProps={{
                model: this.props.editEntityForm.entity,
                label: "Website",
                id: 'website',
                style: { width: '95%' }
            }} />;

        c50 = this.state.showForm && <Control.text
            validators={{
                emptyOrUrl: (val) => {
                    return val ? isURL(val) && val.indexOf('wikipedia.org') > -1 : true
                }
            }}
            model=".wiki_link"
            validateOn="change"
            component={TextInput}
            controlProps={{
                model: this.props.editEntityForm.entity,
                label: "Wikipedia",
                id: 'wiki_link',
                style: { width: '95%' }
            }} />;


        const source = this.state.showForm && <div><Control.text
            model=".source"
            validators={{
                required: (val) => { return val && val.length },
            }}
            validateOn="change"
            component={TextInput}
            controlProps={{
                model: this.props.editEntityForm.entity,
                label: "Source",
                id: 'source',
                multiline: true,
                rowsMax: 3,
                style: { width: '100%' }
            }} />
            <Help content="test" />
        </div>;

        const table = (<table style={{ width: '100%' }}><tbody>
            <tr><td style={leftTdStyle}>{c00 || ''}</td><td style={rightTdStyle}>{c01 || ''}</td></tr>
            <tr><td style={leftTdStyle}>{c10 || ''}</td><td style={rightTdStyle}>{c11 || ''}</td></tr>
            <tr><td style={leftTdStyle}>{c20 || ''}</td><td style={rightTdStyle}>{c21 || ''}</td></tr>
            <tr><td style={leftTdStyle}>{c30 || ''}</td><td style={rightTdStyle}>{c31 || ''}</td></tr>
            <tr><td style={leftTdStyle}>{c40 || ''}</td><td style={rightTdStyle}>{c41 || ''}</td></tr>
            <tr><td style={leftTdStyle}>{c50 || ''}</td><td style={rightTdStyle}>{c51 || ''}</td></tr>
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
            form={this.props.editEntityForm.forms}
            buttonText={'Entity Submit Text'}
            model={'editEntityForm.entity'}
            errorsLocation={'graph.editEntity.errors'}
            onSubmit={this.handleSubmit}
            fields={content}
            reset={<Button onClick={this.reset}>Reset Form</Button>}
            onChange={this.handleChange}
        />;
    }
}
