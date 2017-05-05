/**
 * Created by lx on 2017/5/4.
 */
import TestForm from './TestForm';
import { connect } from 'react-redux'
import React, {Component} from 'react'


class FormContainer extends Component {


  render() {
    return <TestForm {...this.props}/>
  }
}
function mapStateToProps(state, props) {

  return {
    form: props.id,
    currentForm:state.form

  }
}
export default connect(mapStateToProps)(FormContainer);
