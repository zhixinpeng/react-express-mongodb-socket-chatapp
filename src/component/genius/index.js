import React from 'react'
import { connect } from 'react-redux'
import UserCard from '../usercard'
import { getUserList } from '../../redux/chatuser'

@connect(state => state.chatuser, { getUserList })
class Genius extends React.Component {
  componentDidMount() {
    this.props.getUserList('boss')
  }

  render() {
    return <UserCard userlist={this.props.userList} />
  }
}

export default Genius
