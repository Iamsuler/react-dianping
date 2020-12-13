import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom'

import { getStatus } from '../../redux/modules/login'

class PrivateRoute extends Component {
  render() {
    const { isLogin, component: PropComponent, ...rest } = this.props
    return (
      <Route
        { ...rest }
        render={
          (props) => isLogin ? <PropComponent {...props} /> : <Redirect to={ { pathname: '/login', state: { from: props.location } } } />
        }
      />
    );
  }
}

const mapStateToProps = (state) => ({
  isLogin: getStatus(state )
})

export default connect(mapStateToProps, null)(PrivateRoute);