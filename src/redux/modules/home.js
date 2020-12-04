import { getProdustcList } from '../../utils/url'
import { FETCH_DATA } from '../middlewares/api'
import { schema } from './entities/products'

const types = {
  FETCH_LIKES_PRODUCTS: 'HOME/FETCH_LIKES_PRODUCTS',
  FETCH_LIKES_PRODUCTS_SUCCESS: 'HOME/FETCH_LIKES_PRODUCTS_SUCCESS',
  FETCH_LIKES_PRODUCTS_FAILED: 'HOME/FETCH_LIKES_PRODUCTS_FAILED'
}

const fetchLikes = (endpoint) => ({
  [FETCH_DATA]: {
    schema,
    endpoint,
    types: Object.values(types)
  } 
})

export const actions = {
  fetchLikes: () => {
    return (dispatch) => {
      const endpoint = getProdustcList(1, 10)
      return dispatch(fetchLikes(endpoint))
    }
  }
}

const reducer = (state = {}, action) => {
  switch (action.type) {
    case types.FETCH_LIKES_PRODUCTS:
      return state
    case types.FETCH_LIKES_PRODUCTS_SUCCESS:
      return state
    case types.FETCH_LIKES_PRODUCTS_FAILED:
      return state
    default:
      return state
  }
}

export default reducer
