import React from 'react'
import Logo from '../../component/logo'
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile'
import { connect } from 'react-redux'
import { login } from '../../redux/user'
import { Redirect } from 'react-router-dom'
import HOC from '../../component/HOC'

@connect(state => state.user, { login })
@HOC
class Login extends React.Component {
  constructor(props) {
    super(props)
    this.register = this.register.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
  }

  handleLogin() {
    this.props.login(this.props.state)
  }

  register() {
    this.props.history.push('/register')
  }

  render() {
    return (
      <div>
        {this.props.redirectTo && this.props.redirectTo !== '/login' ? (
          <Redirect to={this.props.redirectTo} />
        ) : null}
        <Logo />
        <WingBlank>
          <List>
            {this.props.message ? (
              <p className="error-message">{this.props.message}</p>
            ) : null}
            <InputItem onChange={val => this.props.handleChange('user', val)}>
              用户
            </InputItem>
            <InputItem
              type="password"
              onChange={val => this.props.handleChange('password', val)}
            >
              密码
            </InputItem>
          </List>
          <WhiteSpace />
          <Button onClick={this.handleLogin} type="primary">
            登录
          </Button>
          <WhiteSpace />
          <Button onClick={this.register} type="primary">
            注册
          </Button>
        </WingBlank>
      </div>
    )
  }
}

export default Login
