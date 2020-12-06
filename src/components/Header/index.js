import React, { Component } from 'react'

import './style.css'

class Header extends Component {
  render() {
    const { title, grey, onBack } = this.props
    const color = grey ? '#f0f0f0' : '#fff'
    return (
      <header className="header" style={{ backgroundColor: color }}>
        <div className="header__back" onClick={onBack}></div>
        <div className="header__title">{title}</div>
        <div className="header__aside"></div>
      </header>
    );
  }
}

export default Header