/**
 * Created by lx on 2017/5/3.
 */

import React, {Component} from 'react'
import request from 'utils/request'
import PubSub from 'pubsub-js'
var moment = require('moment');
import AppLinkButton from './AppLinkButton'
import qs from 'qs';
import {Table, Button, Card} from 'antd'
var ReactDOMServer = require('react-dom/server');
var HtmlToReactParser = require('html-to-react').Parser;
var ProcessNodeDefinitions = require('html-to-react').ProcessNodeDefinitions;
import update from 'react-addons-update';
export class AppTable extends Component {


  constructor(props) {
    super();


    let getRowItem = (record) => {
      let rowItems = []
      if (props.current.rowItems != undefined) {

        props.current.rowItems.forEach((item, i) => {
          if (item.type == "button") {
            rowItems.push(<AppLinkButton dataContext={Object.assign({}, this.state.dataContext, record)} key={i}
                                         id={item.id} pageId={props.pageId}
                                         metadata={props.metadata}
                                         current={item}
                                         onClick={() => {


                                         }}>{item.title}</AppLinkButton>)
          }

        })

        return rowItems;
      }
    }

    let me = this;
    this.state = {
      columns: props.current.columns.map(c => {
        if (c.render) {
          return {
            title: c.title, render: (text, record) => {
              let dd = ejs.render("<elemnet>" + c.render + "</elemnet>", {record, moment});


              var isValidNode = function () {
                return true;
              };

// Order matters. Instructions are processed in the order they're defined
              var processNodeDefinitions = new ProcessNodeDefinitions(React);
              var processingInstructions = [
                {
                  // Custom <h1> processing
                  shouldProcessNode: function (node) {
                    return node.name === 'card';
                  },
                  processNode: function (node, children) {
                    return <Card></Card>
                  }
                }, {
                  // Anything else
                  shouldProcessNode: function (node) {
                    return true;
                  },
                  processNode: processNodeDefinitions.processDefaultNode
                }];
              // debugger;
              var htmlToReactParser = new HtmlToReactParser();
              var reactElement = htmlToReactParser.parseWithInstructions(dd, isValidNode,
                processingInstructions);
              var reactHtml = ReactDOMServer.renderToStaticMarkup(reactElement);
              return reactElement
              // debugger;
              // return <element
              //   dangerouslySetInnerHTML={(() => ({__html: dd}))()}></element>
            }
          }
        }
        else
          return c;

      }).concat([{
        title: '操作',
        render: (p, record, i) => <div key={i}>{getRowItem(record)}</div>
      }]),
      dataSource: undefined,
      isLoading: false,
      pagination: {
        current: 1,
      },
      dataContext: props.dataContext
    }


    PubSub.subscribe(`${props.id}.reload`, (msg, data) => {
      if (data != undefined && data != "")
        this.query = data;
      this.loadData(null);
    })

    PubSub.subscribe(`${props.id}.clearSelect`, () => {
      this.setState({
        selectedRow: undefined
      })
    })

    PubSub.subscribe(`${props.id}.clear`, () => {
      this.setState({
        dataSource: []
      })
    })

    PubSub.subscribe(`${props.id}.setQuery`, (msg, data) => {
      this.query = data;
    })

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
            if (data.success) {
              this.setState({
                dataSource: data.data, isLoading: false,
                pagination: {
                  pageSize: data.pageSize,
                  current: data.pageIndex,
                  total: data.total
                }
              })
              PubSub.publish(`${this.props.id}.dataSourceChanged`, data)

              if (this.props.current.enableRowClick && !data.data.find(d => d[this.props.current.rowKey] == this.state.selectedRow)) {
                console.log("unfound info")
                PubSub.publish(`${this.props.id}.clearSelect`, "")
              }
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
    PubSub.unsubscribe(`${this.props.id}.setQuery`);
    PubSub.unsubscribe(`${this.props.id}.clear`);
    PubSub.unsubscribe(`${this.props.id}.clearSelect`);
    PubSub.unsubscribe(`${this.props.id}.reload`);
    if (this.props.current.subscribes != undefined) {
      this.props.current.subscribes.forEach(s => {
        PubSub.unsubscribe(s.event);
      })
    }
  }

  pageChange(pagination) {
    this.loadData(pagination)
  }

  rowClick(record) {
    const current = this.props.current;
    if (current.enableRowClick)
      this.setState({selectedRow: record[current.rowKey]}, () => {
        PubSub.publish(`${current.id}.changed`, record)
      })
  }

  render() {

    return (
      <Table size="middle" loading={this.state.isLoading} dataSource={this.state.dataSource}
             onRowClick={(record) => this.rowClick(record)}
             pagination={this.state.pagination}
             style={{marginTop: 3}}
             rowClassName={(record) => record[this.props.current.rowKey] == this.state.selectedRow ? "tableSelected" : ""}
             onChange={(page) => this.pageChange(page)}
             columns={this.state.columns} bordered={true} rowKey={this.props.current.rowKey}></Table>
    )
  }
}

AppTable.propTypes = {}

export default AppTable
