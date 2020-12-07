import { combineReducers } from 'redux'
import entities from './entities/index'
import app from './app'
import home from './home'
import search from './search'

const rootReducer = combineReducers({
  entities,
  app,
  home,
  search
})

export default rootReducer
