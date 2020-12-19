import React, { Component } from 'react'
import UserHeader from './components/UserHeader'
import UserMain from './containers/UserMain'
import { actions as loginActions } from '../../redux/modules/login'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class User extends Component {
  handleBack = () => {
    this.props.history.push('/')
  }
  handleLogout = () => {
    this.props.loginActions.logout()
  }

  render() {
    return (
      <div>
        <UserHeader
          onBack={ this.handleBack }
          onLogout={ this.handleLogout }
        />
        <UserMain />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  loginActions: bindActionCreators(loginActions, dispatch)
})
const UserContainer = connect(
  null,
  mapDispatchToProps
)(User)

export default UserContainer;