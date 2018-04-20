import React from 'react'
import { List, InputItem, NavBar, Icon, Grid } from 'antd-mobile'
import { connect } from 'react-redux'
import io from 'socket.io-client'
import QueueAnim from 'rc-queue-anim'
import {
  sendMessage,
  getMessageList,
  receiveMessage,
  readMessage
} from '../../redux/chat'
import { getChatId } from '../../utils'

io('ws://localhost:9527')

@connect(state => state, {
  sendMessage,
  getMessageList,
  receiveMessage,
  readMessage
})
class Chat extends React.Component {
  state = {
    text: '',
    showEmoji: false
  }

  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    if (!this.props.chat.chatMessage.length) {
      this.props.getMessageList()
      this.props.receiveMessage()
    }
  }

  componentWillUnmount = () => {
    const to = this.props.match.params.user
    this.props.readMessage(to)
  }

  fixCarousel() {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'))
    }, 0)
  }

  handleSubmit() {
    const from = this.props.user._id
    const to = this.props.match.params.user
    const message = this.state.text
    this.props.sendMessage({ from, to, message })
    this.setState({ text: '', showEmoji: false })
  }

  render() {
    const emoji = '😀 😃 😄 😁 😆 😅 😂 😊 😇 🙂 🙃 😉 😌 😍 😘 😗 😙 😚 😋 😜 😝 😛 🤑 🤗 🤓 😎 😏 😒 😞 😔 😟 😕 🙁 😣 😖 😫 😩 😤 😠 😡 😶 😐 😑 😯 😦 😧 😮 😲 😵 😳 😱 😨 😰 😢 😥 😭 😓 😪 😴 🙄 🤔 😬 🤐 😷 🤒 🤕 😈 👿 👹 👺 💩 👻 💀 ☠️ 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾 👐 🙌 👏 🙏 👍 👎 👊 ✊ 🤘 👌 👈 👉 👆 👇 ✋  🖐 🖖 👋  💪 🖕 ✍️  💅 🖖 💄 💋 👄 👅 👂 👃 👁 👀 '
      .split(' ')
      .filter(v => v)
      .map(v => ({ text: v }))

    const userid = this.props.match.params.user
    const users = this.props.chat.users
    const chatid = getChatId(userid, this.props.user._id)

    const chatMessages = this.props.chat.chatMessage.filter(
      v => v.chatid === chatid
    )

    if (!users[userid]) return null

    return (
      <div id="chat-page">
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={() => {
            this.props.history.goBack()
          }}
        >
          {users[userid].name}
        </NavBar>
        <QueueAnim delay={100}>
          {chatMessages.map(v => {
            const avatar = require(`../img/${users[v.from].avatar}.png`)
            return v.from === userid ? (
              <List key={v._id}>
                <List.Item thumb={avatar}>{v.content}</List.Item>
              </List>
            ) : (
              <List key={v._id}>
                <List.Item
                  extra={<img src={avatar} alt="" />}
                  className="chat-me"
                >
                  {v.content}
                </List.Item>
              </List>
            )
          })}
        </QueueAnim>
        <div className="stick-footer">
          <List>
            <InputItem
              placeholder="请输入"
              value={this.state.text}
              onChange={v => {
                this.setState({ text: v })
              }}
              extra={
                <div>
                  <span
                    role="img"
                    aria-label="Smile"
                    style={{ marginRight: 15 }}
                    onClick={() => {
                      this.setState({ showEmoji: !this.state.showEmoji })
                      this.fixCarousel()
                    }}
                  >
                    😃
                  </span>
                  <span onClick={this.handleSubmit}>发送</span>
                </div>
              }
            >
              信息
            </InputItem>
          </List>
          {this.state.showEmoji ? (
            <Grid
              data={emoji}
              columnNum={9}
              carouselMaxRow={4}
              isCarousel={true}
              onClick={el => {
                this.setState({
                  text: this.state.text + el.text
                })
              }}
            />
          ) : null}
        </div>
      </div>
    )
  }
}

export default Chat
