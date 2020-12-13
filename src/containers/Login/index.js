import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import { getStatus, actions as loginActions } from '../../redux/modules/login'

import LoginHeader from './components/LoginHeader'
import LoginForm from './components/LoginForm'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class Login extends Component {
  constructor (props) {
    super(props)

    this.state = {
      username: sessionStorage.getItem('username') || '',
      password: ''
    }
  }
  onChange = e => {
    const { name, value } = e.target
    this.setState({
      [name]: value
    })
  }

  onSubmit = () => {
    const { username, password } = this.state
    if (!username || !password) {
      alert('用户名或密码不能为空')
      return
    }
    sessionStorage.setItem('username', username)
    this.props.loginActions.login()
  }

  render() {
    const { isLogin, location: { state } } = this.props
    if (isLogin) {
      const path = state && state.from ? state.from : '/user'
      return <Redirect to={ path } />
    }
    const { username, password } = this.state
    return (
      <div>
        <LoginHeader />
        <LoginForm
          username={ username }
          password={ password }
          onChange={ this.onChange }
          onSubmit={ this.onSubmit }
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isLogin: getStatus(state)
})

const mapDispatchToProps = (dispatch) => ({
  loginActions: bindActionCreators(loginActions, dispatch)
})

const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)

export default LoginContainer;