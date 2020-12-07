import { get } from '../../utils/request'

// 需要经过中间件处理的标识
export const FETCH_DATA = 'FETCH DATA'

function normalizeData (data, schema) {
  const { id, name } = schema
  let obj = {}
  let ids = []

  if (Array.isArray(data)) {
    data.forEach(item => {
      const dataId = item[id]
      obj[dataId] = item
      ids.push(dataId)
    })
  } else {
    const dataId = data[id]
    obj[dataId] = data
    ids.push(dataId)
  }

  return {
    [name]: obj,
    ids
  }
}

function fetchData (url, schema) {
  return get(url).then(response => {
    const { data, success } = response
    if (success) {
      const { list } = data
      const result = list && Array.isArray(list) ? list : data
      return normalizeData(result, schema)
    } else {
      return response
    }
  })
}

const middleware = store => next => action => {
  const allAPI = action[FETCH_DATA]
  if (typeof allAPI === 'undefined') {
    return next(action)
  }

  const { endpoint, schema, types } = allAPI

  if (typeof endpoint !== 'string') {
    throw new Error('endpoint必须为字符串类型URL')
  }

  if (!schema) {
    throw new Error('schema必须')
  }

  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('需要指定一个包含3个action type的数组')
  }

  if (types.some(item => typeof item !== 'string')) {
    throw new Error('action的type必须为字符串类型')
  }

  const actionWith = data => {
    const finalAction = { ...action, ...data }
    delete finalAction[FETCH_DATA]
    return finalAction
  }

  const [requestType, successType, failedType] = types
  next(actionWith({
    type: requestType
  }))
  return fetchData(endpoint, schema).then(
    response => next(actionWith({
      type: successType,
      response
    })),
    error => next(actionWith({
      type: failedType,
      error: error.message || '未知错误'
    }))
  )
}

export default middleware