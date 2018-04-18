import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { register } from '../../redux/user'
import Logo from '../../component/logo'
import {
  List,
  InputItem,
  Radio,
  WingBlank,
  WhiteSpace,
  Button
} from 'antd-mobile'
import HOC from '../../component/HOC'

@connect(state => state.user, { register })
@HOC
class Register extends React.Component {
  constructor(props) {
    super(props)
    this.handleRegister = this.handleRegister.bind(this)
  }

  componentDidMount() {
    this.props.handleChange('type', 'genius')
  }

  handleRegister() {
    this.props.register(this.props.state)
  }

  render() {
    const RadioItem = Radio.RadioItem
    return (
      <div>
        {this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null}
        <Logo />
        <WingBlank>
          <List>
            {this.props.message ? (
              <p className="error-message">{this.props.message}</p>
            ) : null}
            <InputItem onChange={val => this.props.handleChange('user', val)}>
              用户名
            </InputItem>
            <InputItem
              type="password"
              onChange={val => this.props.handleChange('password', val)}
            >
              密码
            </InputItem>
            <InputItem
              type="password"
              onChange={val => this.props.handleChange('repeatPassword', val)}
            >
              确认密码
            </InputItem>
          </List>
          <WhiteSpace />
          <RadioItem
            checked={this.props.state.type === 'genius'}
            onClick={() => this.props.handleChange('type', 'genius')}
          >
            牛人
          </RadioItem>
          <RadioItem
            checked={this.props.state.type === 'boss'}
            onClick={() => this.props.handleChange('type', 'boss')}
          >
            BOSS
          </RadioItem>
          <WhiteSpace />
          <Button type="primary" onClick={this.handleRegister}>
            注册
          </Button>
        </WingBlank>
      </div>
    )
  }
}

export default Register
