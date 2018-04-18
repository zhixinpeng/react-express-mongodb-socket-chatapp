import React from 'react'
import { connect } from 'react-redux'
import { NavBar } from 'antd-mobile'
import { Switch, Route } from 'react-router-dom'
import Boss from '../boss'
import Genius from '../genius'
import NavLinkBar from '../navLinkBar'
import User from '../user'
import Message from '../message'
import { getMessageList, receiveMessage } from '../../redux/chat'

@connect(state => state, { getMessageList, receiveMessage })
class DashBoard extends React.Component {
  componentDidMount() {
    if (!this.props.chat.chatMessage.length) {
      this.props.getMessageList()
      this.props.receiveMessage()
    }
  }

  render() {
    const { pathname } = this.props.location
    const navList = [
      {
        path: '/boss',
        text: '牛人',
        icon: 'boss',
        title: '牛人列表',
        component: Boss,
        hide: this.props.user.type === 'genius'
      },
      {
        path: '/genius',
        text: 'boss',
        icon: 'job',
        title: 'BOSS列表',
        component: Genius,
        hide: this.props.user.type === 'boss'
      },
      {
        path: '/message',
        text: '消息',
        icon: 'message',
        title: '消息列表',
        component: Message
      },
      {
        path: '/me',
        text: '我',
        icon: 'user',
        title: '个人中心',
        component: User
      }
    ]
    return (
      <div>
        <NavBar className="fixd-header" mode="dark">
          {pathname !== '/' &&
            navList.find(item => item.path === pathname).title}
        </NavBar>
        <div style={{ marginTop: 45 }}>
          <Switch>
            {navList.map(item => (
              <Route
                key={item.path}
                path={item.path}
                component={item.component}
              />
            ))}
          </Switch>
        </div>
        <NavLinkBar data={navList} />
      </div>
    )
  }
}

export default DashBoard
