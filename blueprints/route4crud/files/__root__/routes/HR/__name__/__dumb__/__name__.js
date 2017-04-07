import React, {Component} from 'react'
import {Card, Table, Button, Modal, Popconfirm,message,notification} from 'antd';
import InsertForm from './InsertForm'


export class  <%= pascalEntityName %> extends Component
{

  constructor(props) {
      super(props);

      this.columns = [{
  title: 'Code',
  dataIndex: 'code',
  key: 'code',
  width:'20%'
}, {
  title: '<%= pascalEntityName %> Name',
  dataIndex: '<%= realEntityName %>Name',
  key: '<%= realEntityName %>Name',

}, {
  title: 'Operation',
  render: (text, record)=>(
  <span>
  <a href="javascript:void(0)" type="primary" style={{width: 60, marginRight: 10}} onClick={()=>this.props.showEditForm(record.id)}>Edit</a>
  <Popconfirm placement="topLeft" title="Are you sure to delete the <%= realEntityName %>?"
  onConfirm={()=>this.props.delete<%= pascalEntityName %>(record.id)}
  okText="Yes" cancelText="No">
  <a href="javascript:void(0)" style={{width: 60}}>Delete</a>
  </Popconfirm>
  </span>
  ),
  width:100

    }];

}

  componentDidMount()
  {
  this.props.fetch<%= pascalEntityName %>();
  }

  componentWillUnmount() {
  this.props.destroy<%= pascalEntityName %>();
}


  render() {

  return (
  <Card title="<%= pascalEntityName %>" extra={<Button type="primary" size="default" style={{width: 60}} onClick={()=>this.props.showInsertForm()}>
  Insert</Button>} >

  <Table size="middle" columns={this.columns} pagination={false}
  dataSource={this.props.<%= realEntityName %>.get('list').toJS()}
  loading={this.props.<%= realEntityName %>.get('isFetching')}
  />
  {this.props.<%= realEntityName %>.get('show<%= pascalEntityName %>Form') &&
  <Modal title={this.props.<%= realEntityName %>.get('isEdit') ?"Edit a <%= pascalEntityName %>":"Insert a <%= pascalEntityName %>"} visible={true} maskClosable={false}
         onCancel={()=> this.props.closeInsertForm()} width="800px"
         footer=""
  >
    <div style={{height: 220, overflow: 'auto'}}>
      <InsertForm onSubmit={(values)=> this.props.save<%= pascalEntityName %>(values)} {...this.props}
                  ref="test" initialValues={this.props.<%= realEntityName %>.get('initValues')}></InsertForm>
    </div>
  </Modal>
  }
  </Card>
  )
}
}

<%= pascalEntityName %>.propTypes = {
}

export default <%= pascalEntityName %>
