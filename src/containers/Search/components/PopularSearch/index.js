import React, { Component } from 'react'

import './style.css'

class PopularSearch extends Component {
  handleClickKeywords = id => {
    console.log(id)
  }

  render() {
    const { data } = this.props
    return (
      <div className="popularSearch">
        {
          data.map(item => {
            return (
              <span
                key={item.id}
                className="popularSearch__item"
                onClick={this.handleClickKeywords(item.id)}
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