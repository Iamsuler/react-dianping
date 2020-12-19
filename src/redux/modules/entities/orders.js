import createReducer from '@/utils/createReducer'

export const schema = {
  name: 'orders',
  id: 'id'
}
const reducer = createReducer(schema.name)

export default reducer

export const getOrderById = (state, id) => state.entities.orders[id]
