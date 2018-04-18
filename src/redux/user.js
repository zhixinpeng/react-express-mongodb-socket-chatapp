import axios from 'axios'
import { getRedirectPath } from '../utils'

const AUTH_SUCCESS = 'AUTH_SUCCESS'
const ERROR_MESSAGE = 'ERROR_MESSAGE'
const LOAD_USER_INFO = 'LOAD_USER_INFO'
const LOGOUT = 'LOGOUT'

const initState = {
  redirectTo: '',
  message: '',
  user: '',
  type: ''
}

// reducer
export function user(state = initState, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {
        ...state,
        redirectTo: getRedirectPath(action.data),
        message: '',
        ...action.data
      }
    case LOAD_USER_INFO:
      return {
        ...state,
        ...action.data
      }
    case ERROR_MESSAGE:
      return { ...state, message: action.message, isAuth: false }
    case LOGOUT:
      return { ...initState, redirectTo: '/login' }
    default:
      return state
  }
}

// actions creater
function sendErrorMessage(message) {
  return { type: ERROR_MESSAGE, message }
}

function authSuccess(data) {
  return { type: AUTH_SUCCESS, data }
}

export function loadUserInfo(data) {
  return { type: LOAD_USER_INFO, data }
}

export function logout() {
  return { type: LOGOUT }
}

export function login({ user, password }) {
  if (!user || !password) {
    return sendErrorMessage('用户密码必须输入')
  }
  return dispatch => {
    axios.post('user/login', { user, password }).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch(authSuccess(res.data.data))
      } else {
        dispatch(sendErrorMessage(res.data.message))
      }
    })
  }
}

export function register(data) {
  const { user, password, repeatPassword, type } = data
  if (!user || !password || !type) {
    return sendErrorMessage('用户名密码必须输入')
  }
  if (password !== repeatPassword) {
    return sendErrorMessage('密码和确认密码不同')
  }
  return dispatch => {
    axios.post('user/register', { user, password, type }).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch(authSuccess({ user, password, type }))
      } else {
        dispatch(sendErrorMessage(res.data.message))
      }
    })
  }
}

export function update(data) {
  return dispatch => {
    axios.post('/user/update', data).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch(authSuccess(res.data.data))
      } else {
        dispatch(sendErrorMessage(res.data.message))
      }
    })
  }
}
