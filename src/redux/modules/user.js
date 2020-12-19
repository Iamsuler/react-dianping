import { FETCH_DATA } from '../middlewares/api'
import { schema as orderSchema, getOrderById } from './entities/orders'
import * as URL from '../../utils/url'
import { combineReducers } from 'redux'

const initState = {
  orders: {
    isFetching: false,
    ids: []
  },
  statusText: ''
}

const types = {
  FETCH_ORDERS_REQUEST: 'ORDER/FETCH_ORDERS_REQUEST',
  FETCH_ORDERS_SUCCESS: 'ORDER/FETCH_ORDERS_SUCCESS',
  FETCH_ORDERS_FAILED: 'ORDER/FETCH_ORDERS_FAILED',
  SET_STATUS_TEXT: 'ORDER/SET_STATUS_TEXT'
}

const fetchOrdersType = (endpoint, text) => ({
  [FETCH_DATA]: {
    endpoint,
    schema: orderSchema,
    types: [
      types.FETCH_ORDERS_REQUEST,
      types.FETCH_ORDERS_SUCCESS,
      types.FETCH_ORDERS_FAILED
    ]
  },
  text
})
const setStatusTextType = text => ({
  type: types.SET_STATUS_TEXT,
  text
})

export const actions = {
  fetchOrders: text => {
    return (dispatch) => {
      const endpoint = URL.getOrders(text)
      dispatch(fetchOrdersType(endpoint, text))
    }
  },
  setStatusText: text => {
    return (dispatch) => {
      dispatch(setStatusTextType(text))
    }
  }
}

const orders = (state = initState.orders, action) => {
  switch (action.type) {
    case types.FETCH_ORDERS_REQUEST:
      return { ...state, isFetching: true }
    case types.FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        ids: action.response.ids
      }
    case types.FETCH_ORDERS_FAILED:
      return { ...state, isFetching: false }
    default:
      return state
  }
}

const statusText = (state = initState.statusText, action) => {
  switch (action.type) {
    case types.SET_STATUS_TEXT:
      return action.text
    default:
      return state
  }
}

const reducer = combineReducers({
  orders,
  statusText
})

export default reducer

// selector
export const getOrders = state => state.user.orders.ids.map(id => getOrderById(state, id))
export const getStatusText = state => state.user.orders.statusText
