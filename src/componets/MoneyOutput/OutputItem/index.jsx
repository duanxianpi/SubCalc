import React, { Component } from 'react'
import { Row, Input } from 'antd'

export default class OutputItem extends Component {

  render() {
    const { value } = this.props
    const unitDescribe = this.props.children
    return (
      <Row> {unitDescribe} <Input type="number" defaultValue={0} readOnly value={value} /></Row>
    )
  }
}
