import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { loadUserInfo } from '../../redux/user'

@withRouter
@connect(null, { loadUserInfo })
class AuthRoute extends React.Component {
  componentDidMount() {
    // 登录注册页不用获取用户信息
    const publicList = ['/login', '/register']
    const pathname = this.props.location.pathname
    if (publicList.indexOf(pathname) > -1) {
      return
    }
    this.getUserInfo()
  }

  // 获取用户信息
  getUserInfo() {
    axios.get('/user/info').then(res => {
      if (res.status === 200) {
        if (res.data.code === 0) {
          this.props.loadUserInfo(res.data.data)
        } else {
          this.props.history.push('/login')
        }
      }
    })
  }

  render() {
    return null
  }
}

export default AuthRoute
