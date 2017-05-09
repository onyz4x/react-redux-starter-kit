/**
 * Created by lx on 2017/5/9.
 */

import React, {Component} from 'react'
import request from 'utils/request'
import PubSub from 'pubsub-js'
import {Input} from 'antd'
const Search = Input.Search;

export class AppSearch extends Component {


  constructor(props) {
    super();
    this.state = {
      text: ""

    }
  }

  componentDidMount() {
  }


  onChange(value) {
    let query = null;
    if (value != undefined && value.trim() != "") {
      query = {
        "$or": []
      }

      this.props.current.behavior.criteria.forEach(c => {
        query["$or"].push({
          [c]: {$regex: value}
        })
      })
    }

    PubSub.publish(`${this.props.current.behavior.target}.setQuery`, query)
  }

  onSearch(value) {

    let query = null;
    if (value != undefined && value.trim() != "") {
      query = {
        "$or": []
      }

      this.props.current.behavior.criteria.forEach(c => {
        query["$or"].push({
          [c]: {$regex: value}
        })
      })
    }


    PubSub.publish(`${this.props.current.behavior.target}.reload`, query)


  }

  render() {

    return (
      <Search
        placeholder="请输入搜索内容"
        onChange={e => this.onChange(e.target.value)}
        onSearch={value => this.onSearch(value)
        }
      />
    )
  }
}

AppSearch
  .propTypes = {}

export
default
AppSearch
