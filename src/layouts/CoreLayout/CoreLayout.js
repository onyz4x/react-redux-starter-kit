import React from 'react'
import {IndexLink, Link} from 'react-router'
import {Layout, Menu, Breadcrumb, Icon} from 'antd';
const {SubMenu} = Menu;
const {Header, Content, Sider} = Layout;
import logo5 from './logo5.png'


import classes from './CoreLayout.scss'
// import 'antd/dist/antd.css'
// import '../../styles/core.scss'

export const CoreLayout = ({children}) => (
  <Layout style={{minHeight: 650}}>
    <Header className="header">
      <div className="logo">
        <img src={logo5}></img>
      </div>

    </Header>
    <Layout>
      <Sider width={200} style={{background: '#fff'}}>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{height: '100%'}}
        >
          <SubMenu key="sub1" title={<span><Icon type="user"/>财务管理</span>}>
            <SubMenu key="sub11" title={<span>业务处理</span>}>
              <Menu.Item key="11">
                <Link to='/'>
                  填制凭证
                </Link></Menu.Item>
              <Menu.Item key="21">生成凭证</Menu.Item>
              <Menu.Item key="31">
                <Link to='/test1'>
                  损益结转
                </Link>
              </Menu.Item>
              <Menu.Item key="41">  <Link to='/test2'>
                科目余额表
              </Link></Menu.Item>
            </SubMenu>
            <SubMenu key="sub12" title={<span>账表查询</span>}>
              <Menu.Item key="12">

                </Menu.Item>
              <Menu.Item key="22">option2</Menu.Item>
              <Menu.Item key="32">option3</Menu.Item>
              <Menu.Item key="42">option4</Menu.Item>
            </SubMenu>
            <SubMenu key="sub13" title={<span>报表查询</span>}>
              <Menu.Item key="13">资产负载表</Menu.Item>
              <Menu.Item key="23">option2</Menu.Item>
              <Menu.Item key="33">option3</Menu.Item>
              <Menu.Item key="43">option4</Menu.Item>
            </SubMenu>


          </SubMenu>
          <SubMenu key="sub2" title={<span><Icon type="laptop"/>采购管理</span>}>
            <Menu.Item key="5">option5</Menu.Item>
            <Menu.Item key="6">option6</Menu.Item>
            <Menu.Item key="7">option7</Menu.Item>
            <Menu.Item key="8">option8</Menu.Item>
          </SubMenu>
          <SubMenu key="sub3" title={<span><Icon type="notification"/>销售管理</span>}>
            <Menu.Item key="9">option9</Menu.Item>
            <Menu.Item key="10">option10</Menu.Item>
            <Menu.Item key="11">option11</Menu.Item>
            <Menu.Item key="12">option12</Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout style={{padding: '0 16px 16px'}}>

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
