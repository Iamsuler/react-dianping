import React, { Component } from 'react'
import UserHeader from './components/UserHeader'
import UserMain from './components/UserMain'
import { actions as loginActions } from '../../redux/modules/login'
import { actions as userActions, getOrders, getOrderType } from '../../redux/modules/user'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class User extends Component {
  handleBack = () => {
    this.props.history.push('/')
  }
  handleLogout = () => {
    this.props.loginActions.logout()
  }
  handleSetOrderType = (type) => {
    this.props.userActions.setOrderType(type)
    this.props.userActions.fetchOrders(type)
  }

  componentDidMount() {
    const { orderType } = this.props
    this.props.userActions.fetchOrders(orderType)
  }

  render() {
    const { orders, orderType } = this.props
    return (
      <div>
        <UserHeader
          onBack={ this.handleBack }
          onLogout={ this.handleLogout }
        />
        <UserMain
          data={ orders }
          orderType={ orderType }
          setOrderType={ this.handleSetOrderType }
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  orders: getOrders(state),
  orderType: getOrderType(state)
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