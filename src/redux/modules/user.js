import { FETCH_DATA } from '../middlewares/api'
import { schema as orderSchema, getOrderById } from './entities/orders'
import * as URL from '../../utils/url'
import { combineReducers } from 'redux'

const initState = {
  orders: {
    isFetching: false,
    ids: []
  },
  orderType: 0
}

const types = {
  FETCH_ORDERS_REQUEST: 'ORDER/FETCH_ORDERS_REQUEST',
  FETCH_ORDERS_SUCCESS: 'ORDER/FETCH_ORDERS_SUCCESS',
  FETCH_ORDERS_FAILED: 'ORDER/FETCH_ORDERS_FAILED',
  SET_ORDER_TYPE: 'ORDER/SET_ORDER_TYPE'
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
const setOrderTypeType = text => ({
  type: types.SET_ORDER_TYPE,
  text
})

export const actions = {
  fetchOrders: type => {
    return (dispatch) => {
      const endpoint = URL.getOrders(type)
      dispatch(fetchOrdersType(endpoint, type))
    }
  },
  setOrderType: type => {
    return (dispatch) => {
      dispatch(setOrderTypeType(type))
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

const orderType = (state = initState.orderType, action) => {
  switch (action.type) {
    case types.SET_ORDER_TYPE:
      return action.text
    default:
      return state
  }
}

const reducer = combineReducers({
  orders,
  orderType
})

export default reducer

// selector
export const getOrders = state => state.user.orders.ids.map(id => getOrderById(state, id))
export const getOrderType = state => state.user.orderType
