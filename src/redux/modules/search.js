import { combineReducers } from 'redux'

import * as URL from '../../utils/url'
import { FETCH_DATA } from '@/redux/middlewares/api'
import { schema as keywordSchema, getKeywordById } from './entities/keywords'
import { schema as shopSchema, getShopById } from './entities/shops'

const initState = {
  inputText: '',
  popularKeywords: {
    isFetching: false,
    ids: []
  },
  /**
   * relatedKeywords结构
   * {
   *     'keywordid': {
   *          isFetching,
   *          ids
   *      }
   * }
   */
  relatedKeywords: {},
  historyKeywords: [],
  /**
   * searchResult结构
   * {
   *    isFetching,
   *    ids
   * }
   */
  relatedShops: {
    isFetching: false,
    ids: []
  },
}

const types = {
  // 热门搜索关键词
  FETCH_POPULAR_KEYWORDS_REQUEST: 'SEARCH/FETCH_POPULAR_KEYWORDS_REQUEST',
  FETCH_POPULAR_KEYWORDS_SUCCESS: 'SEARCH/FETCH_POPULAR_KEYWORDS_SUCCESS',
  FETCH_POPULAR_KEYWORDS_FAILED: 'SEARCH/FETCH_POPULAR_KEYWORDS_FAILED',
  // 相关关键词
  FETCH_RELATED_KEYWORDS_REQUEST: 'SEARCH/FETCH_RELATED_KEYWORDS_REQUEST',
  FETCH_RELATED_KEYWORDS_SUCCESS: 'SEARCH/FETCH_RELATED_KEYWORDS_SUCCESS',
  FETCH_RELATED_KEYWORDS_FAILED: 'SEARCH/FETCH_RELATED_KEYWORDS_FAILED',
  // 输入关键词
  SET_INPUT_TEXT: 'SEARCH/SET_INPUT_TEXT',
  CLEAR_INPUT_TEXT: 'SEARCH/CLEAR_INPUT_TEXT',
  // 历史记录
  ADD_HISTORY_KEYWORD: 'SEARCH/ADD_HISTORY_KEYWORD',
  CLEAR_HISTORY_KEYWORDS: 'SEARCH/CLEAR_HISTORY_KEYWORDS',
  // 搜索结果shop
  FETCH_RELATED_SHOPS_REQUEST: 'SEARCH/FETCH_RELATED_SHOPS_REQUEST',
  FETCH_RELATED_SHOPS_SUCCESS: 'SEARCH/FETCH_RELATED_SHOPS_SUCCESS',
  FETCH_RELATED_SHOPS_FAILED: 'SEARCH/FETCH_RELATED_SHOPS_FAILED'
}

const fetchePopularKeywordsTypes = endpoint => ({
  [FETCH_DATA]: {
    types: [
      types.FETCH_POPULAR_KEYWORDS_REQUEST,
      types.FETCH_POPULAR_KEYWORDS_SUCCESS,
      types.FETCH_POPULAR_KEYWORDS_FAILED
    ],
    schema: keywordSchema,
    endpoint
  }
})

const fetcheRelatedKeywordsTypes = (endpoint, text ) => ({
  [FETCH_DATA]: {
    types: [
      types.FETCH_RELATED_KEYWORDS_REQUEST,
      types.FETCH_RELATED_KEYWORDS_SUCCESS,
      types.FETCH_RELATED_KEYWORDS_FAILED
    ],
    schema: keywordSchema,
    endpoint
  },
  text
})

const clearHistoryKeywordType = () => ({
  type: types.CLEAR_HISTORY_KEYWORDS
})

const fetchRelatedShopsType = (endpoint, keyword) => ({
  [FETCH_DATA]: {
    endpoint,
    schema: shopSchema,
    types: [
      types.FETCH_RELATED_SHOPS_REQUEST,
      types.FETCH_RELATED_SHOPS_SUCCESS,
      types.FETCH_RELATED_SHOPS_FAILED
    ]
  },
  text: keyword
})

