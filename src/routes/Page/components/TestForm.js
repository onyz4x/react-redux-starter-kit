/**
 * Created by lx on 2017/5/4.
 */
import React, {Component} from 'react'
import request from 'utils/request'

import {reduxForm, Field} from 'redux-form';
import Page from './Page'
import {message, notification} from 'antd'
import PubSub from 'pubsub-js'
export class TestForm extends Component {

  constructor(props) {
    super();

    PubSub.subscribe(`${props.id}.save`, (msg, behavior) => {
      props.handleSubmit((values) => {

        let dataSource = props.current.dataSource.find(d => d.key == behavior.dataSource);

        request("http://localhost:3005" + dataSource.url,
          {
            method: "POST",
            body: JSON.stringify(values)
          }
          , (data) => {

            PubSub.publish(`${props.id}.closeModal`, "");

            PubSub.publish(`${props.parentId}.reload`, "")

            message.success("保存成功！" + props.parentId);

          }, (err) => {
            notification.error(err.message)

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

export default reduxForm({})(TestForm)


