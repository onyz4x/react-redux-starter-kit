import React, {Component} from 'react'

import classes from './Test2.scss'
import Test2Child from './Test2Child'
import {Spin} from 'antd'

export class Test2 extends Component {


  componentDidMount() {


    this.props.fetchTest2();



    //   this.props
  }



  render() {


    const {isFetching} = this.props.test2Data.toJS();



    if (isFetching) {

      return <div><Spin></Spin></div>
    }


    let a = <input/>;
    return (
      <div className={classes.content}>
        <input/>


        {a}
        <Test2Child onOk={(aa) => {
        }}></Test2Child>
      </div>
    )
  }
}

Test2.propTypes = {}

export default Test2
