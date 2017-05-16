import React, {Component} from 'react'
import {Table, Button, Card, Dropdown, Menu, Icon, Breadcrumb} from 'antd'
import classes from './CompanyInfo.scss'

export class CompanyInfo extends Component {

  constructor(props) {
    super();

    this.menu = (
      <Menu>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">修改</a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">启用</a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">禁用</a>
        </Menu.Item>
      </Menu>
    );

    this.dataSource = [{
      key: '1',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号',
    }, {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号'
    }];

    this.columns2 = [{
      title: '序号',
      fixed: 'left', width: 60,
      render: (a, c, i) => <Dropdown overlay={this.menu}>
        <a className="ant-dropdown-link" href="#">
          {i}<Icon type="down"/>
        </a>
      </Dropdown>
    },
      {
        title: '公司编码',
        dataIndex: 'age',
        key: 'age',
        width: 100,
        fixed: 'left'
      }, {
        title: '公司名称',
        dataIndex: 'name',
        key: 'name',
      }, {
        title: '管理员工号',
        dataIndex: 'name',
        key: 'name1',
      }, {
        title: '是否禁用',
        dataIndex: 'name',
        key: 'name2',
      }, {
        title: '备注',
        dataIndex: 'name',
        key: 'name3',
      }, {
        title: '新增人',
        dataIndex: 'name',
        key: 'name4',
      }, {
        title: '新增时间',
        dataIndex: 'name',
        key: 'name5',
      }, {
        title: '修改人',
        dataIndex: 'address',
        key: 'address',
      }];
    this.columns3 = [
      {
        title: '公司编码',
        dataIndex: 'age',
        key: 'age',
        width: 100,
        fixed: 'left'
      }, {
        title: '公司名称',
        dataIndex: 'name',
        key: 'name',
      }, {
        title: '管理员工号',
        dataIndex: 'name',
        key: 'name1',
      }, {
        title: '是否禁用',
        dataIndex: 'name',
        key: 'name2',
      }, {
        title: '备注',
        dataIndex: 'name',
        key: 'name3',
      }, {
        title: '新增人',
        dataIndex: 'name',
        key: 'name4',
      }, {
        title: '新增时间',
        dataIndex: 'name',
        key: 'name5',
      }, {
        title: '修改人',
        dataIndex: 'address',
        key: 'address',
      },
      {
        title: '',
        fixed: 'right', width: 60,
        render: () => <Dropdown overlay={this.menu}>
          <a className="ant-dropdown-link" href="#">
            操作<Icon type="down"/>
          </a>
        </Dropdown>
      }];
  }

  componentDidMount() {

    this.testDiv.innerHTML = template.render("<H2>sdcd</H2>")
  }

  render() {
    return (
      <div >

        <div className={classes.tableOperations}>
          <Button type="primary">新增</Button>
          <Button>启用</Button>
          <Button>禁用</Button>
          <Button onClick={() => this.props.fetchCompanyInfo()}>刷新 </Button>
          <Button onClick={() => this.props.login()}>Login</Button>
        </div>
        <br/>
        <Card>
          <Table scroll={{x: 800}} dataSource={this.dataSource} size="middle" columns={this.columns2}/>
        </Card>
        <element ref={(node) => this.testDiv = node}></element>


      </div>
    )
  }
}

CompanyInfo.propTypes = {}

export default CompanyInfo
