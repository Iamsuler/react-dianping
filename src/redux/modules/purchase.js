import { combineReducers } from "redux"
import { actions as orderActions } from '../../redux/modules/entities/orders'
import { actions as userActions } from '../../redux/modules/user'

const initState = {
  quantity: 1,
  showTip: false
}

const types = {
  DECREASE_QUANTITY: 'PURCHASE/DECREASE_QUANTITY',
  INCREASE_QUANTITY: 'PURCHASE/INCREASE_QUANTITY',
  SET_QUANTITY: 'PURCHASE/SET_QUANTITY',
  POST_ORDER_REQUEST: 'PURCHASE/POST_ORDER_REQUEST',
  POST_ORDER_SUCCESS: 'PURCHASE/POST_ORDER_SUCCESS',
  POST_ORDER_FAILED: 'PURCHASE/POST_ORDER_FAILED',
  CLOSE_TIP: 'PURCHASE/CLOSE_TIP'
}

const postOrderRequestType = order => ({ type: types.POST_ORDER_REQUEST, order })
const postOrderSuccessType = () => ({ type: types.POST_ORDER_SUCCESS })

export const actions = {
  setQuantity: quantity => ({
    type: types.SET_QUANTITY,
    quantity
  }),
  decreaseQuantity: () => ({ type: types.DECREASE_QUANTITY }),
  increaseQuantity: () => ({ type: types.INCREASE_QUANTITY }),
  submitOrder: (order) => {
    return (dispatch) => {
      dispatch(postOrderRequestType(order))

      new Promise((resolve) => {
        setTimeout(() => {
          const { id } = order
          dispatch(orderActions.addOrder(order))
          dispatch(userActions.addOrder(id))
          dispatch(postOrderSuccessType())
          resolve()
        }, 1000)
      })
    }
  },
  closeTip: () => ({ type: types.CLOSE_TIP })
}

const quantity = (state = initState.quantity, action) => {
  switch (action.type) {
    case types.SET_QUANTITY:
      return action.quantity
    case types.DECREASE_QUANTITY:
      return --state
    case types.INCREASE_QUANTITY:
      return ++state
    default:
      return state
  }
}

const showTip = (state = initState.showTip, action) => {
  switch (action.type) {
    case types.CLOSE_TIP:
      return false
    case types.POST_ORDER_SUCCESS:
      return true
    default:
      return state
  }
}

const reducer = combineReducers({
  quantity,
  showTip
})

export default reducer

// selector
export const getQuantity = state => state.purchase.quantity
export const getShowTip = state => state.purchase.showTip
