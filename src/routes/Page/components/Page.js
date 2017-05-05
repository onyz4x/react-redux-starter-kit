import React, {Component} from 'react'
import {Row, Col, Button, Modal} from 'antd'
import AppTable from 'components/AppTable'
import AppButton from 'components/AppButton'
import TextField from 'components/Form/TextField'
import request from 'utils/request'
import {reduxForm, Field} from 'redux-form';
import FormContainer from './FormContainer'
import ModalContainer from './ModalContainer'
import TestForm from './TestForm'

export class Page extends Component {


  constructor(props) {
    super();
    if (props.metadata == undefined) {
      this.state = {
        metadata: {}
      }
    }
    else {
      let metadata = JSON.parse(JSON.stringify(props.metadata));
      let page = metadata.pages.find(p => p.id == props.id);
      page.default = true;
      metadata.pages = [page];

      console.log(metadata);
      this.state = {
        metadata: metadata

      }
    }
  }

  updateMetadata(data) {

    this.setState({
      metadata: data
    })
  }

  componentDidMount() {
    if (this.props.metadata == undefined) {
      request(`http://localhost:3005/metadata/${this.props.params.id}`,
        {}, this.updateMetadata.bind(this)
      )
    }
  }


  renderModalPage() {
    let modals = this.state.metadata.pages.filter(p => p.display == "modal" && !!p.default == false);
    let results = []
    modals.forEach(m => {
      results.push(<ModalContainer current={m} metadata={this.state.metadata}></ModalContainer>)
    })
    return results;
  }

  render() {
    if (!this.state.metadata.pages) return <div>loading</div>;
    let defaultPage = this.state.metadata.pages.find(p => p.default);

    if (this.props.metadata == undefined && defaultPage.type == "form") {
      return <FormContainer id={defaultPage.id} current={defaultPage} metadata={this.state.metadata}/>
    }
    return (
      <div>
        {defaultPage.layout.rows.map((r, i) => <Row type={r.type} justify={r.justify} key={i}>
          {r.cols.map((cs, j) => <Col style={cs.style} span={cs.span} key={j}>
            {
              cs.components.map(c => {
                return (() => {
                  switch (c.type) {
                    case "table":
                      return <div><AppTable
                        dataSource={defaultPage.dataSource}
                        metadata={c}></AppTable></div>;
                    case "button":
                      return <AppButton setState={(state) => this.setState(state)} onClick={(m) => {
                      } }
                                        metadata={c}></AppButton>;
                    case "textField":
                      return <Field name={c.name} label={c.label} component={TextField}/>;
                    default:
                      return <span></span>;
                  }
                })()
              })

            }

          </Col>)}
        </Row>)}

        {this.renderModalPage()}

      </div>
    )
  }
}

Page.propTypes = {}

export default Page
