import { combineReducers } from 'redux'
import entities from './entities/index'
import app from './app'
import home from './home'
import search from './search'
import login from './login'

const rootReducer = combineReducers({
  entities,
  app,
  home,
  search,
  login
})

export default rootReducer
