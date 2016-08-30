import React from 'react'

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
export const Griddemo1 = (props) => (
  <div>
    {/* <AppBar title="Title" iconClassNameRight="muidocs-icon-navigation-expand-more"/> */}
    <BootstrapTable data={products} striped={true} hover={true}>
      <TableHeaderColumn dataField="id" isKey={true} dataAlign="center" dataSort={true}>Product ID</TableHeaderColumn>
      <TableHeaderColumn dataField="name" dataSort={true}>Product Name</TableHeaderColumn>
      <TableHeaderColumn dataField="price" dataFormat={priceFormatter}>Product Price</TableHeaderColumn>
    </BootstrapTable>
  </div>
)

Griddemo1.propTypes = {
}

export default Griddemo1
