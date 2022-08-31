import React, { Component } from 'react'
import PubSub from 'pubsub-js'
import OutputItem from './OutputItem/'

export default class MoneyOutput extends Component {
    state = { resultMoney: { 100: 0, 50: 0, 20: 0, 10: 0, 5: 0, 2: 0, 1: 0, 0.25: 0, 0.1: 0, 0.05: 0 }, isSucced: true }
    componentDidMount() {
        this.token = PubSub.subscribe('Data', (_, data) => {
            try {
                //console.log("floar是",parseInt(data.float))
                this.setState({ resultMoney: this.calculate(data.money, parseInt(data.float)), isSucced: true })
            } catch {
                this.setState({ isSucced: false })
            }
        }
        )
    };

    componentWillUnmount() {
        PubSub.unsubscribe(this.token);
    }

    calculate = (money, float) => {
        const validUnits = Object.keys(money).filter(unit => {
            return money[unit] !== 0
        }).map(str => parseFloat(str)).sort((a, b) => b - a)

        let totalMoney = (validUnits.map((unit) => { return money[unit.toString()] * unit })).reduce((a, b) => { return a + b }, 0)
        //console.log("总数", totalMoney,float)
        let targetMoney = totalMoney - float
        //console.log("目标值", targetMoney)
        let { resultMoney } = this.state

        validUnits.map((unit) => {
            if (Math.abs(targetMoney) < 1e-6) return 0
            //console.log("当前值", targetMoney, "单位", unit)
            if ((money[unit.toString()] - Math.floor(targetMoney.toFixed(2) / unit) >= 1e-6)) {
                resultMoney[unit.toString()] = Math.floor(targetMoney.toFixed(2) / unit)
            } else {
                resultMoney[unit.toString()] = parseFloat(money[unit.toString()])
            }
            //console.log("我认为拿", resultMoney[unit.toString()], "个")
            targetMoney -= resultMoney[unit.toString()] * unit
            return 0;
        })

        if (Math.abs(targetMoney) < 1e-6) {
            return resultMoney
        }
        else {
            throw new Error("Can't Count the Money!!!")
        }

    }

    render() {
        const { resultMoney }= this.state
        const validUnits = Object.keys(resultMoney).filter(unit => {
            return resultMoney[unit] !== 0
        }).map(str => parseFloat(str)).sort((a, b) => b - a)

        const totalMoney = (validUnits.map((unit) => { return resultMoney[unit.toString()] * unit })).reduce((a, b) => { return a + b }, 0)

        if (this.state.isSucced) {
            return (
                <div>
                    <h2>The Money Need to be Deposite</h2>
                    <h3>Total: ${totalMoney.toFixed(2)}</h3>
                    {Object.keys(this.state.resultMoney).map(str => parseFloat(str)).sort((a, b) => b - a).map((unit) => {
                        return <OutputItem key={unit} value={this.state.resultMoney[unit.toString()]}>${unit}</OutputItem>
                    })}
                </div>

            )
        } else {
            return (<div>Can't Count the Money!!!</div>)

        }

    }

}
