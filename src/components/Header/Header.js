import React from 'react'
import { IndexLink, Link } from 'react-router'
import classes from './Header.scss'
import {Menu} from 'antd';
export const Header = () => (
  <div>
    <Menu  mode="horizontal"
      style={{ lineHeight: '64px' }}>
      <Menu.Item key="1">     <IndexLink to='/' activeClassName={classes.activeRoute}>
        Home
      </IndexLink></Menu.Item>
      <Menu.Item key="2"> <Link to='/counter' activeClassName={classes.activeRoute}>
        Counter
      </Link></Menu.Item>
      <Menu.Item key="3"> <Link to='/GridDemo' activeClassName={classes.activeRoute}>
        GridDemo
      </Link></Menu.Item>
       <Menu.Item key="4"> <Link to='/FormDemo' activeClassName={classes.activeRoute}>
        FormDemo
      </Link></Menu.Item>
    </Menu>
  </div>
)

export default Header
