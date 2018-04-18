import axios from 'axios'
import io from 'socket.io-client'

const socket = io('ws://localhost:9527')

const MESSAGE_LIST = 'MESSAGE_LIST'
const MESSAGE_RECEIVE = 'MESSAGE_RECEIVE'
const MESSAGE_READ = 'MESSAGE_READ'

const initState = {
  chatMessage: [],
  users: {},
  unread: 0
}

// reducer
export function chat(state = initState, action) {
  switch (action.type) {
    case MESSAGE_LIST:
      return {
        ...state,
        chatMessage: action.data.messages,
        users: action.data.users,
        unread: action.data.messages.filter(
          v => !v.read && v.to === action.data.userid
        ).length
      }
    case MESSAGE_RECEIVE:
      const n = action.data.to === action.userid ? 1 : 0
      return {
        ...state,
        chatMessage: [...state.chatMessage, action.data],
        unread: state.unread + n
      }
    case MESSAGE_READ:
      const { from, number } = action.data
      return {
        ...state,
        chatMessage: state.chatMessage.map(v => ({
          ...v,
          read: from === v.from ? true : v.read
        })),
        unread: state.unread - number
      }
    default:
      return state
  }
}

function messageList(messages, users, userid) {
  return { type: MESSAGE_LIST, data: { messages, users, userid } }
}

function messageReceive(data, userid) {
  return { type: MESSAGE_RECEIVE, data, userid }
}

function messageRead({ from, userid, number }) {
  return { type: MESSAGE_READ, data: { from, userid, number } }
}

// 获取用户聊天信息数据
export function getMessageList() {
  return (dispatch, getState) => {
    axios.get('/user/getMessageList').then(res => {
      if (res.status === 200 && res.data.code === 0) {
        const userid = getState().user._id
        dispatch(messageList(res.data.messages, res.data.users, userid))
      }
    })
  }
}

// 发送聊天信息
export function sendMessage(data) {
  return dispatch => {
    socket.emit('sendMessage', data)
  }
}

// 接受聊天信息
export function receiveMessage() {
  return (dispatch, getState) => {
    socket.on('receiveMessage', function(data) {
      const userid = getState().user._id
      dispatch(messageReceive(data, userid))
    })
  }
}

// 已读聊天信息
export function readMessage(from) {
  return (dispatch, getState) => {
    axios.post('/user/readMessage', { from }).then(res => {
      const userid = getState().user._id
      if (res.status === 200 && res.data.code === 0) {
        dispatch(messageRead({ userid, from, number: res.data.number }))
      }
    })
  }
}
