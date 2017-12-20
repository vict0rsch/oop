import React, { Component } from 'react'
import Button from 'material-ui/Button';
import Radio from 'material-ui/Radio';
import { Control } from 'react-redux-form';
import { isURL } from 'validator';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import Form from '../../../../Utils/Form'
import TextInput from '../../../../Utils/TextInput'
import EntitySelect from '../../../../Utils/EntitySelect'
import Help from '../../../../Utils/HelpIcon';


const leftTdStyle = {
    width: '45%',
    textAlign: 'left'
}

const rightTdStyle = {
    ...leftTdStyle,
    textAlign: 'right'
}

const selectStyle = {
    borderWidth: '1px',
    borderRadius: '0px',
    zIndex: 999,
    margin: 'auto',
    width: '95%',
    textAlign: 'center'
};

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        background: theme.palette.background.paper,
        width: '100%'
    }
});

class EditEntityForm extends Component {

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
        event.target.value === 'create' && this.reset();
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


        const choice = (<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
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

        const selectEntity = this.state.radio === "modify" ?
            <div style={{height:100}}><Control.text
                model=".selectedEntity"
                validators={{
                    required: (val) => { return (val && val.label) || this.state.radio === "create" },
                }}
                validateOn="change"
                component={EntitySelect}
                controlProps={{
                    placeholder: 'Select An Entity',
                    autofocus: true,
                    ...this.props,
                    clear: this.state.clearParent,
                    style: selectStyle,
                    initialValue: this.props.editEntityForm.entity.name || ''
                }}
                onChange={this.handleEntityChange}
            /></div> : '';

        const name = this.state.showForm && <Control.text
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
                style: { width: '95%' },
                endAdornment: <Help content="test" />
            }} />;

        const longName = this.state.showForm && <Control.text
            model=".long_name"
            validateOn="change"
            component={TextInput}
            controlProps={{
                model: this.props.editEntityForm.entity,
                label: "Long Name",
                id: 'long_name',
                style: { width: '95%' },
                endAdornment: <Help content="test" />
            }} />;

        const otherGroups = this.state.showForm && <Control.text
            model=".other_groups"
            validateOn="change"
            component={TextInput}
            controlProps={{
                model: this.props.editEntityForm.entity,
                label: "Other Groups",
                id: 'other_groups',
                style: { width: '95%' },
                endAdornment: <Help content="test" />
            }} />;

        const website = this.state.showForm && <Control.text
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
                style: { width: '95%' },
                endAdornment: <Help content="test" />
            }} />;

        const wikiLink = this.state.showForm && <Control.text
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
                style: { width: '95%' },
                endAdornment: <Help content="test" />
            }} />;


        const source = this.state.showForm && <Control.text
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
                style: { width: '95%' }
            }} />;

        const grid = (
            <div className={this.props.classes.root}>
                <Grid container spacing={16}>
                    <Grid item xs={12}> {choice} </Grid>
                    <Grid item xs={12}> {selectEntity} </Grid>
                    <Grid item xs={12} sm={6} lg={4}> {name} </Grid>
                    <Grid item xs={12} sm={6} lg={4}> {longName} </Grid>
                    <Grid item xs={12} sm={6} lg={4}> {otherGroups} </Grid>
                    <Grid item xs={12} sm={6} lg={4}> {website} </Grid>
                    <Grid item xs={12} sm={6} lg={4}> {wikiLink} </Grid>
                    <Grid item xs={12} sm={6} lg={4}> {source} </Grid>
                </Grid>
            </div>
        )

        return <Form
            {...this.props}
            form={this.props.editEntityForm.forms}
            buttonText={'Entity Submit Text'}
            model={'editEntityForm.entity'}
            errorsLocation={'graph.editEntity.errors'}
            onSubmit={this.handleSubmit}
            fields={grid}
            reset={<Button onClick={this.reset}>Reset Form</Button>}
            onChange={this.handleChange}
        />;
    }
}

export default withStyles(styles)(EditEntityForm);
