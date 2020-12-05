import React, { Component } from 'react';
import './style.css';
import ErrorToast from '../../components/ErrorToast'
import { getError, actions as appActions } from '../../redux/modules/app'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import Home from '../Home'
class App extends Component {
  render() {
    const { error, appActions: { clearError } } = this.props
    return (
      <div className="App">
        {
          error ? <ErrorToast message={ error } clearError={ clearError } /> : null
        }
        <Home />
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