/**
 * Created by lx on 2017/5/3.
 */

import React, {Component} from 'react'
import request from 'utils/request'
import PubSub from 'pubsub-js'

import {Button} from 'antd'
import sift from 'sift'
export class AppButton extends Component {


  constructor(props) {
    super();


    this.state = {
      disabled: props.current.disabled
    }

    PubSub.subscribe(`${props.id}.disabled`, (msg, data) => {
      this.setState({
        disabled: data
      })
    })

    if (props.current.target != undefined) {
      let params = {};
      PubSub.subscribe(`${props.current.target}.${props.current.targetAction}`, (msg, data) => {
        if (props.current.targetParams != undefined) {
          props.current.targetParams.forEach(p => params[p.key] = data[p.value])
        }
       // PubSub.publish()
        this.dataContext = params;

      })
    }


    let behavior = props.current.behavior;
    if (behavior && behavior.type == "openModal") {
      this.handleClick = () => {
        debugger;
        PubSub.publish(`${props.current.behavior.pageId}.openModal`, {
          dataContext: this.dataContext || props.dataContext,
          behavior: props.current.behavior
        });
        // props.setState({[props.metadata.behavior.pageId]: true});
        props.onClick(props.current)
      }
    } else if (behavior && behavior.type == "closeModal") {
      this.handleClick = () => {
        PubSub.publish(`${props.current.behavior.pageId}.closeModal`, "");

        props.onClick(props.current)
      }
    }
    else if (behavior && behavior.type == "save") {
      this.handleClick = () => {
        PubSub.publish(`${props.pageId}.save`, behavior);

        props.onClick(props.current)
      }
    }
  }

  componentDidMount() {
  }


  // handleClick() {
  //
  // }

  render() {
    const {viewStyle, title, show} = this.props.current;
    if (show) {
      var r = sift.keyOf(show, this.props);
      if (!r)
        return <element></element>
    }
    return (
      <Button disabled={this.state.disabled} style={{marginLeft: 3,}} onClick={() =>

      this.handleClick && this.handleClick()
      } type={viewStyle}>
        {title}
      </Button>
    )
  }
}

AppButton.propTypes = {}

export default AppButton
