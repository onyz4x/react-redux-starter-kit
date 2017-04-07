/**
 * Created by lx on 16/9/14.
 */
import React from 'react'
import {Field, reduxForm, change} from 'redux-form';
import config from 'utils/config'
import {
  TextField,
  CheckboxField,
  SelectField,
  MultiSelectField,
  CheckboxGroupField,
  RadioGroupField,
  NumberField,
  DatePickerField,
  TreeSelectField
} from 'components/Form'

import {Form, Row, Col, Select, Button, Radio, Card, Tree} from 'fe-common';
import {validateMsg} from 'antd'
const FormItem = Form.Item;


const validate = values => {
  const errors = {}

  if (!values.code) {
    errors.code = validateMsg.required('Code')
  }

  if (!values.<%= realEntityName %>Name) {
    errors.<%= realEntityName %>Name = validateMsg.required('<%= pascalEntityName %> name')
  }

  if (values.code && !/^[A-Za-z0-9]*$/.test(values.code)) {
    errors.code = validateMsg.limitLettersOrNumbers('Code')
  }


  return errors
}

export const InsertForm = (props) => {
  const { handleSubmit,initialValues,submitting} = props;
  return (
    <div style={{padding: 10}}>
      <form  onSubmit={handleSubmit}>
        <Row>
          <Col sm={12}>
            <Field name="code" disabled={initialValues ? true : false} showRequiredStar label="<%= pascalEntityName %> Code"
                   placeholder="<%= pascalEntityName %> Code" maxLength="6"
                   component={TextField}/>
          </Col>
          <Col sm={12}>
          <Field name="<%= realEntityName %>Name" showRequiredStar label="<%= pascalEntityName %> Name" placeholder="<%= pascalEntityName %> Name" maxLength="50"
                 component={TextField}/>
        </Col>
        </Row>
        <Row>
          <Col sm={24}>
            <Field labelSpan="4" wrapperSpan="20" name="description" maxLength="1000" rows={4} type="textarea"
                   label="Description"
                   placeholder="Description" component={TextField}/>
          </Col>

        </Row>

        <Row>
          <Col span={12} offset={12} style={{ textAlign: 'right' }}>
            <Button key="back" type="ghost"  disabled={submitting} onClick={()=>props.closeInsertForm()} style={{width:70,marginRight:10}} >Cancel</Button>
            <Button key="submit" type="primary" loading={submitting} htmlType="submit"  style={{width:70}} >
              Save
            </Button>
          </Col>

        </Row>
      </form>
    </div>
  )
}

export default reduxForm({
  form: '<%= pascalEntityName %>InsertForm',
  validate
})(InsertForm);
