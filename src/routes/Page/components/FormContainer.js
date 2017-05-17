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

    let locationState = undefined;

    if (props.location) {

      locationState = props.location.state;
    }


    if (props.dataContext && props.dataContext.mode == "edit" || locationState && locationState.mode == "edit") {
      this.state = {
        loading: true,
        dataContext: Object.assign({}, props.dataContext, locationState)
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
          loading: false,
          dataContext: Object.assign({}, props.dataContext, locationState)
        }
      else {

        let hiddenFields = {};
        props.current.hiddenFields && props.current.hiddenFields.forEach(f => hiddenFields[f] = props.dataContext[f])
        this.state = {
          loading: false,
          initialValues: hiddenFields,
          dataContext: Object.assign({}, props.dataContext, locationState)
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
  let asyncBlurFields = [];
  if (props.current.asyncRules)
    props.current.asyncRules.forEach(a => asyncBlurFields.push(a.name))

  return {
    form: props.id,
    asyncBlurFields
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
