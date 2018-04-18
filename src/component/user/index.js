import React from 'react'
import { connect } from 'react-redux'
import { Result, List, WhiteSpace, Modal } from 'antd-mobile'
import Cookies from 'browser-cookies'
import { logout } from '../../redux/user'
import { Redirect } from 'react-router-dom'

@connect(state => state.user, { logout })
class User extends React.Component {
  constructor(props) {
    super(props)
    this.handleLogout = this.handleLogout.bind(this)
  }

  handleLogout() {
    const alert = Modal.alert

    alert('注销', '确认退出登录吗？', [
      { text: '取消', onPress: () => {} },
      {
        text: '确认',
        onPress: () => {
          Cookies.erase('userid')
          this.props.logout()
        }
      }
    ])
  }

  render() {
    const Item = List.Item
    const Brief = Item.Brief

    return this.props.user ? (
      <div>
        <Result
          img={
            <img
              src={require(`../img/${this.props.avatar}.png`)}
              style={{ width: 50 }}
              alt=""
            />
          }
          title={this.props.user}
          message={this.props.type === 'boss' ? this.props.company : null}
        />

        <List renderHeader={() => '简介'}>
          <Item multipleLine>
            {this.props.title}
            {this.props.desc
              .split('\n')
              .map(item => <Brief key={item}>介绍：{item}</Brief>)}
            {this.props.money ? <Brief>薪资：{this.props.money}</Brief> : null}
          </Item>
        </List>
        <WhiteSpace />
        <List>
          <Item onClick={this.handleLogout}>退出登录</Item>
        </List>
      </div>
    ) : this.props.redirectTo ? (
      <Redirect to={this.props.redirectTo} />
    ) : null
  }
}

export default User
