import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Header from '../../components/Header'
import PurchaseForm from './components/PurchaseForm'
import Tip from '../../components/Tips'
import { actions as purchaseActions, getQuantity, getShowTip } from '../../redux/modules/purchase'
import { getProduct, actions as detailActions } from '../../redux/modules/detail'

class Purchase extends Component {
  handleBack = () => {
    this.props.history.goBack()
  }
  onQuantityChange = (quantity) => {
    this.props.purchaseActions.setQuantity(quantity)
  }
  handleDecrease = () => {
    if (this.props.quantity <= 1) {
      return
    }
    this.props.purchaseActions.decreaseQuantity()
  }
  handleIncrease = () => {
    this.props.purchaseActions.increaseQuantity()
  }
  handleSubmit = () => {
    const { quantity, product: { id, picture, product, currentPrice  } } = this.props
    const text = `${quantity}张 | 总价：￥${(quantity * currentPrice).toFixed(2)}`
    const orderId = new Date().getTime()
    const order = {
      id: orderId,
      statusText: '待付款',
      orderPicUrl: picture,
      channel: '团购',
      title: product,
      text: [text, '有效期至2018-09-02'],
      type: 2,
      productId: id
    }

    this.props.purchaseActions.submitOrder(order)
  }
  handleCloseTip = () => {
    this.props.purchaseActions.closeTip()
    this.props.history.push('/user')
  }
  componentDidMount() {
    const id = this.props.match.params.id
    this.props.detailActions.fetchProductDetail(id)
  }
  componentWillUnmount() {
    this.props.purchaseActions.setQuantity(1)
  }
  render() {
    const { quantity, showTip, product: { currentPrice } } = this.props
    return (
      <div>
        <Header
          title="下单"
          onBack={ this.handleBack }
        />
        <PurchaseForm
          quantity={ quantity }
          price={ currentPrice }
          onQuantityChange={ this.onQuantityChange }
          onDecrease={ this.handleDecrease }
          onIncrease={ this.handleIncrease }
          onSubmit={ this.handleSubmit }
        />
        {
          showTip ? <Tip message="购买成功！" onClose={this.handleCloseTip} />  : null
        }
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const { id } = props.match.params
  return {
    quantity: getQuantity(state),
    product: getProduct(state, id),
    showTip: getShowTip(state)
  }
}
const mapDispatchToProps = dispatch => ({
  purchaseActions: bindActionCreators(purchaseActions, dispatch),
  detailActions: bindActionCreators(detailActions, dispatch)
})

const PurchaseContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Purchase)

export default PurchaseContainer