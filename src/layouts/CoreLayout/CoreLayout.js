import React from 'react'
import {IndexLink, Link} from 'react-router'
import {Layout, Menu, Breadcrumb, Icon, Card} from 'antd';
const {SubMenu} = Menu;
const {Header, Content, Sider} = Layout;
import test from './test.png'


import classes from './CoreLayout.scss'
// import 'antd/dist/antd.css'
// import '../../styles/core.scss'

export const CoreLayout = ({children}) => (
  <Layout style={{minHeight: 650}}>
    <Header style={{ backgroundImage: `url(${test})`, backgroundSize:"cover",borderBottom: "1px lightgray solid",boxShadow:"10px 10px 5px #888888"}}>
    </Header>
    <Layout>
      <Sider width={200} style={{background: '#fff'}}>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={['11']}
          defaultOpenKeys={['sub11']}
          style={{height: '100%'}}
        >

          <SubMenu key="sub11" title={<span>系统设置</span>}>
            <Menu.Item key="11">
              <Link to='/page/dictionary'>
                字典管理
              </Link></Menu.Item>
            <Menu.Item key="21">xxxx</Menu.Item>
            <Menu.Item key="31">
              <Link to='/test1'>
                xxxxx
              </Link>
            </Menu.Item>
            <Menu.Item key="41"> <Link to='/test2'>
              xxxxx
            </Link></Menu.Item>
          </SubMenu>


          <SubMenu key="sub2" title={<span><Icon type="laptop"/>YY管理</span>}>
            <Menu.Item key="5">option5</Menu.Item>
            <Menu.Item key="6">option6</Menu.Item>
            <Menu.Item key="7">option7</Menu.Item>
            <Menu.Item key="8">option8</Menu.Item>
          </SubMenu>

        </Menu>
      </Sider>
      <Layout style={{padding: '24px 24px 24px 24px', background: 'white'}}>

        <Content>

          {children}

        </Content>
      </Layout>
    </Layout>
  </Layout>
)

CoreLayout.propTypes = {
  children: React.PropTypes.element.isRequired
}

export default CoreLayout
