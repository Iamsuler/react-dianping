import { combineReducers } from 'redux'
import { FETCH_DATA } from '../middlewares/api'
import { schema as orderSchema, getOrderById } from './entities/orders'
import * as URL from '../../utils/url'
import { actions as orderActions } from './entities/orders'

const initState = {
  orders: {
    isFetching: false,
    ids: []
  },
  orderType: 0,
  // 维护订单信息
  currentOrder: {
    id: null,
    isDeleting: false,
    isCommenting: false,
    comment: '',
    stars: 0,
    commentTip: false, // 显示提交评论是否成功的提示框
  }
}

const types = {
  FETCH_ORDERS_REQUEST: 'USER/FETCH_ORDERS_REQUEST',
  FETCH_ORDERS_SUCCESS: 'USER/FETCH_ORDERS_SUCCESS',
  FETCH_ORDERS_FAILED: 'USER/FETCH_ORDERS_FAILED',
  SET_ORDER_TYPE: 'USER/SET_ORDER_TYPE',
  SHOW_DELETE_ORDER: 'USER/SHOW_DELETE_ORDER',
  HIDE_DELETE_ORDER: 'USER/HIDE_DELETE_ORDER',
  FETCH_DELETE_ORDER_REQUEST: 'USER/FETCH_DELETE_ORDER_REQUEST',
  FETCH_DELETE_ORDER_SUCCESS: 'USER/FETCH_DELETE_ORDER_SUCCESS',
  FETCH_DELETE_ORDER_FAILED: 'USER/FETCH_DELETE_ORDER_FAILED',
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
const fetchDeleteOrderRequestType = () => ({ type: types.FETCH_DELETE_ORDER_REQUEST })
const fetchDeleteOrderSuccessType = orderId => ({ type: types.FETCH_DELETE_ORDER_SUCCESS, orderId })
// const fetchDeleteOrderFailedType = () => ({ type: types.FETCH_DELETE_ORDER_REQUEST })
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
  },
  fetchDeleteOrder: () => {
    return (dispatch, getState) => {
      const { id } = getState().user.currentOrder
      if (!id) {
        return
      }
      dispatch(fetchDeleteOrderRequestType())
      new Promise((resolve) => {
        setTimeout(() => {
          dispatch(fetchDeleteOrderSuccessType(id))
          dispatch(orderActions.deleteOrder(id))
          resolve()
        }, 1000)
      })
    }
  },
  showDeleteDialog: orderId => ({
    type: types.SHOW_DELETE_ORDER,
    orderId
  }),
  hideDeleteDialog: () => ({
    type: types.HIDE_DELETE_ORDER
  })
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
    case types.FETCH_DELETE_ORDER_SUCCESS:
      const ids = state.ids.filter(id => id !== action.orderId)
      return {
        ...state,
        ids
      }
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

const currentOrder = (state = initState.currentOrder, action) => {
  switch (action.type) {
    case types.SHOW_DELETE_ORDER:
      return {
        ...state,
        isDeleting: true,
        id: action.orderId
      }
    case types.HIDE_DELETE_ORDER:
    case types.FETCH_DELETE_ORDER_SUCCESS:
    case types.FETCH_DELETE_ORDER_FAILED:
      return initState.currentOrder
    default:
      return state
  }
}

const reducer = combineReducers({
  orders,
  orderType,
  currentOrder
})

export default reducer

// selector
export const getOrders = state => state.user.orders.ids.map(id => getOrderById(state, id))
export const getOrderType = state => state.user.orderType
export const isDeletingOrder = state => state.user.currentOrder.isDeleting
