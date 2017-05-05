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

    PubSub.subscribe(`${props.current.id}.openModal`, () => {
      this.openModal()
    })

  }

  closeModal() {
    this.setState({
      isOpen: false
    })
  }

  openModal() {
    this.setState({
      isOpen: true
    })
  }

  renderModalContent(m) {
    if (m.type == "form") {
      return <FormContainer id={m.id} metadata={this.props.metadata}/>
    }
    else {
      return <Page id={m.id} metadata={this.props.metadata}/>
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
