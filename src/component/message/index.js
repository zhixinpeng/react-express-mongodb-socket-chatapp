import React from 'react'
import { connect } from 'react-redux'
import { List, Badge } from 'antd-mobile'

@connect(state => state)
class Message extends React.Component {
  getLast(arr) {
    return arr[arr.length - 1]
  }

  render() {
    const Item = List.Item
    const Brief = Item.Brief
    const userid = this.props.user._id
    const users = this.props.chat.users

    const messageGroup = {}
    this.props.chat.chatMessage.forEach(v => {
      messageGroup[v.chatid] = messageGroup[v.chatid] || []
      messageGroup[v.chatid].push(v)
    })

    const chatList = Object.values(messageGroup).sort((a, b) => {
      const a_last = this.getLast(a).create_time
      const b_last = this.getLast(b).create_time
      return b_last - a_last
    })

    return (
      <div>
        {chatList.map(v => {
          const lastItem = this.getLast(v)
          const targetId = v[0].from === userid ? v[0].to : v[0].from
          const unReadNumber = v.filter(
            item => !item.read && item.to === userid
          ).length

          if (!users[targetId]) {
            return null
          }

          return (
            <List key={lastItem._id}>
              <Item
                extra={<Badge text={unReadNumber} />}
                thumb={require(`../img/${users[targetId].avatar}.png`)}
                arrow="horizontal"
                onClick={() => {
                  this.props.history.push(`/chat/${targetId}`)
                }}
              >
                {lastItem.content}
                <Brief>{users[targetId].name}</Brief>
              </Item>
            </List>
          )
        })}
      </div>
    )
  }
}

export default Message
