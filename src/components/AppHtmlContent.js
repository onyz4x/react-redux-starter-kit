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
      dataContext: props.dataContext,
      html: "<div>dd</div>"
    }
  }

  componentDidMount() {

  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   return !this.state.disabled == nextState.disabled;
  //
  // }

  // handleClick() {
  //
  // }

  render() {
    return <element
      dangerouslySetInnerHTML={(() => ({__html: this.state.html}))()}></element>

  }
}

AppHtmlContent
  .propTypes = {}

export
default
AppHtmlContent
