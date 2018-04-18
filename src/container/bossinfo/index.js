import React from 'react'
import { NavBar, InputItem, TextareaItem, Button } from 'antd-mobile'
import AvatarSelector from '../../component/avatarSelector'
import { connect } from 'react-redux'
import { update } from '../../redux/user'
import { Redirect } from 'react-router-dom'

@connect(state => state.user, { update })
class BossInfo extends React.Component {
  state = {
    title: '',
    company: '',
    money: '',
    desc: ''
  }

  constructor(props) {
    super(props)
    this.selectAvatar = this.selectAvatar.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  onChange(key, val) {
    this.setState({ [key]: val })
  }

  selectAvatar(name) {
    this.setState({
      avatar: name
    })
  }

  handleSubmit() {
    this.props.update(this.state)
  }

  render() {
    const path = this.props.location.pathname
    const redirect = this.props.redirectTo
    return (
      <div>
        {redirect && redirect !== path ? (
          <Redirect to={this.props.redirectTo} />
        ) : null}
        <NavBar mode="dark">Boss完善信息页</NavBar>
        <AvatarSelector selectAvatar={this.selectAvatar} />
        <InputItem onChange={val => this.onChange('title', val)}>
          招聘职位
        </InputItem>
        <InputItem onChange={val => this.onChange('company', val)}>
          公司名称
        </InputItem>
        <InputItem onChange={val => this.onChange('money', val)}>
          职位薪资
        </InputItem>
        <TextareaItem
          onChange={val => this.onChange('desc', val)}
          rows={3}
          title="职位要求"
        />
        <Button onClick={this.handleSubmit} type="primary">
          保存
        </Button>
      </div>
    )
  }
}

export default BossInfo
