import React from 'react'
import {DatePicker, Menu, Breadcrumb} from 'antd';
import {IndexLink, Link} from 'react-router'
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

let products = [
  {
    id: 1,
    name: "Item name 1",
    price: 100
  }, {
    id: 2,
    name: "Item name 2",
    price: 100
  }
];
// It's a data format example.
const priceFormatter = (cell, row) => {
  return '<i class="glyphicon glyphicon-usd"></i> ' + cell;
}

const GridDemo = (props) => (
  <div>
    <AppBar title="Title" iconClassNameRight="muidocs-icon-navigation-expand-more"/>
    {/* <button type="button" className="btn btn-primary">（首选项）Primary</button> */}
    <BootstrapTable data={products} striped={true} hover={true}>
      <TableHeaderColumn dataField="id" isKey={true} dataAlign="center" dataSort={true}>Product ID</TableHeaderColumn>
      <TableHeaderColumn dataField="name" dataSort={true}>Product Name</TableHeaderColumn>
      <TableHeaderColumn dataField="price" dataFormat={priceFormatter}>Product Price</TableHeaderColumn>
    </BootstrapTable>,
  </div>
)

GridDemo.propTypes = {}
export default GridDemo
