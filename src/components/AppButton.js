/**
 * Created by lx on 2017/5/3.
 */

import React, {Component} from 'react'
import request from 'utils/request'
import PubSub from 'pubsub-js'

import {Button} from 'antd'

export class AppButton extends Component {


  constructor(props) {
    super();

    let behavior = props.metadata.behavior;
    if (behavior && behavior.type == "openModal") {
      this.handleClick = () => {
        PubSub.publish(`${props.metadata.behavior.pageId}.openModal`, "");
        // props.setState({[props.metadata.behavior.pageId]: true});
        props.onClick(props.metadata)
      }
    } else if (behavior && behavior.type == "closeModal") {
      this.handleClick = () => {
        PubSub.publish(`${props.metadata.behavior.pageId}.closeModal`, "");

        props.onClick(props.metadata)
      }
    }
    else if (behavior && behavior.type == "save") {
      this.handleClick = () => {
        PubSub.publish(`${props.metadata.behavior.pageId}.save`, behavior);

        props.onClick(props.metadata)
      }
    }

  }

  componentDidMount() {
  }


  // handleClick() {
  //
  // }

  render() {
    const {viewStyle, title} = this.props.metadata;

    return (
      <Button style={{margin: 5}} onClick={() =>

      this.handleClick && this.handleClick()
      } type={viewStyle}>
        {title}
      </Button>
    )
  }
}

AppButton.propTypes = {}

export default AppButton
