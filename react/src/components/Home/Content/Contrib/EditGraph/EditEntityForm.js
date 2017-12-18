import React, { Component } from 'react'
import Form from '../../../../Utils/Form'

export default class EditEntityForm extends Component {
    render() {


        return <Form
            {...this.props}
            form={this.props.editEntityForm.forms}
            buttonText={'Entity Submit Text'}
            model={'editEntityForm.entity'}
            errorsLocation={'graph.editEntity.errors'}
            onSubmit={(values) => { console.log('Entity submitted: ', values) }}
            fields={['aa']}
        />;
    }
}
