/**
 * Created by lx on 2017/5/3.
 */

import React, {Component} from 'react'
import request from 'utils/request'
import PubSub from 'pubsub-js'
import sift from 'sift'
import {Button} from 'antd'

export class AppHtmlContent extends Component {


  constructor(props) {
    super();
    this.state = {
      dataContext: props.dataContext
    }
    PubSub.subscribe(`${props.id}.dataContext`, (msg, data) => {
      this.setState({
        dataContext: Object.assign({}, this.state.dataContext, data)
      })


    })

    if (props.current.subscribes != undefined) {

      props.current.subscribes.forEach(s => {
        PubSub.subscribe(s.event, (msg, data) => {
          if (s.pubs) {
            s.pubs.forEach(p => {
              if (p.payloadMapping) {
                let temp = {};


                //todo: merge dataContext
                p.payloadMapping.forEach(m => temp[m.key] = data[m.value])
                PubSub.publish(p.event,
                  Object.assign({}, this.state.dataContext, temp, p.payload)
                )
              }
              else
                PubSub.publish(p.event,
                  Object.assign({}, this.state.dataContext, p.payload, data)
                )
            })

          }
        })
      })
    }
  }

  componentDidMount() {

  }

  render() {

    console.log(this.state.dataContext)
    let html = template.render("<elemnet>" + this.props.current.html + "</elemnet>", {
        dataContext: this.state.dataContext
      })
    ;

    return <element
      dangerouslySetInnerHTML={(() => ({__html: html}))()}></element>

  }
}

AppHtmlContent
  .propTypes = {}

export
default
AppHtmlContent
