import { combineReducers } from 'redux'
import { FETCH_DATA } from '../middlewares/api'
import { schema as orderSchema, actions as orderActions, getOrderById } from './entities/orders'
import { schema as commentSchema, actions as commentActions } from './entities/comments'
import * as URL from '../../utils/url'

const initState = {
  orders: {
    isFetching: false,
    loaded: false, // 标记是否从接口获取订单
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
  // 获取订单列表
  FETCH_ORDERS_REQUEST: 'USER/FETCH_ORDERS_REQUEST',
  FETCH_ORDERS_SUCCESS: 'USER/FETCH_ORDERS_SUCCESS',
  FETCH_ORDERS_FAILED: 'USER/FETCH_ORDERS_FAILED',
  // 设置当前选择的Tab
  SET_ORDER_TYPE: 'USER/SET_ORDER_TYPE',
  // 删除确认对话框
  SHOW_DELETE_ORDER: 'USER/SHOW_DELETE_ORDER',
  HIDE_DELETE_ORDER: 'USER/HIDE_DELETE_ORDER',
  // 删除订单
  FETCH_DELETE_ORDER_REQUEST: 'USER/FETCH_DELETE_ORDER_REQUEST',
  FETCH_DELETE_ORDER_SUCCESS: 'USER/FETCH_DELETE_ORDER_SUCCESS',
  FETCH_DELETE_ORDER_FAILED: 'USER/FETCH_DELETE_ORDER_FAILED',
  // 评价订单编辑
  SHOW_COOMENT_AREA: 'USER/SHOW_COOMENT_AREA',
  HIDE_COMMENT_AREA: 'USER/HIDE_COMMENT_AREA',
  SET_COMMENT_CONTENT: 'USER/SET_COMMENT_CONTENT',
  SET_STARS: 'USER/SET_STARS',
  // 提交评价
  POST_COMMENT_REQUEST: 'USER/POST_COMMENT_REQUEST',
  POST_COMMENT_SUCCESS: 'USER/POST_COMMENT_SUCCESS',
  POST_COMMENT_FAILED: 'USER/POST_COMMENT_FAILED',
  // 购买添加订单
  ADD_ORDER: 'USER/ADD_ORDER'
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
const postCommentRequestType = () => ({ type: types.POST_COMMENT_REQUEST })
const postCommentSuccessType = () => ({ type: types.POST_COMMENT_SUCCESS })

export const actions = {
  fetchOrders: type => {
    return (dispatch, getState) => {
      const { loaded } = getState().user.orders
      if (loaded) {
        return null
      }
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
  }),
  showCommentArea: orderId => ({
    type: types.SHOW_COOMENT_AREA,
    orderId
  }),
  hideCommentArea: () => ({
    type: types.HIDE_COMMENT_AREA
  }),
  setCommentContent: comment => ({
    type: types.SET_COMMENT_CONTENT,
    comment
  }),
  setStars: stars => ({
    type: types.SET_STARS,
    stars
  }),
  postComment: () => {
    return (dispatch, getState) => {
      dispatch(postCommentRequestType())
      const { id: orderId, comment, stars } = getState().user.currentOrder
      new Promise((resolve) => {
        setTimeout(() => {
          const commentId = new Date().getTime()
          const commentObj = {
            [commentSchema.id]: commentId,
            content: comment,
            stars
          }
          dispatch(commentActions.addComment(commentObj))
          dispatch(orderActions.addComment(orderId, commentId))
          dispatch(postCommentSuccessType())
          resolve()
        }, 1000)
      })
    }
  },
  addOrder: orderId => ({ type: types.ADD_ORDER, orderId })
}

const orders = (state = initState.orders, action) => {
  switch (action.type) {
    case types.FETCH_ORDERS_REQUEST:
      return { ...state, isFetching: true }
    case types.FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        loaded: true,
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
    case types.ADD_ORDER:
      return {
        ...state,
        ids: [
          action.orderId,
          ...state.ids
        ]
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
    case types.HIDE_COMMENT_AREA:
    case types.HIDE_DELETE_ORDER:
    case types.FETCH_DELETE_ORDER_SUCCESS:
    case types.FETCH_DELETE_ORDER_FAILED:
    case types.POST_COMMENT_SUCCESS:
    case types.POST_COMMENT_FAILED:
      return initState.currentOrder
    case types.SHOW_COOMENT_AREA:
      return { ...state, id: action.orderId, isCommenting: true }
    case types.SET_COMMENT_CONTENT:
      return { ...state, comment: action.comment }
    case types.SET_STARS:
      return { ...state, stars: action.stars }
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
export const isDeletingOrder = state => {
  return state.user.currentOrder && state.user.currentOrder.isDeleting
}
export const getComment = state => state.user.currentOrder.comment
export const getCommentingOrderId = state => {
  return state.user.currentOrder && state.user.currentOrder.isCommenting
    ? state.user.currentOrder.id
    : null
}
export const getStars = state => state.user.currentOrder.stars
