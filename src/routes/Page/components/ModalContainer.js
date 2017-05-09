/**
 * Created by lx on 2017/5/4.
 */
import TestForm from './TestForm';
import {connect} from 'react-redux'
import React, {Component} from 'react'
import {Row, Col, Button, Modal} from 'antd'
import FormContainer from './FormContainer'
import Page from './Page'
import PubSub from 'pubsub-js'

class ModalContainer extends Component {

  constructor(props) {
    super();

    this.state = {
      isOpen: false
    }

    PubSub.subscribe(`${props.current.id}.closeModal`, () => {
      this.closeModal()
    })

    PubSub.subscribe(`${props.current.id}.openModal`, (msg, data) => {
      this.setState({
        isOpen: true,
        behavior: data.behavior,
        dataContext: data.dataContext
      })
    })

  }

  closeModal() {
    this.setState({
      isOpen: false
    })
  }

  renderModalContent(m) {
    if (m.type == "form") {
      return <FormContainer dataContext={this.state.dataContext} behavior={this.state.behavior}
                            id={m.id}  pageId={m.id} {...this.props}/>
    }
    else {
      return <Page id={m.id} pageId={m.id} {...this.props}/>
    }
  }

  componentWillUnmount() {
    PubSub.unsubscribe(this.props.current.id);
  }


  render() {
    const {current} = this.props;

    if (!this.state.isOpen) return <element></element>;
    return <Modal onCancel={() => this.closeModal()} width={current.width} title={current.title}
                  visible={this.state.isOpen} footer="">
      {this.renderModalContent(current)}
    </Modal>
  }
}

export default ModalContainer;
