/**
 * Created by lx on 2017/5/4.
 */
import React, {Component} from 'react'
import request from 'utils/request'
import qs from 'qs';
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


const asyncValidate = (values, dispatch, props, blurredField) => {

  let a = props.current.asyncRules;
  if (a) {

    for (var i = 0; i < a.length; i++) {
      if (blurredField == a[i].name) {

        let dataSource = props.current.dataSource.find(d => d.key == a[i].dataSource)

        let body = {};
        if (dataSource) {


          dataSource.params.forEach(p => {
            body[p.key] = values[p.value]
          })


          return new Promise((resolve, reject) => {
            request("http://localhost:3005" + dataSource.url + "?" + qs.stringify(body), {
              method: dataSource.method
            }, (data) => {
              if (data.success && data.data && data.data.length > 0) reject()
              else
                resolve()
            })
          }).then(null, (data) => {
              throw {[a[i].name]: a[i].errorMsg}
            }
          )


        }

      }
      // more statements
    }

  }

  return new Promise((resolve, reject) => resolve());

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

        delete values['commitStamp'];
        delete values['_hash']
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
  validate,
  asyncValidate
})(TestForm)


