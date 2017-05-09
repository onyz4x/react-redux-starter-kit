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


        onSearch={(value =>
            this.onSearch(value)
        )}
      />
    )
  }
}

AppSearch
  .propTypes = {}

export
default
AppSearch
