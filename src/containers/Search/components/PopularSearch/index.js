import React, { Component } from 'react'

import './style.css'

class PopularSearch extends Component {

  render() {
    const { data, handleClickItem } = this.props
    return (
      <div className="popularSearch">
        {
          data.map(item => {
            return (
              <span
                key={item.id}
                className="popularSearch__item"
                onClick={handleClickItem(item)}
              >
                {item.keyword}
              </span>
            )
          })
        }
      </div>
    );
  }
}

export default PopularSearch