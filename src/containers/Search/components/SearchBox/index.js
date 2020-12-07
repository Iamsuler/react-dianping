import React, { Component } from 'react'

import './style.css'

class SearchBox extends Component {
  constructor (props) {
    super(props)

    this.state = {
      inputText: ''
    }
  }

  handleClick = (id) => {
    console.log(id)
  }

  handleChange = e => {
    this.setState({
      inputText: e.target.value
    })
  }

  handleClear = () => {
    this.setState({
      inputText: ''
    })
  }

  renderSuggestList = () => {
    const { relatedKeywords } = this.props
    return (
      <ul className="searchBox__list">
        {relatedKeywords.map(item => {
          return (
            <li className="searchBox__item" key={item.id} onClick={this.handleClick(item.id)}>
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
    const { inputText } = this.state
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
              onClick={this.handleClear}
            />
          ) : null}
          <span className="searchBox__cancel" onClick={this.props.onCancel}>取消</span>
        </div>
        {visiable ? this.renderSuggestList() : null}
      </div>
    );
  }
}

export default SearchBox
