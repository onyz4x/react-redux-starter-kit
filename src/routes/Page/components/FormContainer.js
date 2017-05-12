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

    if (props.dataContext.mode == "edit") {
      this.state = {
        loading: true,
        dataContext: props.dataContext
      }
      let dataSource = props.current.dataSource.find(d => d.action == "initEditForm")

      let body = {};
      if (dataSource) {
        dataSource.params.forEach(p => {
          body[p.key] = this.state.dataContext[p.value]
        })

        request("http://localhost:3005" + dataSource.url + "?" + qs.stringify(body),
          {
            method: dataSource.method,
          }
          , (data) => {
            if (data.success) {
              let c = data.data[0]
              if (dataSource.resultsMapping != undefined) {
                dataSource.resultsMapping.forEach(r => c[r.key] = c[r.value])
              }

              this.setState({
                loading: false,
                initialValues: c
              })
            }
          })
      }
    }

    else {
      if (props.dataContext == undefined)
        this.state = {
          loading: false
        }
      else {

        let hiddenFields = {};
        props.current.hiddenFields && props.current.hiddenFields.forEach(f => hiddenFields[f] = props.dataContext[f])
        this.state = {
          loading: false,
          initialValues: hiddenFields,
          dataContext: props.dataContext
        }
      }
    }
  }

  render() {

    if (this.state.loading) return <div>laoding</div>
    return <TestForm initialValues={this.state.initialValues}  {...this.props}/>
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
