/**
 * Created by lx on 2017/5/8.
 */
import {Input, Form, Select} from 'antd';
const FormItem = Form.Item;
import request from 'utils/request'
import React, {Component} from 'react'
const Option = Select.Option;
import PubSub from 'pubsub-js'
import qs from 'qs';

export class SelectField extends Component {

  constructor(props) {
    super();
    this.state = {
      dataSource: []
    }

    let {cascadeWith} = props.current;

    if (cascadeWith) {
      PubSub.subscribe(`${props.pageId}.${cascadeWith}.changed`, (msg, data) => {
        props.input.onChange("");
        if (data != undefined)
          this.loadData(props, {
            [cascadeWith]: data
          })
      })
      if (props.initialValues != undefined && props.initialValues[cascadeWith] != undefined) {
        this.loadData(props, {[cascadeWith]: props.initialValues[cascadeWith]})
      }
    }
    else {
      this.loadData(props)
    }

  }

  loadData(props, query) {
    let currentDataSource = props.metadata.dataSource.find(d => d.key == props.current.dataSource);
    if (currentDataSource && currentDataSource.type == "api") {
      let url = "http://localhost:3005" + currentDataSource.url + (query ? "?" + qs.stringify(query) : "");
      request(url,
        {
          method: currentDataSource.method,
        }
        , (data) => {
          if (data.success)
            this.setState({
              dataSource: data.data

            })


        }
      )


    }
  }

  componentWillUnmount() {
    //  PubSub.unsubscribe(`${this.props.id}.${this.props.input.name}.changed`)
    PubSub.unsubscribe(`${this.props.pageId}.${this.props.current.cascadeWith}.changed`)
  }

  render() {

    const {current, input, labelSpan, label, wrapperSpan, showRequiredStar, okChange, meta: {touched, error}, ...custom} = this.props;
    if (input.value == "" || input.value == null)
      input.value = undefined;

    return (
      <FormItem
        label={label}
        labelCol={{span: labelSpan == undefined ? "8" : labelSpan}}
        wrapperCol={{span: wrapperSpan == undefined ? "16" : wrapperSpan}}
        validateStatus={(touched && error) ? "error" : ""}
        help={touched && error} required={showRequiredStar ? true : false}
      >
        <Select placeholder="Please Select" {...input} onChange={(e) => {

          if (e == undefined) {
            input.onChange("");

          }
          else {
            input.onChange(e);
          }
          PubSub.publish(`${this.props.pageId}.${input.name}.changed`, e)
          okChange && okChange(e)
        } }
                {...custom} size="default" allowClear={input.value == "" ? false : true} showArrow={true}
                showSearch
                optionFilterProp="children" filterOption={(inputValue, option) => {
          if (option.props.children.toLowerCase().indexOf(inputValue.toLowerCase()) != -1) {
            return true;
          }
        }}

        >
          {this.state.dataSource.map(c => (
            <Option key={c[current.valueField]} value={c[current.valueField]}>{c[current.displayField]}</Option>)) }

        </Select>
      </FormItem>
    )
  }
}

export default SelectField
