export const schema = {
  name: 'comments',
  id: 'id'
}

const types = {
  ADD_COMMENT: 'COMMENT/ADD_COMMENT'
}

export const actions = {
  addComment: comment => ({ type: types.ADD_COMMENT, comment })
}

const reducer = (state = {}, action) => {
  switch (action.type) {
    case types.ADD_COMMENT:
      const id = schema.id
      const { comment } = action
      return {
        ...state,
        [comment[id]]: comment
      }
    default:
      return state
  }
}

export default reducer
