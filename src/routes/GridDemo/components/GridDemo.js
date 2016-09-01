import React from 'react'

import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

import {IndexLink, Link} from 'react-router'
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import classes from '../../../styles/core.scss'

const menuStyle = {
  display: 'inline-block',
  margin: '16px 32px 16px 0',
  float: 'left'
};
const contentStyle = {
  width: '80%',
  float: 'right'
}

const GridDemo = (props) => (
  <div>
    <Paper style={menuStyle}>
      <Menu>
        <MenuItem>
          <Link to='/GridDemo' activeClassName={classes.activeRoute}>
            demo1
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to='/GridDemo/Griddemo2' activeClassName={classes.activeRoute}>
            demo2
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to='/GridDemo/Griddemo3' activeClassName={classes.activeRoute}>
            demo3
          </Link>
        </MenuItem>
      </Menu>
    </Paper>
    <div style={contentStyle}>
      {props.children}
    </div>
  </div>
)

GridDemo.propTypes = {}
export default GridDemo
