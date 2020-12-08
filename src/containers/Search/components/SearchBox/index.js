import React, { Component } from 'react'

import './style.css'

class SearchBox extends Component {
  handleChange = e => {
    this.props.setInputText(e.target.value)
  }

  renderSuggestList = () => {
    const { relatedKeywords, handleClickItem } = this.props
    return (
      <ul className="searchBox__list">
        {relatedKeywords.map(item => {
          return (
            <li className="searchBox__item" key={item.id} onClick={ () => handleClickItem(item) }>
              <span className="searchBox__itemKeyworkd">
                {item.keyword}
              </span>
              <span className="searchBox__itemQuantity">
                约{item.quantity}个结果
              </span>
            </li>
          )
        })}
      </ul>
    )
  }

  render() {
    const { inputText, clearInputText, onCancel } = this.props
    const visiable = inputText.length > 0
    return (
      <div className="searchBox">
        <div className="searchBox__container">
          <input
            className="searchBox__text"
            value={inputText}
            onChange={this.handleChange}
          />
          {visiable ? (
            <span
              className="searchBox__clear"
              onClick={ clearInputText }
            />
          ) : null}
          <span className="searchBox__cancel" onClick={ onCancel }>取消</span>
        </div>
        {visiable ? this.renderSuggestList() : null}
      </div>
    );
  }
}

export default SearchBox
