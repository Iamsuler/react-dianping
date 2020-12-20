import React, { Component, Suspense, lazy } from 'react';
import './style.css';
import ErrorToast from '../../components/ErrorToast'
import { getError, actions as appActions } from '../../redux/modules/app'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import PrivateRoute from '../PrivateRoute'
import Loading from '../../components/Loading'
const Home = lazy(() => import(/* webpackChunkName: "Home" */ '../Home'))
const User = lazy(() => import(/* webpackChunkName: "User" */ '../User'))
const ProductDetail = lazy(() => import(/* webpackChunkName: "Home" */ '../ProductDetail'))
const Search = lazy(() => import(/* webpackChunkName: "Search" */ '../Search'))
const SearchResult = lazy(() => import(/* webpackChunkName: "Search" */ '../SearchResult'))
const Login = lazy(() => import(/* webpackChunkName: "Login" */ '../Login'))
const Purchase = lazy(() => import(/* webpackChunkName: "Purchase" */ '../Purchase'))
class App extends Component {
  render() {
    const { error, appActions: { clearError } } = this.props
    return (
      <div className="App">
        {
          error ? <ErrorToast message={ error } clearError={ clearError } /> : null
        }
        <BrowserRouter>
          <Suspense fallback={ <Loading /> }>
            <Switch>
              <PrivateRoute path="/user" component={ User } ></PrivateRoute>
              <PrivateRoute path="/purchase/:id" component={ Purchase } ></PrivateRoute>
              <Route path="/detail/:id" component={ ProductDetail }></Route>
              <Route path="/search" component={ Search }></Route>
              <Route path="/search-result" component={ SearchResult }></Route>
              <Route path="/login" component={ Login }></Route>
              <Route path="/" component={ Home }></Route>
            </Switch>
          </Suspense>
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