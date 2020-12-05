const initState = {
  error: false
}

export const types = {
  CLEAR_ERROR: 'APP/CLEAR_ERROR'
}

export const actions = {
  clearError: () => ({ type: types.CLEAR_ERROR })
}

const reducer = (state = initState, action) => {
  const { type, error } = action

  if (type === types.CLEAR_ERROR) {
    return { ...state, error: false }
  } else if (error) {
    return { ...state, error }
  }

  return state
}

export default reducer

// selector
export const getError = state => state.app.error
