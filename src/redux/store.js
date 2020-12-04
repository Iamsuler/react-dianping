import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from './modules'
import apiMiddleware from './middlewares/api'

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
        thunkMiddleware,
        apiMiddleware
      )
    )
  )
} else {
  store = createStore(
    rootReducer,
    applyMiddleware(
      thunkMiddleware,
      apiMiddleware
    )
  )
}

export default store
