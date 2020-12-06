import createReducer from '@/utils/createReducer'

export const schema = {
  name: 'products',
  id: 'id'
}

const reducer = createReducer(schema.name)

export default reducer

// selector
export const getProductDetail = (state, id) => {
  const product = state.entities.products[id]

  // 区分商品列表中的商品和详情商品
  return product && product.detail ? product : null
}

export const getProductById = (state, id) => {
  return state.entities.products[id]
}
