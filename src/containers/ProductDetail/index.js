import React, { Component } from 'react'
import { bindActionCreators } from 'redux'

import { getProduct, getShop, actions as detailActions } from '../../redux/modules/detail'

import Header from '@/components/Header'
import ProductOverview from './components/Overview'
import ShopInfo from './components/ShopInfo'
import Detail from './components/Detail'
import Remark from './components/Remark'
import BuyButton from './components/BuyButton'

import './style.css'
import { connect } from 'react-redux'

class ProductDetail extends Component {
  handleBack = () => {
    this.props.history.goBack()
  }

  componentDidMount () {
    const { id } = this.props.match.params
    const { product } = this.props

    if (!product) {
      this.props.detailActions.fetchProductDetail(id)
    } else if (!this.props.relatedShop) {
      this.props.detailActions.fetchRelatedShop(product.nearestShop)
    }
  }

  componentDidUpdate (preProps) {
    // 第一次获取商品详情，需要继续获取关联商铺信息
    const product = this.props.product
    if (!preProps.product && product) {
      this.props.detailActions.fetchRelatedShop(product.nearestShop)
    }
  }

  render() {
    const { product, relatedShop } = this.props
    const { id } = this.props.match.params
    return (
      <div className="productDetail">
        <Header title="团购详情" grey onBack={ this.handleBack } />
        { product && <ProductOverview data={ product } /> }
        { relatedShop && <ShopInfo data={ relatedShop } total={ product.shopIds.length } /> }
        { product && <Detail data={ product } /> }
        <Remark />
        <BuyButton id={ id } />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const productId = props.match.params.id

  return {
    product: getProduct(state, productId),
    relatedShop: getShop(state, productId) 
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    detailActions: bindActionCreators(detailActions, dispatch)
  }
}

const ProductionDetailContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductDetail)

export default ProductionDetailContainer
