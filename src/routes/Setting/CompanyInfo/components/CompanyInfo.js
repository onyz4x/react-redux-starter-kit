import React, {Component} from 'react'
import {Table, Button, Card, Dropdown, Menu,Icon, Breadcrumb} from 'antd'
import classes from './CompanyInfo.scss'

export class CompanyInfo extends Component {

  constructor(props) {
    super();

    // this.menu = (
    //   <Menu>
    //     <Menu.Item>
    //       <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">修改</a>
    //     </Menu.Item>
    //     <Menu.Item>
    //       <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">启用</a>
    //     </Menu.Item>
    //     <Menu.Item>
    //       <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">禁用</a>
    //     </Menu.Item>
    //   </Menu>
    // );

    this.columns = [{
      title: '公司编码',
      dataIndex: 'age',
      key: 'age',
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
  }

  componentDidMount() {
  }

  render() {
    return (
      <div >

          <div className={classes.tableOperations}>
            <Button type="primary">修改</Button>
            <Button>启用</Button>
            <Button>禁用</Button>
            <Button>刷新</Button>
          </div>

        <br/>
        <Card>
          <Table rowSelection={{type: 'radio'}} scroll={{ x: 800}} dataSource={this.dataSource} size="middle" columns={this.columns}/>
        </Card>
      </div>
    )
  }
}

CompanyInfo.propTypes = {}

export default CompanyInfo
