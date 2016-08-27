import React from 'react'
import { DatePicker ,Menu,Breadcrumb} from 'antd';
import { IndexLink, Link } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
export const GridDemo = (props) => (
  <div> 

     <AppBar
    title="Title"
    iconClassNameRight="muidocs-icon-navigation-expand-more"
  />
  </div>
)

GridDemo.propTypes = {
}

export default GridDemo
