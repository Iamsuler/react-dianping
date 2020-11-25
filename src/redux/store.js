import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from './modules'

let store

if (
  process.env.NODE_ENV !== 'production' &&
  window.__REDUX_DEVTOOLS_EXTENSION__
) {
  const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  store = createStore(
    rootReducer,
    composeEnhancer(
      applyMiddleware(
        thunkMiddleware
      )
    )
  )
} else {
  store = createStore(
    rootReducer,
    applyMiddleware(
      thunkMiddleware
    )
  )
}

export default store
