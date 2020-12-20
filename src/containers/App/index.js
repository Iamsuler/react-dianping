import React, { Component } from 'react';
import './style.css';
import ErrorToast from '../../components/ErrorToast'
import { getError, actions as appActions } from '../../redux/modules/app'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import loadable from '../../utils/loadable'
import PrivateRoute from '../PrivateRoute'
const Home = loadable(() => import(/* webpackChunkName: "Home" */ '../Home'))
const User = loadable(() => import(/* webpackChunkName: "User" */ '../User'))
const ProductDetail = loadable(() => import(/* webpackChunkName: "Home" */ '../ProductDetail'))
const Search = loadable(() => import(/* webpackChunkName: "Search" */ '../Search'))
const SearchResult = loadable(() => import(/* webpackChunkName: "Search" */ '../SearchResult'))
const Login = loadable(() => import(/* webpackChunkName: "Login" */ '../Login'))
const Purchase = loadable(() => import(/* webpackChunkName: "Purchase" */ '../Purchase'))
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
            <PrivateRoute path="/user" component={ User } ></PrivateRoute>
            <PrivateRoute path="/purchase/:id" component={ Purchase } ></PrivateRoute>
            <Route path="/detail/:id" component={ ProductDetail }></Route>
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