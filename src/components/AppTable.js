/**
 * Created by lx on 2017/5/3.
 */

import React, {Component} from 'react'
import request from 'utils/request'
import PubSub from 'pubsub-js'

import AppLinkButton from './AppLinkButton'
import qs from 'qs';
import {Table, Button} from 'antd'

export class AppTable extends Component {


  constructor(props) {
    super();


    let getRowItem = (record) => {
      let rowItems = []
      if (props.current.rowItems != undefined) {

        props.current.rowItems.forEach((item, i) => {
          if (item.type == "button") {
            rowItems.push(<AppLinkButton dataContext={record} key={i} id={item.id} pageId={props.pageId}
                                         metadata={props.metadata}
                                         current={item}
                                         onClick={() => {


                                         }}>{item.title}</AppLinkButton>)
          }

        })

        return rowItems;
      }
    }

    this.state = {
      columns: props.current.columns.concat([{
        title: '操作',
        render: (p, record, i) => <div key={i}>{getRowItem(record)}</div>
      }]),
      dataSource: undefined,
      isLoading: false,
      pagination: {
        current: 1,
      }
    }


    PubSub.subscribe(`${props.id}.reload`, (msg, data) => {
      if (data != undefined && data != "")
        this.query = data;
      this.loadData(null);
    })

    PubSub.subscribe(`${props.id}.setQuery`, (msg, data) => {
      this.query = data;
    })

    let params = {};
    if (props.current.target != undefined) {
      PubSub.subscribe(`${props.current.target}.${props.current.targetAction}`, (msg, data) => {
        if (props.current.targetParams != undefined) {
          props.current.targetParams.forEach(p => params[p.key] = data[p.value])
        }
        this.query = params;
        this.loadData()

      })
    }
  }

  loadData(pagination) {
    this.setState({
      isLoading: true
    }, () => {
      let currentDataSource = this.props.metadata.dataSource.find(d => d.key == this.props.current.dataSource);
      if (currentDataSource && currentDataSource.type == "api") {

        let url = "http://localhost:3005" + currentDataSource.url;
        if (pagination) {

          url += `?pageIndex=${pagination.current}&pageSize=${currentDataSource.pageSize}`
        }
        else {
          url += `?pageIndex=${1}&pageSize=${currentDataSource.pageSize}`

        }
        if (this.query) {
          url += "&" + qs.stringify(this.query)
        }
        if (currentDataSource.fields != undefined && currentDataSource.fields.length > 0) {
          url += "&" + qs.stringify({fields: currentDataSource.fields})
        }

        request(url,
          {}, (data) => {
            if (data.success)
              this.setState({
                dataSource: data.data, isLoading: false,
                pagination: {
                  pageSize: data.pageSize,
                  current: data.pageIndex,
                  total: data.total
                }
              }), (err) => this.setState({isLoading: false})
          }
        )
      }
    })

  }

  componentDidMount() {
    if (this.props.current.fetchDataOnLoaded)
      this.loadData()
  }

  componentWillUnmount() {
    PubSub.unsubscribe(this.props.id);
  }

  pageChange(pagination) {
    this.loadData(pagination)
  }

  rowClick(record) {
    const current = this.props.current;
    if (current.enableRowClick)
      this.setState({selectedCodeType: record.id}, () => {

        PubSub.publish(`${current.id}.changed`, record)

        // if (current.target != undefined) {
        //   let params = {};
        //   if (current.targetParams != undefined) {
        //     current.targetParams.forEach(p => params[p.key] = record[p.value])
        //   }
        //   PubSub.publish(`${current.target}.${current.targetAction}`, params)
        // }

      })
  }

  render() {

    return (
      <Table size="middle" loading={this.state.isLoading} dataSource={this.state.dataSource}
             onRowClick={(record) => this.rowClick(record)}
             pagination={this.state.pagination}
             style={{marginTop: 3}}
             onChange={(page) => this.pageChange(page)}
             columns={this.state.columns} bordered={true} rowKey={this.props.current.rowKey}></Table>
    )
  }
}

AppTable.propTypes = {}

export default AppTable
