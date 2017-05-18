/**
 * Created by lx on 2017/5/3.
 */

import React, {Component} from 'react'
import request from 'utils/request'
import PubSub from 'pubsub-js'
var moment = require('moment');
import AppLinkButton from './AppLinkButton'
import qs from 'qs';
import {Table, Button, Card, Tree} from 'antd'
var ReactDOMServer = require('react-dom/server');
var HtmlToReactParser = require('html-to-react').Parser;
var ProcessNodeDefinitions = require('html-to-react').ProcessNodeDefinitions;
import update from 'react-addons-update';
const TreeNode = Tree.TreeNode;

export class AppTree extends Component {


  constructor(props) {
    super();
    this.state = {}

    if (props.current.subscribes != undefined) {

      props.current.subscribes.forEach(s => {
        PubSub.subscribe(s.event, (msg, data) => {
          if (s.pubs) {
            s.pubs.forEach(p => {
              if (p.payloadMapping) {
                let temp = {};
                p.payloadMapping.forEach(m => temp[m.key] = data[m.value])
                PubSub.publish(p.event,
                  Object.assign({}, this.state.dataContext, temp)
                )
              }
              else

                PubSub.publish(p.event,

                  Object.assign({}, this.state.dataContext, p.payload)
                )
            })

          }
        })
      })
    }
  }

  loadData() {
    this.setState({
      isLoading: true
    }, () => {
      let currentDataSource = this.props.metadata.dataSource.find(d => d.key == this.props.current.dataSource);
      if (currentDataSource && currentDataSource.type == "api") {

        let url = "http://localhost:3005" + currentDataSource.url;
        // else {
        //   url += `?pageIndex=${1}&pageSize=${currentDataSource.pageSize}`
        //
        // }
        if (this.query) {
          url += "&" + qs.stringify(this.query)
        }
        if (currentDataSource.fields != undefined && currentDataSource.fields.length > 0) {
          url += "&" + qs.stringify({fields: currentDataSource.fields})
        }

        request(url,
          {}, (data) => {
            if (data.success) {
              this.setState({
                dataSource: data.data, isLoading: false,
              })


              PubSub.publish(`${this.props.id}.dataSourceChanged`, data)
            }

          }, (err) => this.setState({isLoading: false})
        )
      }
    })

  }

  componentDidMount() {
    if (this.props.current.fetchDataOnLoaded)
      this.loadData()
  }

  componentWillUnmount() {
    if (this.props.current.subscribes != undefined) {
      this.props.current.subscribes.forEach(s => {
        PubSub.unsubscribe(s.event);
      })
    }
  }

  onSelect = (selectedKeys, info) => {
    console.log((`${this.props.id}.selected`), {id: selectedKeys[0]})
    PubSub.publish(`${this.props.id}.selected`, {id: selectedKeys[0]})
  }
  onCheck = (checkedKeys, info) => {
    console.log('onCheck', checkedKeys, info);
  }


  render() {

    const {dataSource} = this.state;
    if (dataSource == undefined) return null;
    let root = dataSource.find(d => d.parentId == undefined);
    let loop = (parentId) => {

      return dataSource.filter(d => d.parentId == parentId).map(s => {
        if (dataSource.find(f => f.parentId == s.id)) {
          return <TreeNode title={s.name} key={s.id}>
            { loop(s.id)}
          </TreeNode>
        }
        else {
          return <TreeNode title={s.name} key={s.id}>
          </TreeNode>
        }
      })


    }

    return (
      <Tree
        defaultExpandAll={true}
        // defaultExpandedKeys={['0-0-0', '0-0-1']}
        // defaultSelectedKeys={['0-0-0', '0-0-1']}
        // defaultCheckedKeys={['0-0-0', '0-0-1']}
        onSelect={this.onSelect}
        showLine
        onCheck={this.onCheck}
      >
        <TreeNode title={root.name} key={root.id}>
          {loop(root.id)}
        </TreeNode>
      </Tree>
    )
  }
}

AppTree.propTypes = {}

export default AppTree
