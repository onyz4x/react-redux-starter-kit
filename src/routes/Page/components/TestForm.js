/**
 * Created by lx on 2017/5/4.
 */
import React, {Component} from 'react'
import request from 'utils/request'

import {reduxForm, Field} from 'redux-form';
import Page from './Page'
import {message, notification} from 'antd'
import PubSub from 'pubsub-js'


const validate = (values, props) => {
  const errors = {}


  let rules = props.current.rules;

  rules.forEach((rule) => {

    let value = values[rule.name]
    if (rule.isRequired && (!value || value.trim() == '')) {
      errors[rule.name] = rule.isRequired.errorMsg;
    }

    if (rule.maxLength && ( value && value.length > rule.maxLength.value)) {
      errors[rule.name] = rule.maxLength.errorMsg;
    }

    if (rule.minLength && ( value && value.length < rule.minLength.value)) {
      errors[rule.name] = rule.minLength.errorMsg;
    }
  })
  return errors
}

export class TestForm extends Component {

  constructor(props) {
    super();

    this.state = {
      dataContext: props.dataContext
    }

    PubSub.subscribe(`${props.pageId}.save`, (msg, data) => {
      props.handleSubmit((values) => {

        let dataSource = props.current.dataSource.find(d => d.key == data.dataSource);

        request("http://localhost:3005" + dataSource.url,
          {
            method: dataSource.method,
            body: JSON.stringify(values)
          }
          , (d) => {
            if (d.success) {
              PubSub.publish(`${props.pageId}.closeModal`, "");
              PubSub.publish(`${data.target}.reload`, "")
              message.success("保存成功！");
            }
            else {
              console.log(d.data)
              notification.error({
                message: 'Error',
                description: d.data.message,
              });
            }
          }, (err) => {
            notification.error({
              message: 'Error',
              description: err.message,
            });

          },
        )

      })()
    })


  }


  render() {
    const {handleSubmit} = this.props;
    return (
      <form>
        <Page {...this.props}/>
      </form>
    )
  }

  componentWillUnmount() {
    PubSub.unsubscribe(`${this.props.id}.save`);
  }
}

TestForm.propTypes = {}

export default reduxForm({
  validate
})(TestForm)