export const actions = {
  fetchePopularKeywords: () => {
    return (dispatch, getState) => {
      const { ids } = getState().search.popularKeywords

      if (ids.length !== 0) {
        return null
      }

      const endpoint = URL.getPopularKeywords()
      return dispatch(fetchePopularKeywordsTypes(endpoint))
    }
  },
  fetcheRelatedKeywords: text => {
    return (dispatch, getState) => {
      const { relatedKeywords } = getState().search
      if (relatedKeywords[text]) {
        return null
      }

      const endpoint = URL.getRelatedKeywords(text)
      return dispatch(fetcheRelatedKeywordsTypes(endpoint, text))
    }
  },
  setInputText: text => ({
    type: types.SET_INPUT_TEXT,
    text
  }),
  clearInputText: () => ({
    type: types.CLEAR_INPUT_TEXT
  }),
  addHistoryKeyword: id => ({
    type: types.ADD_HISTORY_KEYWORD,
    id
  }),
  clearHistoryKeywords: () => {
    return (dispatch, getState) => {
      const { historyKeywords } = getState().search
      if (historyKeywords.length === 0) {
        return null
      }

      return dispatch(clearHistoryKeywordType())
    }
  },
  fetchRelatedShops: (keyword) => {
    return (dispatch) => {
      const endpoint = URL.getRelatedShops(keyword)
      dispatch(fetchRelatedShopsType(endpoint, keyword))
    }
  }
}

// reducer
const popularKeywords = (state = initState.popularKeywords, action) => {
  switch (action.type) {
    case types.FETCH_POPULAR_KEYWORDS_REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case types.FETCH_POPULAR_KEYWORDS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        ids: state.ids.concat(action.response.ids)
      }
    case types.FETCH_POPULAR_KEYWORDS_FAILED:
      return {
        ...state,
        isFetching: false
      }
    default:
      return state
  }
}

const relatedKeywordsByText = (state = { isFetching: false, ids: [] }, action) => {
  switch (action.type) {
    case types.FETCH_RELATED_KEYWORDS_REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case types.FETCH_RELATED_KEYWORDS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        ids: state.ids.concat(action.response.ids)
      }
    case types.FETCH_RELATED_KEYWORDS_FAILED:
      return {
        ...state,
        isFetching: false
      }
    default:
      return state
  }
}

const relatedKeywords = (state = initState.relatedKeywords, action) => {
  switch (action.type) {
    case types.FETCH_RELATED_KEYWORDS_REQUEST:
    case types.FETCH_RELATED_KEYWORDS_SUCCESS:
    case types.FETCH_RELATED_KEYWORDS_FAILED:
      return {
        ...state,
        [action.text]: relatedKeywordsByText(state[action.text], action)
      }
    default:
      return state
  }
}

const inputText = (state = initState.inputText, action) => {
  switch (action.type) {
    case types.SET_INPUT_TEXT:
      return action.text
    case types.CLEAR_INPUT_TEXT:
      return ''
    default:
      return state
  }
}

const historyKeywords = (state = initState.historyKeywords, action) => {
  switch (action.type) {
    case types.ADD_HISTORY_KEYWORD:
      const { id } = action
      const data = state.filter(item => item !== id)
      return [id, ...data]
    case types.CLEAR_HISTORY_KEYWORDS:
      return []
    default:
      return state
  }
}

const relatedShops = (state = initState.relatedShops, action) => {
  switch (action.type) {
    case types.FETCH_RELATED_SHOPS_REQUEST:
      return { ...state, isFetching: true }
    case types.FETCH_RELATED_SHOPS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        ids: [...action.response.ids]
      }
    case types.FETCH_RELATED_SHOPS_FAILED:
      return { ...state, isFetching: false }
    default:
      return state
  }
}

const reduer = combineReducers({
  popularKeywords,
  relatedKeywords,
  inputText,
  historyKeywords,
  relatedShops
})

export default reduer

// selector
export const getPopularKeywords = state => {
  return state.search.popularKeywords.ids.map(id => getKeywordById(state, id))
}
export const getRelatedKeywords = state => {
  const { inputText } = state.search

  if (inputText.length === 0) {
    return []
  }

  const keywords = state.search.relatedKeywords[inputText]

  if (keywords) {
    return keywords.ids.map(id => getKeywordById(state, id))
  } else {
    return []
  }
}
export const getInputText = state => state.search.inputText
export const getHistoryKeywords = state => {
  const { historyKeywords } = state.search

  return historyKeywords.map(id => getKeywordById(state, id))
}
export const getRelatedShops = (state) => (state.search.relatedShops.ids.map(id => getShopById(state, id)))
