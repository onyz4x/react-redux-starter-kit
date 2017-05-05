/**
 * Created by lx on 2017/5/4.
 */
import React from 'react'
import {Input, Form} from 'antd';
const FormItem = Form.Item;
const TextField = ({input, label, hasFeedback, labelSpan, okChange, wrapperSpan, showRequiredStar, meta: {asyncValidating, touched, error}, ...custom}) => {

  return (

    <FormItem
      label={label}
      labelCol={{span: labelSpan == undefined ? "8" : labelSpan}}
      wrapperCol={{span: wrapperSpan == undefined ? "16" : wrapperSpan}}
      hasFeedback={(hasFeedback == undefined || hasFeedback == true) ? true : false}
      validateStatus={asyncValidating ? "validating" : ((touched && error) ? "error" : "")}
      help={touched && error} required={showRequiredStar ? true : false}
    >
      <Input {...input} size="default" {...custom} onChange={(e) => {
        input.onChange(e);
        okChange && okChange(e)
      } }/>
    </FormItem>
  )

}
export default TextField
