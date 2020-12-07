import React, { Component } from 'react'

import './style.css'

class SearchHistory extends Component {
  handleClear = () => {
    console.log('handleClear')
  }

  render() {
    const { data } = this.props
    return (
      <div className="searchHistory">
        <div className="searchHistory__header">搜索记录</div>
        <ul className="searchHistory__list">
          {
            data.map((item) => {
              return (
                <li
                  key={item.id}
                  onClick={this.handleClick}
                  className="searchHistory__item"
                >
                  {item.keyword}
                </li>
              )
            })
          }
        </ul>
        <div
          className="searchHistory__clear"
          onClick={this.handleClear}
        >清除搜索记录</div>
      </div>
    );
  }
}

export default SearchHistory;