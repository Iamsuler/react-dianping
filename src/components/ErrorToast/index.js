import React, { Component } from 'react';
import './style.css'

class ErrorToast extends Component {
  render() {
    const { message } = this.props
    return (
      <div className="error-toast">
        <div className="error-toast-text">{ message }</div>
      </div>
    );
  }

  componentDidMount () {
    this.timer = setTimeout(() => {
      this.props.clearError()
    }, 3000)
  }

  componentWillUnmount () {
    if (this.timer) {
      clearTimeout(this.timer)
    }
  }
}

export default ErrorToast;