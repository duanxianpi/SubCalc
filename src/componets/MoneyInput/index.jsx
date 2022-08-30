import React, { Component } from 'react'
import InputItem from './InputItem'
import PubSub from 'pubsub-js'

export default class MoneyInput extends Component {

    componentDidMount() {
        this.token = PubSub.subscribe('Calc', (_,float) => { PubSub.publish('Data', {money:this.state.Money,float});});
    }

    componentWillUnmount() {
        PubSub.unsubscribe(this.token);
    }

    state = { Money: { 100: 0, 50: 0, 20: 0, 10: 0, 5: 0, 2: 0, 1: 0, 0.25: 0, 0.1: 0, 0.05: 0 } }

    updateMoneyInput = (newItem) => {
        const { Money } = this.state
        const newMoneyObj = { ...Money, ...newItem }
        this.setState({ Money: newMoneyObj })
    }

    render() {
        return (
            [
                <InputItem key={1} updateMoneyInput={this.updateMoneyInput} itemValue={100} >$100</InputItem>,
                <InputItem key={2} updateMoneyInput={this.updateMoneyInput} itemValue={50} >$50</InputItem>,
                <InputItem key={3} updateMoneyInput={this.updateMoneyInput} itemValue={20} >$20</InputItem>,
                <InputItem key={4} updateMoneyInput={this.updateMoneyInput} itemValue={10} >$10</InputItem>,
                <InputItem key={5} updateMoneyInput={this.updateMoneyInput} itemValue={5} >$5</InputItem>,
                <InputItem key={6} updateMoneyInput={this.updateMoneyInput} itemValue={2} >$2</InputItem>,
                <InputItem key={7} updateMoneyInput={this.updateMoneyInput} itemValue={1} >$1</InputItem>,
                <InputItem key={8} updateMoneyInput={this.updateMoneyInput} itemValue={0.25} >$0.25 (Quarter)</InputItem>,
                <InputItem key={9} updateMoneyInput={this.updateMoneyInput} itemValue={0.1} >$0.1 (Dime)</InputItem>,
                <InputItem key={10} updateMoneyInput={this.updateMoneyInput} itemValue={0.05} >$0.05 (Nickel)</InputItem>
            ]
        )
    }
}
