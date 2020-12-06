import createReducer from '@/utils/createReducer'

export const schema = {
  name: 'shops',
  id: 'id'
}

const reducer = createReducer(schema.name)

export default reducer

// selector
export const getShopById = (state, id) => state.entities.shops[id]
