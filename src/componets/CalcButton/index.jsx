import React, { Component } from 'react'
import PubSub from 'pubsub-js'
import { Button, Input, Col, Row } from 'antd';

export default class CalcButton extends Component {
    state = {floatMoney:150}
    render() {
        return (
            <Row align="bottom">
                <Col>输入Float<Input type="number" defaultValue={150} onInput={(e)=>{this.setState({floatMoney:e.target.value})}}></Input></Col>
                <Col ><Button onClick={() => { PubSub.publish('Calc',this.state.floatMoney); }}>按我计算</Button></Col>
            </Row>
        )
    }
}
