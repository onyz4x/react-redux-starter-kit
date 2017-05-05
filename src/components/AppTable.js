/**
 * Created by lx on 2017/5/3.
 */

import React, {Component} from 'react'
import request from 'utils/request'


import {Table, Button} from 'antd'

export class AppTable extends Component {


  constructor(props) {
    super();

    let getRowItem = (record) => {
      let rowItems = []
      if (props.metadata.rowItems != undefined) {

        props.metadata.rowItems.forEach((item) => {
          if (item.type == "button") {
            rowItems.push(<a onClick={() => {
              let currentDataSource = this.props.dataSource.find(d => d.key == item.behavior.dataSource);

              if (currentDataSource && currentDataSource.type == "api") {

                let body = {};
                currentDataSource.params.forEach(p => {
                  body[p.key] = record[p.value]
                })
                request("http://localhost:3005" + currentDataSource.url,
                  {
                    method: "POST",
                    body: JSON.stringify(body)
                  }
                  , (data) => {
                    this.loadData();

                  })
              }


            }} style={{marginLeft: 5}}>{item.title}</a>)
          }

        })

        return rowItems;
      }
    }

    this.state = {
      columns: props.metadata.columns.concat([{
        title: '操作',
        render: (p, record) => <div>{getRowItem(record)}</div>
      }]),
      dataSource: undefined,
      isLoading: false
    }
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

  render() {

    return (
      <Table size="middle" loading={this.state.isLoading} dataSource={this.state.dataSource}
             columns={this.state.columns} bordered={true} rowKey={this.props.metadata.rowkey}></Table>
    )
  }
}

AppTable.propTypes = {}

export default AppTable
