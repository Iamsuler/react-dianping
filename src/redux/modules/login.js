const initState = {
  isFetching: false,
  status:  sessionStorage.getItem('status') || false,
}

const types = {
  LOGIN_REQUEST: 'LOGIN/LOGIN_REQUEST',
  LOGIN_SUCCESS: 'LOGIN/LOGIN_SUCCESS',
  LOGIN_FAILED: 'LOGIN/LOGIN_FAILED',
  LOGOUT_REQUEST: 'LOGIN/LOGOUT_REQUEST',
  LOGOUT_SUCCESS: 'LOGIN/LOGOUT_SUCCESS',
  LOGOUT_FAILED: 'LOGIN/LOGOUT_FAILED',
  SET_USERNAME: 'LOGIN/SET_USERNAME',
  SET_PASSWORD: 'LOGIN/SET_PASSWORD'
}

const loginFailedType = error => ({
  type: types.LOGIN_FAILED,
  error
})
const loginRequestType = () => ({
  type: types.LOGIN_REQUEST
})
const loginSuccessType = () => ({
  type: types.LOGIN_SUCCESS
})

// const logoutFailedType = error => ({
//   type: types.LOGOUT_FAILED,
//   error
// })
const logoutRequestType = () => ({
  type: types.LOGOUT_REQUEST
})
const logoutSuccessType = () => ({
  type: types.LOGOUT_SUCCESS
})

export const actions = {
  login: () => {
    return (dispatch, getState) => {
      dispatch(loginRequestType())
      new Promise((resolve, reject) => {
        setTimeout(() => {
          sessionStorage.setItem('status', true)
          dispatch(loginSuccessType())
          resolve()
        }, 2000)
      })
    }
  },
  logout: () => {
    return (dispatch) => {
      dispatch(logoutRequestType())
      
      new Promise((resolve, reject) => {
        setTimeout(() => {
          sessionStorage.removeItem('username')
          sessionStorage.removeItem('status')
          dispatch(logoutSuccessType())
          resolve()
        }, 2000)
      })
    }
  },
  // setUsername: username => ({ type: types.SET_USERNAME, username }),
  // setPassword: password => ({ type: types.SET_PASSWORD, password })
}

const reducer = (state = initState, action) => {
  switch (action.type) {
    case types.LOGIN_REQUEST:
      return { ...state, isFetching: true }
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        status: true
      }
    case types.LOGIN_FAILED:
      return { ...state, isFetching: false, error: action.error }
    case types.LOGOUT_REQUEST:
      return { ...state, isFetching: false }
    case types.LOGOUT_SUCCESS:
      return { ...state, isFetching: false, status: false }
    case types.LOGOUT_FAILED:
      return { ...state, isFetching: false }
    // case types.SET_USERNAME:
    //   return { ...state, username: action.username }
    // case types.SET_PASSWORD:
    //   return { ...state, password: action.password }
    default:
      return state
  }
}

export default reducer

// selector
// export const getUsername = state => state.login.username
// export const getPassword = state => state.login.password
export const getStatus = state => state.login.status
