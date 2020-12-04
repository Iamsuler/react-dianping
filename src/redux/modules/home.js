import { get } from '../../utils/request'
import { getProdustcList } from '../../utils/url'

const types = {
  FETCH_LIKES_PRODUCTS: 'HOME/FETCH_LIKES_PRODUCTS',
  FETCH_LIKES_PRODUCTS_SUCCESS: 'HOME/FETCH_LIKES_PRODUCTS_SUCCESS',
  FETCH_LIKES_PRODUCTS_FAILED: 'HOME/FETCH_LIKES_PRODUCTS_FAILED'
}

// action
const fetchLikesRequest = () => ({ type: types.FETCH_LIKES_PRODUCTS })
const fetchLikesSuccess = (data) => ({ type: types.FETCH_LIKES_PRODUCTS_SUCCESS, data })
const fetchLikesFailed = (error) => ({ type: types.FETCH_LIKES_PRODUCTS_FAILED, error })

export const actions = {
  fetchLikes: () => {
    return (dispatch) => {
      dispatch(fetchLikesRequest())

      get(getProdustcList(1, 10))
        .then(
          response => {
            dispatch(fetchLikesSuccess(response))
          },
          error => {
            dispatch(fetchLikesFailed(error))
          }
        )
    }
  }
}

const reducer = (state = {}, action) => {
  switch (action.type) {
    case types.FETCH_LIKES_PRODUCTS:
      return state
    case types.FETCH_LIKES_PRODUCTS_SUCCESS:
      return state
    case types.FETCH_LIKES_PRODUCTS_FAILED:
      return state
    default:
      return state
  }
}

export default reducer
