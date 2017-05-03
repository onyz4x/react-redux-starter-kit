/**
 * Created by lx on 2017/5/3.
 */

import React, {Component} from 'react'
import request from 'utils/request'


import { Button} from 'antd'

export class AppButton extends Component {


  constructor(props) {
    super();
  }



  componentDidMount() {


  }


  render() {
    const {viewStyle,title}=this.props.metadata;

    return (
      <Button  style={{margin:5}} type={viewStyle}>
        {title}
      </Button>
    )
  }
}

AppButton.propTypes = {}

export default AppButton
