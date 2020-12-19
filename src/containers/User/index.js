import React, { Component } from 'react'
import UserHeader from './components/UserHeader'
import { actions as loginActions } from '../../redux/modules/login'
import { actions as userActions, getOrders, getStatusText } from '../../redux/modules/user'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class User extends Component {
  handleBack = () => {}
  handleLogout = () => {
    this.props.loginActions.logout()
  }

  componentDidMount() {
    this.props.userActions.fetchOrders()
  }

  render() {
    return (
      <div>
        <UserHeader
          onBack={ this.handleBack }
          onLogout={ this.handleLogout }
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  orders: getOrders(state),
  statusText: getStatusText(state)
})
const mapDispatchToProps = dispatch => ({
  loginActions: bindActionCreators(loginActions, dispatch),
  userActions: bindActionCreators(userActions, dispatch)
})
const UserContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(User)

export default UserContainer;