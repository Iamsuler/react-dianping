import React, { Component } from 'react'

import { get } from '@/utils/request'
import { getProduct } from '@/utils/url'

import ProductOverview from './components/Overview'

class ProductDetail extends Component {
  constructor (props) {
    super(props)

    this.state = {
      id: '',
      productDetail: {}
    }
  }

  componentDidMount () {
    const { id } = this.props.match.params
    this.setState({ id })

    get(getProduct(id)).then(response => {
      const { success, data } = response
      if (success) {
        this.setState({
          productDetail: data
        })
      }
    })
  }

  render() {
    const { productDetail } = this.state
    return (
      <div className="productDetail">
        <ProductOverview data={ productDetail } />
      </div>
    );
  }
}

export default ProductDetail
