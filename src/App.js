import React, { Component } from 'react'
import CalcButton from './componets/CalcButton'
import MoneyInput from './componets/MoneyInput'
import MoneyOutput from './componets/MoneyOutput'
import { Col, Row } from 'antd';



export default class App extends Component {
  render() {
    return (
      <div>
        <Row type="flex" justify="center" align="middle">
        <Col style={{margin: "2em"}}><MoneyInput /></Col>
        <Col style={{margin: "2em"}}><CalcButton /></Col>
        <Col style={{margin: "2em"}}><MoneyOutput /></Col>
        </Row>

      </div>
    )
  }
}
