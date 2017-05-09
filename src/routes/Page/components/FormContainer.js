/**
 * Created by lx on 2017/5/4.
 */
import TestForm from './TestForm';
import {connect} from 'react-redux'
import React, {Component} from 'react'
import request from 'utils/request'

import qs from 'qs';

class FormContainer extends Component {


  constructor(props) {
    super();

    if (props.behavior.mode == "edit") {
      this.state = {
        loading: true
      }

      //todo: get dataContext from props.dataContext

      let dataSource = props.current.dataSource.find(d => d.action == "initEditForm")

      let body = {};
      if (dataSource) {
        dataSource.params.forEach(p => {
          body[p.key] = props.dataContext[p.value]
        })

        request("http://localhost:3005" + dataSource.url + "?" + qs.stringify(body),
          {
            method: dataSource.method,
          }
          , (data) => {
            if (data.success) {
              let c = data.data[0]
              this.setState({
                loading: false,
                initialValues: c
              })
            }
          })
      }
    }

    else {
      this.state = {
        loading: false,
      }
    }
  }

  render() {

    if (this.state.loading) return <div>laoding</div>
    return <TestForm initialValues={this.state.initialValues}  {...this.props} dataContext={this.props.behavior}/>
  }
}

function

mapStateToProps(state, props) {

  return {
    form: props.id,
    //currentForm: state.form[props.id]
  }
}

export
default

connect(mapStateToProps)

(
  FormContainer
)
;
