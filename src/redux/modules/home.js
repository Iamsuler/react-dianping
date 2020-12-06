import { combineReducers } from 'redux'
import { getProdustcList } from '../../utils/url'
import { FETCH_DATA } from '../middlewares/api'
import { schema } from './entities/products'

const types = {
  // 猜你喜欢
  FETCH_LIKES_PRODUCTS: 'HOME/FETCH_LIKES_PRODUCTS',
  FETCH_LIKES_PRODUCTS_SUCCESS: 'HOME/FETCH_LIKES_PRODUCTS_SUCCESS',
  FETCH_LIKES_PRODUCTS_FAILED: 'HOME/FETCH_LIKES_PRODUCTS_FAILED',
  FETCH_DISCOUNTS_PRODUCTS: 'HOME/FETCH_DISCOUNTS_PRODUCTS',
  // 特惠
  FETCH_DISCOUNTS_PRODUCTS_SUCCESS: 'HOME/FETCH_DISCOUNTS_PRODUCTS_SUCCESS',
  FETCH_DISCOUNTS_PRODUCTS_FAILED: 'HOME/FETCH_DISCOUNTS_PRODUCTS_FAILED'
}

export const params = {
  PATH_LIKES: 'likes',
  PATH_DISCOUNTS: 'discounts',
  PAGE_SIZE_LIKES: 5,
  PAGE_SIZE_DISCOUNTS: 3 
}

const initState = {
  likes: {
    isFetching: false,
    pageCount: 0,
    ids: []
  },
  discounts: {
    isFetching: false,
    ids: []
  }
}

const fetchLikes = (endpoint) => ({
  [FETCH_DATA]: {
    schema,
    endpoint,
    types: [
      types.FETCH_LIKES_PRODUCTS,
      types.FETCH_LIKES_PRODUCTS_SUCCESS,
      types.FETCH_LIKES_PRODUCTS_FAILED
    ]
  }
})

const fetchDiscounts = (endpoint) => ({
  [FETCH_DATA]: {
    schema,
    endpoint,
    types: [
      types.FETCH_DISCOUNTS_PRODUCTS,
      types.FETCH_DISCOUNTS_PRODUCTS_SUCCESS,
      types.FETCH_DISCOUNTS_PRODUCTS_FAILED
    ]
  }
})

export const actions = {
  fetchLikes: (dispatch, getState) => {
    const { pageCount } = getState().home.likes
    const rowIndex = pageCount * params.PAGE_SIZE_LIKES
    const endpoint = getProdustcList(params.PATH_LIKES, rowIndex, params.PAGE_SIZE_LIKES)
    dispatch(fetchLikes(endpoint))
  },
  fetchDiscounts: dispatch => {
    const endpoint = getProdustcList(params.PATH_DISCOUNTS, 0, params.PAGE_SIZE_DISCOUNTS)
    dispatch(fetchDiscounts(endpoint))
  }
}

const likesReducer = (state = initState.likes, action) => {
  switch (action.type) {
    case types.FETCH_LIKES_PRODUCTS:
      return { ...state, isFetching: true }
    case types.FETCH_LIKES_PRODUCTS_SUCCESS:
      const { pageCount, ids } = state
      return {
        ...state,
        isFetching: false,
        pageCount: pageCount + 1,
        ids: ids.concat(action.response.ids)
      }
    case types.FETCH_LIKES_PRODUCTS_FAILED:
      return {
        ...state,
        isFetching: false
      }
    default:
      return state
  }
}

const discountsReducer = (state = initState.discounts, action) => {
  switch (action.type) {
    case types.FETCH_LIKES_PRODUCTS:
      return { ...state, isFetching: true }
    case types.FETCH_LIKES_PRODUCTS_SUCCESS:
      const { ids } = state
      return {
        ...state,
        isFetching: false,
        ids: ids.concat(action.response.ids)
      }
    case types.FETCH_LIKES_PRODUCTS_FAILED:
      return {
        ...state,
        isFetching: false
      }
    default:
      return state
  }
}

const homeReducer = combineReducers({
  likesReducer,
  discountsReducer
})

export default homeReducer
