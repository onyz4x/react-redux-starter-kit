import React, {Component} from 'react'
import {Row, Col, Button} from 'antd'
import AppTable from 'components/AppTable'
import AppButton from 'components/AppButton'
import request from 'utils/request'


export class Page extends Component {


  constructor(props) {
    super();
    this.state = {
      metadata: {}
    }
  }

  updateMetadata(data) {

    this.setState({
      metadata: data
    })
  }

  componentDidMount() {

    request(`http://localhost:3005/metadata/${this.props.params.id}`,
      {}, this.updateMetadata.bind(this)
    )
  }

  render() {
    if (!this.state.metadata.pages) return <div>loading</div>;
    let currentPage = this.state.metadata.pages[0];
    console.log("dddj")
    return (
      <div >
        {currentPage.layout.rows.map((r, i) => <Row type={r.type} justify={r.justify} key={i}>
          {r.cols.map((cs, j) => <Col style={cs.style} span={cs.span} key={j}>
            {
              cs.components.map(c => {
                return (() => {
                  switch (c.type) {
                    case "table":
                      return <div><AppTable
                        dataSource={currentPage.dataSource}
                        metadata={c}></AppTable></div>;
                    case "button":
                      return <AppButton metadata={c}></AppButton>;
                    default:
                      return <span>ww1</span>;
                  }
                })()
              })

            }

          </Col>)}
        </Row>)}
      </div>
    )
  }
}

Page.propTypes = {}

export default Page
