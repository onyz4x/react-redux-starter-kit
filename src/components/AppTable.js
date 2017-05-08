/**
 * Created by lx on 2017/5/3.
 */

import React, {Component} from 'react'
import request from 'utils/request'
import PubSub from 'pubsub-js'

import AppLinkButton from './AppLinkButton'

import {Table, Button} from 'antd'

export class AppTable extends Component {


  constructor(props) {
    super();


    let getRowItem = (record) => {
      let rowItems = []
      if (props.metadata.rowItems != undefined) {

        props.metadata.rowItems.forEach((item, i) => {
          if (item.type == "button") {
            rowItems.push(<AppLinkButton dataContext={record}  key={i} id={props.id} dataSource={props.dataSource} metadata={item}
                                         onClick={() => {


                                         }} >{item.title}</AppLinkButton>)
          }

        })

        return rowItems;
      }
    }

    this.state = {
      columns: props.metadata.columns.concat([{
        title: '操作',
        render: (p, record, i) => <div key={i}>{getRowItem(record)}</div>
      }]),
      dataSource: undefined,
      isLoading: false
    }


    PubSub.subscribe(`${props.id}.reload`, () => {
      this.loadData();
    })
  }

  loadData() {
    this.setState({
      isLoading: true
    }, () => {
      let currentDataSource = this.props.dataSource.find(d => d.key == this.props.metadata.dataSource);
      if (currentDataSource && currentDataSource.type == "api")
        request("http://localhost:3005" + currentDataSource.url,
          {}, (data) => this.setState({dataSource: data, isLoading: false}), (err) => this.setState({isLoading: false})
        )
    })

  }

  componentDidMount() {
    this.loadData()
  }

  componentWillUnmount() {
    PubSub.unsubscribe(this.props.id);
  }

  render() {

    return (
      <Table size="middle" loading={this.state.isLoading} dataSource={this.state.dataSource}
             columns={this.state.columns} bordered={true} rowKey={this.props.metadata.rowKey}></Table>
    )
  }
}

AppTable.propTypes = {}

export default AppTable
