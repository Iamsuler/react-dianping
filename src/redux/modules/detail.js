import { combineReducers } from 'redux'
import * as URL from '@/utils/url'
import { FETCH_DATA } from '@/redux/middlewares/api'
import { schema as productSchema, getProductDetail, getProductById } from './entities/products'
import { schema as shopSchema, getShopById } from './entities/shops'

const types = {
  // 商品详情
  FETCH_PRODUCT_DETAIL_REQUEST: 'DETAIL/FETCH_PRODUCT_DETAIL_REQUEST',
  FETCH_PRODUCT_DETAIL_SUCCESS: 'DETAIL/FETCH_PRODUCT_DETAIL_SUCCESS',
  FETCH_PRODUCT_DETAIL_FAILED: 'DETAIL/FETCH_PRODUCT_DETAIL_FAILED',
  // 关联商铺
  FETCH_RELATED_SHOP_REQUEST: 'DETAIL/FETCH_RELATED_SHOP_REQUEST',
  FETCH_RELATED_SHOP_SUCCESS: 'DETAIL/FETCH_RELATED_SHOP_SUCCESS',
  FETCH_RELATED_SHOP_FAILED: 'DETAIL/FETCH_RELATED_SHOP_FAILED'
}

const initState = {
  product: {
    isFetching: false,
    id: null
  },
  relatedShop: {
    id: null,
    isFetching: false
  }
}

const fetchProductDetailType = (endpoint, id) => ({
  [FETCH_DATA]: {
    endpoint,
    schema: productSchema,
    types: [
      types.FETCH_PRODUCT_DETAIL_REQUEST,
      types.FETCH_PRODUCT_DETAIL_SUCCESS,
      types.FETCH_PRODUCT_DETAIL_FAILED
    ]
  },
  id
})

const fetchProductSuccess = (id) => ({
  type: types.FETCH_PRODUCT_DETAIL_SUCCESS,
  id
})

const fetchShopType = (endpoint, id) => ({
  [FETCH_DATA]: {
    endpoint,
    schema: shopSchema,
    types: [
      types.FETCH_RELATED_SHOP_REQUEST,
      types.FETCH_RELATED_SHOP_SUCCESS,
      types.FETCH_RELATED_SHOP_FAILED
    ]
  },
  id
})

const fetchShopSuccess = (id) => ({
  type: types.FETCH_PRODUCT_DETAIL_SUCCESS,
  id
})

export const actions = {
  fetchProductDetail: id => {
    return (dispatch, getState) => {
      const product = getProductDetail(getState(), id)
      if (product) {
        return dispatch(fetchProductSuccess(id))
      }
      const endpoint = URL.getProduct(id)
      return dispatch(fetchProductDetailType(endpoint, id))
    }
  },
  fetchRelatedShop: id => {
    return (dispatch, getState) => {
      const product = getShopById(getState(), id)
      if (product) {
        return dispatch(fetchShopSuccess(id))
      }
      const endpoint = URL.getShop(id)
      return dispatch(fetchShopType(endpoint, id))
    }
  }
}

const product = (state = initState.product, action) => {
  switch (action.type) {
    case types.FETCH_PRODUCT_DETAIL_REQUEST:
      return { ...state, isFetching: true }
    case types.FETCH_PRODUCT_DETAIL_SUCCESS:
      return {
        ...state,
        isFetching: false,
        id: action.id
      }
    case types.FETCH_PRODUCT_DETAIL_FAILED:
      return {
        ...state,
        isFetching: false,
        id: null
      }
    default:
      return state
  }
}
const relatedShop = (state = initState.relatedShop, action) => {
  switch (action.type) {
    case types.FETCH_RELATED_SHOP_REQUEST:
      return { ...state, isFetching: true }
    case types.FETCH_RELATED_SHOP_SUCCESS:
      return {
        ...state,
        isFetching: false,
        id: action.id
      }
    case types.FETCH_RELATED_SHOP_FAILED:
      return {
        ...state,
        isFetching: false,
        id: null
      }
    default:
      return state
  }
}

const reduer = combineReducers({
  product,
  relatedShop
})

export default reduer

// selector
export const getProduct = (state, id) => {
  return getProductDetail(state, id)
}

export const getShop = (state, productId) => {
  const product = getProductById(state, productId)
  const shopId = product ? product.nearestShop : null

  if (shopId) {
    return getShopById(state, shopId)
  }

  return null
}
