import { combineReducers } from 'redux'
import entities from './entities/index'
import app from './app'
import home from './home'
import search from './search'
import login from './login'
import user from './user'
import purchase from './purchase'

const rootReducer = combineReducers({
  entities,
  app,
  home,
  search,
  login,
  user,
  purchase
})

export default rootReducer
