import React, { Component } from 'react';
import './style.css';
import ErrorToast from '../../components/ErrorToast'
import { getError, actions as appActions } from '../../redux/modules/app'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from '../Home'
import User from '../User'
import ProductDetail from '../ProductDetail'
import Search from '../Search'
import SearchResult from '../SearchResult'
import Login from '../Login'
import PrivateRoute from '../PrivateRoute'
class App extends Component {
  render() {
    const { error, appActions: { clearError } } = this.props
    return (
      <div className="App">
        {
          error ? <ErrorToast message={ error } clearError={ clearError } /> : null
        }
        <BrowserRouter>
          <Switch>
            <Route path="/detail/:id" component={ ProductDetail }></Route>
            <PrivateRoute path="/user" component={ User } ></PrivateRoute>
            <Route path="/search" component={ Search }></Route>
            <Route path="/search-result" component={ SearchResult }></Route>
            <Route path="/login" component={ Login }></Route>
            <Route path="/" component={ Home }></Route>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  error: getError(state)
})

const mapDispatchToProps = dispatch => ({
  appActions: bindActionCreators(appActions, dispatch)
})

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default AppContainer;