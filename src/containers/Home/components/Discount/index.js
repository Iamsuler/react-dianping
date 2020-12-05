import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { get } from '@/utils/request'
import { getDiscountList } from '@/utils/url'
import './style.css'

class Discount extends Component {
  constructor (props) {
    super(props)

    this.state = {
      discountList: []
    }
  }

  componentDidMount () {
    get(getDiscountList(1, 10)).then(response => {
      const { data, success } = response
      if (success) {
        this.setState({
          discountList: data.list
        })
      }
    })
  }

  render() {
    const { discountList } = this.state
    return (
      <div className="discount">
        <a className="discount__header" href="/">
          <span className="discount__title">超值特惠</span>
          <span className="discount__more">更多优惠</span>
          <span className="discount__arrow" />
        </a>
        <div className="discount__content">
          {
            discountList.map((item) => (
              <Link
                key={item.id}
                to={`/detail/${item.id}`}
                className="discount__item"
              >
                <div className="discount__itemPic">
                  <img
                    width="100%"
                    height="100%"
                    src={item.picture}
                    alt="123"
                  />
                </div>
                <div className="discount__itemTitle">
                  {item.shop}
                </div>
                <div className="discount__itemPriceWrapper">
                  <ins className="discount__itemCurrentPrice">
                    {item.currentPrice}
                  </ins>
                  <del className="discount__itemOldPrice">
                    {item.oldPrice}
                  </del>
                </div>
              </Link>
            ))
          }
        </div>
      </div>
    )
  }
}

export default Discount;