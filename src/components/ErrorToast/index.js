import React, { Component } from 'react';
import PropTypes from 'prop-types'
import './style.css'

class ErrorToast extends Component {
  static propTypes = {
    message: PropTypes.string.isRequired,
    clearError: PropTypes.func.isRequired
  }

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