/**
 * Created by lx on 2017/5/4.
 */
import React, {Component} from 'react'


import {reduxForm, Field} from 'redux-form';
import Page from './Page'

export class TestForm extends Component {

  constructor(props) {
    super();


  }

  render() {
    return (
      <div>
        <Page {...this.props}/>
      </div>
    )
  }
}

TestForm.propTypes = {}

export default reduxForm({})(TestForm)


