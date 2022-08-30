import React, { Component } from 'react'
import { Input, Row } from 'antd'

export default class InputItem extends Component {

    render() {
        const { itemValue } = this.props
        const unitDescribe = this.props.children
        return (
            <Row> {unitDescribe} <Input type="number" defaultValue={0} onFocus={(e) => { e.target.select() }} onChange={(e) => {
                this.props.updateMoneyInput({ [itemValue]: e.target.value })
            }} /></Row>
        )
    }
}
