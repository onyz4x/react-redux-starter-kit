import React, {Component} from 'react'
import {Table, Button, Card,Menu,Dropdown,Icon,Breadcrumb} from 'antd'
import classes from './Test1.scss'


export class Test1 extends Component {
  componentDidMount() {

  }


  render() {
    const dataSource = [{
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

    const columns = [{
      title: '损益科目编码',
      dataIndex: 'age',
      key: 'age',
      fixed: 'left'
    }, {
      title: '损益科目名称',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '损益科目名称',
      dataIndex: 'name',
      key: 'name1',
    }, {
      title: '损益科目名称',
      dataIndex: 'name',
      key: 'name2',
    }, {
      title: '损益科目名称',
      dataIndex: 'name',
      key: 'name3',
    },{
      title: '损益科目名称',
      dataIndex: 'name',
      key: 'name4',
    },{
      title: '损益科目名称',
      dataIndex: 'name',
      key: 'name5',
    },{
      title: '损益科目名称',
      dataIndex: 'address',
      key: 'address',
    }, {
      title: '操作',
      fixed: 'right'
      ,width: 100
    }];
    const menu = (
      <Menu>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">导出</a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">导入</a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">信息</a>
        </Menu.Item>
      </Menu>
    );

    return (
    <div>
      <Breadcrumb style={{ margin: '12px 0' }}>
        <Breadcrumb.Item>财务管理</Breadcrumb.Item>
        <Breadcrumb.Item>业务处理</Breadcrumb.Item>
        <Breadcrumb.Item>损益结转</Breadcrumb.Item>
      </Breadcrumb>
      <div className={classes.mainContent}>

        <Card>
          <div className={classes.tableOperations}>
            <Button type="primary">新增</Button>
            <Button type="primary">保存</Button>
            <Button>删除</Button>
            <Button>复制</Button>
            <Button>打印</Button>
            <Dropdown overlay={menu}>
              <Dropdown overlay={menu}>
                <Button>
                  其他操作 <Icon type="down" />
                </Button>
              </Dropdown>
            </Dropdown>
          </div>
        </Card>
        <br/>
        <Card>
          <Table rowSelection={{type:'checkbox'}}  scroll={{ x: 1000}} dataSource={dataSource} size="middle" columns={columns}/>
        </Card>
      </div>
    </div>


    )
  }
}

Test1.propTypes = {}

export default Test1
