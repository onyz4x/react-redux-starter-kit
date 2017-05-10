/**
 * Created by lx on 2017/5/3.
 */

import React, {Component} from 'react'
import request from 'utils/request'
import PubSub from 'pubsub-js'
import sift from 'sift'
import {Button} from 'antd'

export class AppLinkButton extends Component {


  constructor(props) {
    super();

    if (props.current.behavior && props.current.behavior['forEach']) {
      props.current.behavior.forEach(behavior => {
        if (behavior.type == "fetch") {
          this.handleClick = () => {


            let currentDataSource = props.metadata.dataSource.find(d => d.key == behavior.dataSource);

            if (currentDataSource && currentDataSource.type == "api") {

              let body = {};
              if (props.dataContext && currentDataSource.params)
                currentDataSource.params.forEach(p => {
                  body[p.key] = props.dataContext[p.value]
                })
              request("http://localhost:3005" + currentDataSource.url,
                {
                  method: currentDataSource.method,
                  body: JSON.stringify(body)
                }
                , (data) => {
                  if (data.success && behavior.callbackPubs) {
                    behavior.callbackPubs.forEach(c => {
                      PubSub.publish(c.event, "")
                    })
                  }
                  // PubSub.publish(`${behavior.target}.reload`, "")

                })
            }
          }
        }
        else if (behavior.type == "event") {
          this.handleClick = () => {

            let payload = {};
            if (behavior.payloadMapping) {
              behavior.payloadMapping.forEach(m => {
                payload[m.key] = this.state && this.state.dataContext[m.value] || props.dataContext[m.value]

              })
            }

            PubSub.publish(behavior.event, Object.assign(payload, behavior.payload),
            )
          }
        }

      })
    }


    // let behavior = props.current.behavior;
    // if (behavior && behavior.type == "openModal") {
    //   this.handleClick = () => {
    //     PubSub.publish(`${props.current.behavior.pageId}.openModal`, {
    //       dataContext: props.dataContext,
    //       behavior: props.current.behavior
    //     });
    //     // props.setState({[props.metadata.behavior.pageId]: true});
    //     props.onClick(props.current)
    //   }
    // } else if (behavior && behavior.type == "closeModal") {
    //   this.handleClick = () => {
    //     PubSub.publish(`${props.current.behavior.pageId}.closeModal`, "");
    //
    //     props.onClick(props.current)
    //   }
    // } else if (behavior && behavior.type == "fetch") {
    //   this.handleClick = () => {
    //
    //
    //     let currentDataSource = props.metadata.dataSource.find(d => d.key == props.current.behavior.dataSource);
    //
    //     if (currentDataSource && currentDataSource.type == "api") {
    //
    //       let body = {};
    //       if (props.dataContext)
    //         currentDataSource.params.forEach(p => {
    //           body[p.key] = props.dataContext[p.value]
    //         })
    //       request("http://localhost:3005" + currentDataSource.url,
    //         {
    //           method: currentDataSource.method,
    //           body: JSON.stringify(body)
    //         }
    //         , (data) => {
    //           if (data.success) {
    //
    //           }
    //           PubSub.publish(`${behavior.target}.reload`, "")
    //
    //         })
    //     }
    //
    //     props.onClick(props.current)
    //   }
    // }

  }

  componentDidMount() {

  }


  // handleClick() {
  //
  // }

  render() {
    const {title, show} = this.props.current;
    if (show) {
      var r = sift.keyOf(show, this.props);
      if (!r)
        return <element></element>
    }

    return (
      <a style={{marginLeft: 5}} onClick={(e) => {
        this.handleClick && this.handleClick();
        e.stopPropagation()
      }
      }>
        {title}
      </a>
    )
  }
}

AppLinkButton.propTypes = {}

export default AppLinkButton
