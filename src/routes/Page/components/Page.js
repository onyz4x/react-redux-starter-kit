import React, {Component} from 'react'
import {Row, Col, Button, Modal} from 'antd'
import AppTable from 'components/AppTable'
import AppButton from 'components/AppButton'
import AppSearch from 'components/AppSearch'
import TextField from 'components/Form/TextField'
import SelectField from 'components/Form/SelectField'
import DatePickerField from 'components/Form/DatePickerField'
import request from 'utils/request'
import {reduxForm, Field} from 'redux-form';
import FormContainer from './FormContainer'
import ModalContainer from './ModalContainer'
import TestForm from './TestForm'
import update from 'react-addons-update';

export class Page extends Component {


  constructor(props) {
    super();
    let locationState = undefined;

    if (props.location) {

      locationState = props.location.state;
    }

    if (props.metadata == undefined) {
      this.state = {
        metadata: {},
        dataContext: Object.assign({}, props.dataContext, locationState)
      }
    }
    else {
      let metadata = update(props.metadata, {})
      let page = metadata.pages.find(p => p.id == props.id);

      // page.default = true;
      metadata.pages = [page];
      this.state = {
        metadata: metadata,
        dataContext: Object.assign({}, props.dataContext, locationState)
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

  shouldComponentUpdate(nextPros, nextState) {

    return true;
  }

  componentWillMount() {
  }

  componentWillReceiveProps() {
  }

  renderModalPage(id) {
    let modals = this.state.metadata.pages.filter(p => p.display == "modal" && p.target == id);
    let results = []
    modals.forEach(m => {
      results.push(<ModalContainer location={this.props.location} parentId={id} key={m.id} current={m}
                                   metadata={this.state.metadata}></ModalContainer>)
    })
    return results;
  }

  render() {
    //console.log(this.props)
    if (!this.state.metadata.pages) return <div>loading</div>;


    let defaultPage = undefined

    let s = this.props.params && this.props.params.s;

    if (s == undefined) {
      defaultPage = this.state.metadata.pages[0];
    }
    else {
      defaultPage = this.state.metadata.pages.find(p => p.route == s);

    }


    if (!defaultPage) return <span>404</span>
    if (this.props.metadata == undefined && defaultPage.type == "form") {
      return <FormContainer location={this.props.location} id={defaultPage.id} pageId={defaultPage.id}
                            current={defaultPage}
                            metadata={this.state.metadata}/>
    }
    return (
      <div>
        {defaultPage.layout.rows.map((r, i) => <Row type={r.type} align={r.align} justify={r.justify} key={i}>
          {r.cols.map((cs, j) => <Col style={cs.style} span={cs.span} key={`${i}.${j}`}>
            {
              cs.components.map((c, k) => {
                return (() => {
                  switch (c.type) {
                    case "table":
                      return <AppTable key={k} id={c.id} pageId={defaultPage.id}
                                       dataContext={this.state.dataContext}
                                       metadata={defaultPage}
                                       current={c}></AppTable>;
                    case "button":
                      return <AppButton key={k} dataContext={this.state.dataContext} id={c.id} pageId={defaultPage.id}
                                        setState={(state) => this.setState(state)} onClick={(m) => {
                      } } metadata={defaultPage}
                                        current={c}></AppButton>;
                    case "search":
                      return <AppSearch key={k} dataContext={this.state.dataContext} id={c.id} pageId={defaultPage.id}
                                        setState={(state) => this.setState(state)} onClick={(m) => {
                      } } metadata={defaultPage}
                                        current={c}></AppSearch>;
                    case "textField":
                      return <Field key={k} dataContext={this.state.dataContext} metadata={defaultPage}
                                    id={c.id} pageId={defaultPage.id} name={c.name}
                                    current={c} label={c.label} component={TextField}/>;
                    case "selectField":
                      return <Field key={k} dataContext={this.state.dataContext} metadata={defaultPage}
                                    id={c.id} pageId={defaultPage.id} name={c.name}
                                    initialValues={this.props.initialValues}
                                    current={c} label={c.label} component={SelectField}/>;
                    case "datePickerField":
                      return <Field key={k} dataContext={this.state.dataContext} metadata={defaultPage}
                                    id={c.id} pageId={defaultPage.id} name={c.name}
                                    initialValues={this.props.initialValues}
                                    current={c} label={c.label} component={DatePickerField}/>;
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
