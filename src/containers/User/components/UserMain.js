import React, { Component } from 'react'
import OrderItem from './OrderItem'
import Confirm from '../../../components/Confirm'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions as userActions, isDeletingOrder } from '../../../redux/modules/user'

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
          handleRemove={this.handleRemoveOrder}
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
  renderConfirm = () => {
    return (
      <Confirm
        content="请确认是否删除该商品"
        onCancel={ this.onCancleRemoveOrder }
        onConfirm={ this.onConfirmRemoveOrder }
      />
    )
  }
  onCancleRemoveOrder = () => {
    this.props.userActions.hideDeleteDialog()
  }
  onConfirmRemoveOrder = () => {
    this.props.userActions.fetchDeleteOrder()
  }
  handleClickTab = (type) => {
    this.props.setOrderType(type)
  }
  handleRemoveOrder = id => {
    this.props.userActions.showDeleteDialog(id)
  }
  render() {
    const { data, setOrderType, orderType, isDeletingOrder } = this.props
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
        {
          isDeletingOrder ? this.renderConfirm() : null
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isDeletingOrder: isDeletingOrder(state)
})
const mapDispatchToProps = dispatch => ({
  userActions: bindActionCreators(userActions, dispatch)
})
const UserMainContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserMain)

export default UserMainContainer