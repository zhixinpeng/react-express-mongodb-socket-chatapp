import axios from 'axios'

const GET_USER_LIST = 'GET_USER_LIST'

const initState = {
  userList: []
}

// action creater
function userList(data) {
  return { type: GET_USER_LIST, data }
}

// reducer
export function chatuser(state = initState, action) {
  switch (action.type) {
    case GET_USER_LIST:
      return { ...state, userList: action.data }

    default:
      return state
  }
}

// action
export function getUserList(type) {
  return dispatch => {
    axios.get(`/user/list?type=${type}`).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch(userList(res.data.data))
      }
    })
  }
}
