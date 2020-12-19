import React, { Component } from 'react'

import './PurchaseForm.css'

class PurchaseForm extends Component {
  handleChange = e => {
    this.props.onQuantityChange(e.target.value)
  }
  render() {
    const { quantity, price, onDecrease, onIncrease, onSubmit } = this.props
    return (
      <div className="purchaseForm">
        <div className="purchaseForm__wrapper">
          <div className="purchaseForm__row">
            <div className="purchaseForm__rowLabel">数量</div>
            <div className="purchaseForm__rowValue">
              <span
                className="purchaseForm__counter purchaseForm__counter--dec"
                onClick={onDecrease}
              >-</span>
              <input
                type="number"
                className="purchaseForm__quantity"
                onChange={this.handleChange}
                value={quantity ? quantity : 0}
              />
              <span
                className="purchaseForm__counter purchaseForm__counter--inc"
                onClick={onIncrease}
              >+</span>
            </div>
          </div>
          <div className="purchaseForm__row">
            <div className="purchaseForm__rowLabel">小计</div>
            <div className="purchaseForm__rowValue">
              <span className="purchaseForm__totalPrice">
                ¥{(price * quantity).toFixed(2)}
              </span>
            </div>
          </div>
          <div className="purchaseForm__row">
            <div className="purchaseForm__rowLabel">手机号码</div>
            <div className="purchaseForm__rowValue">182****2198</div>
          </div>
        </div>
        <ul className="purchaseForm__remark">
          <li className="purchaseForm__remarkItem">
            <i className="purchaseForm__sign" />
            <span className="purchaseForm__desc">支持随时退</span>
          </li>
          <li>
            <i className="purchaseForm__sign" />
            <span className="purchaseForm__desc">支持过期退</span>
          </li>
        </ul>
        <button className="purchaseForm__submit" onClick={ onSubmit }>
          提交订单
        </button>
      </div>
    )
  }
}

export default PurchaseForm