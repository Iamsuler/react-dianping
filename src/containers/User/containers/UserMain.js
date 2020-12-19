import React, { Component } from 'react'
import OrderItem from '../components/OrderItem'
import Confirm from '../../../components/Confirm'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  actions as userActions,
  isDeletingOrder,
  getOrderType,
  getOrders,
  getComment,
  getStars,
  getCommentingOrderId
} from '../../../redux/modules/user'

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
  onCancleRemoveOrder = () => {
    this.props.userActions.hideDeleteDialog()
  }
  onConfirmRemoveOrder = () => {
    this.props.userActions.fetchDeleteOrder()
  }
  handleClickTab = (type) => {
    this.props.userActions.setOrderType(type)
    this.props.userActions.fetchOrders(type)
  }
  handleRemoveOrder = id => {
    this.props.userActions.showDeleteDialog(id)
  }
  componentDidMount () {
    const { orderType } = this.props
    this.props.userActions.fetchOrders(orderType)
  }
  handleComment = id => {
    this.props.userActions.showCommentArea(id)
  }
  handleSubmitComment = () => {
    this.props.userActions.postComment()
  }
  handleCancleComment = () => {
    this.props.userActions.hideCommentArea()
  }
  handleCommentChange = comment => {
    this.props.userActions.setCommentContent(comment)
  }
  handleStarsChange = stars => {
    this.props.userActions.setStars(stars)
  }
  renderOrderList = (data) => {
    const { commentingOrderId, comment, stars } = this.props
    return data.map(item => {
      const { id } = item
      const isCommenting = id === commentingOrderId
      return (
        <OrderItem
          key={ id }
          data={item}
          isCommenting={ isCommenting }
          comment={ isCommenting ? comment : '' }
          stars={ isCommenting ? stars : 0 }
          onRemove={ this.handleRemoveOrder.bind(this, id) }
          onComment={ this.handleComment.bind(this, id) }
          onCommentChange={ this.handleCommentChange }
          onSubmitComment={ this.handleSubmitComment }
          onCancelComment={ this.handleCancleComment }
          onStarsChange={ this.handleStarsChange }
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
  render() {
    const { orders, orderType, isDeletingOrder } = this.props
    return (
      <div className="userMain">
        <div className="userMain__menu">
          {
            orderTypeMap.map((item, index) => {
              return (
                <div
                  key={index}
                  className="userMain__tab"
                  onClick={() => this.handleClickTab(item.type)}
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
          {
            orders && orders.length > 0
              ? this.renderOrderList(orders)
              : this.renderEmpty()
          }
        </div>
        {
          isDeletingOrder ? this.renderConfirm() : null
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isDeletingOrder: isDeletingOrder(state),
  orders: getOrders(state),
  orderType: getOrderType(state),
  commentingOrderId: getCommentingOrderId(state),
  stars: getStars(state),
  comment: getComment(state)
})
const mapDispatchToProps = dispatch => ({
  userActions: bindActionCreators(userActions, dispatch)
})
const UserMainContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserMain)

export default UserMainContainer