import React, {Component} from 'react'
import {Row, Col, Button, Modal} from 'antd'
import AppTable from 'components/AppTable'
import AppButton from 'components/AppButton'
import TextField from 'components/Form/TextField'
import SelectField from 'components/Form/SelectField'
import request from 'utils/request'
import {reduxForm, Field} from 'redux-form';
import FormContainer from './FormContainer'
import ModalContainer from './ModalContainer'
import TestForm from './TestForm'
import update from 'react-addons-update';

export class Page extends Component {


  constructor(props) {
    super();
    if (props.metadata == undefined) {
      this.state = {
        metadata: {}
      }
    }
    else {
      let metadata = update(props.metadata, {})
      let page = metadata.pages.find(p => p.id == props.id);
      page.default = true;
      metadata.pages = [page];
      this.state = {
        metadata: metadata
      }
    }
  }

  updateMetadata(data) {

    if (data.success)
      this.setState({
        metadata: data.data
      })
  }

  componentDidMount() {
    if (this.props.metadata == undefined) {
      request(`http://localhost:3005/metadata/${this.props.params.id}`,
        {}, this.updateMetadata.bind(this)
      )
    }
  }


  renderModalPage(id) {
    let modals = this.state.metadata.pages.filter(p => p.display == "modal" && !!p.default == false);
    let results = []
    modals.forEach(m => {
      results.push(<ModalContainer parentId={id} key={m.id} current={m}
                                   metadata={this.state.metadata}></ModalContainer>)
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
          {r.cols.map((cs, j) => <Col style={cs.style} span={cs.span} key={`${i}.${j}`}>
            {
              cs.components.map((c, k) => {
                return (() => {
                  switch (c.type) {
                    case "table":
                      return <AppTable key={k} id={defaultPage.id}
                                       dataContext={this.props.dataContext}
                                       metadata={defaultPage}
                                       current={c}></AppTable>;
                    case "button":
                      return <AppButton key={k} dataContext={this.props.dataContext} id={defaultPage.id}
                                        setState={(state) => this.setState(state)} onClick={(m) => {
                      } } metadata={defaultPage}
                                        current={c}></AppButton>;
                    case "textField":
                      return <Field key={k} dataContext={this.props.dataContext} metadata={defaultPage}
                                    id={defaultPage.id} name={c.name}
                                    current={c} label={c.label} component={TextField}/>;
                    case "selectField":
                      return <Field key={k} dataContext={this.props.dataContext} metadata={defaultPage}
                                    id={defaultPage.id} name={c.name} initialValues={this.props.initialValues}
                                    current={c} label={c.label} component={SelectField}/>;
                    default:
                      return <span key={k}></span>;
                  }
                })()
              })

            }

          </Col>)}
        </Row>)}

        {this.renderModalPage(defaultPage.id)}

      </div>
    )
  }
}

Page.propTypes = {}

export default Page
