import React, { Component } from 'react'
import OrderItem from './OrderItem'

import './UserMain.css'

const orderTypeMap = [
  {
    title: '全部订单',
    type: 0
  }, {
    title: '待付款',
    type: 2
  }, {
    title: '已消费',
    type: 1
  }, {
    title: '退款/售后',
    type: 3
  }
]
class UserMain extends Component {
  renderOrderList = (data) => {
    return data.map(item => {
      return (
        <OrderItem
          key={item.id}
          data={item}
        />
      )
    })
  }
  renderEmpty = () => {
    return (
      <div className="userMain__empty">
        <div className="userMain__emptyIcon" />
        <div className="userMain__emptyText1">您还没有相关订单</div>
        <div className="userMain__emptyText2">去逛逛看有哪些想买的</div>
      </div>
    )
  }
  handleClickTab = (type) => {
    this.props.setOrderType(type)
  }
  render() {
    const { data, setOrderType, orderType } = this.props
    return (
      <div className="userMain">
        <div className="userMain__menu">
          {
            orderTypeMap.map((item, index) => {
              return (
                <div
                  key={index}
                  className="userMain__tab"
                  onClick={() => setOrderType(item.type)}
                >
                  <span
                    className={
                      orderType === item.type
                        ? 'userMain__title userMain__title--active'
                        : 'userMain__title'
                    }
                  >{item.title}</span>
                </div>
              )
            })
          }
        </div>
        <div className="userMain__content">
          {data && data.length > 0
            ? this.renderOrderList(data)
            : this.renderEmpty()}
        </div>
      </div>
    );
  }
}

export default UserMain