import React, { Component } from 'react'

import { get } from '@/utils/request'
import { getProduct, getShop } from '@/utils/url'

import Header from '@/components/Header'
import ProductOverview from './components/Overview'
import ShopInfo from './components/ShopInfo'
import Detail from './components/Detail'
import Remark from './components/Remark'
import BuyButton from './components/BuyButton'

import './style.css'

class ProductDetail extends Component {
  constructor (props) {
    super(props)

    this.state = {
      id: '',
      productDetail: {
        detail: {},
        currentPrice: '',
        oldPrice: ''
      },
      shopInfo: {},
      totalShop: 0
    }
  }

  getProduct = async (id) => {
    get(getProduct(id)).then(response => {
      const { success, data } = response
      if (success) {
        const { shopIds } = data
        this.getShop(shopIds[0])
        this.setState({
          productDetail: data,
          totalShop: shopIds.length
        })
      }
    })
  }

  getShop = async (id) => {
    get(getShop(id)).then(({ success, data }) => {
      if (success) {
        this.setState({
          shopInfo: data
        })
      }
    })
  }

  handleBack = () => {
    // TODO
  }

  componentDidMount () {
    const { id } = this.props.match.params
    this.getProduct(id)
    this.setState({ id })
  }

  render() {
    const { productDetail, totalShop, shopInfo, id } = this.state
    const { detail, oldPrice, currentPrice } = productDetail
    return (
      <div className="productDetail">
        <Header title="团购详情" grey onBack={ this.handleBack } />
        <ProductOverview data={ productDetail } />
        <ShopInfo data={ shopInfo } total={ totalShop } />
        <Detail data={ { ...detail, oldPrice, currentPrice } } />
        <Remark />
        <BuyButton id={ id } />
      </div>
    );
  }
}

export default ProductDetail
