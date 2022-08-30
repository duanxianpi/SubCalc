import React, { Component } from 'react'
import { Row, Input } from 'antd'

export default class OutputItem extends Component {

  render() {
    const { value } = this.props
    const unitDescribe = this.props.children
    return (
      <Row style={{ height: "54px" }} > {unitDescribe} <Input type="number" readOnly value={value} /></Row>
    )
  }
}
