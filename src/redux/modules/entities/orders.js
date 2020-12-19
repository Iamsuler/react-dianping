export const schema = {
  name: 'orders',
  id: 'id'
}
const types = {
  DELETE_ORDER: 'ORDERS/DELETE_ORDER',
  ADD_ORDER: 'ORDERS/ADD_ORDER',
  ADD_COMMENT: 'ORDERS/ADD_COMMENT'
}
export const actions = {
  deleteOrder: orderId => ({
    type: types.DELETE_ORDER,
    orderId
  }),
  addComment: (orderId, commentId) => ({ type: types.ADD_COMMENT, orderId, commentId })
}
const reducer = (state = {}, action) => {
  const { type } = action
  if (type === types.DELETE_ORDER) {
    const { [action.orderId]: deletedOrder, ...restOrders } = state
    return restOrders
  } else if (type === types.ADD_COMMENT) {
    const currrentOrderId = [action.orderId]
    const { [currrentOrderId]: currentOrder, ...restOrders } = state
    return {
      ...restOrders,
      [currrentOrderId]: {
        ...currentOrder,
        commentId: action.commentId
      }
    }
  } else if (action.response && action.response.orders) {
    // 外部影响，实体组件如果存在响应，也应该进行更新
    return { ...state, ...action.response.orders }
  }
  return state
}

export default reducer

export const getOrderById = (state, id) => state.entities.orders[id]
