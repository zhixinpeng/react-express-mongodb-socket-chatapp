import React from 'react'
import PropTypes from 'prop-types'
import { Card, WhiteSpace, WingBlank } from 'antd-mobile'
import { withRouter } from 'react-router-dom'

@withRouter
class UserCard extends React.Component {
  static propTypes = {
    userlist: PropTypes.array.isRequired
  }

  handleClick(item) {
    this.props.history.push(`/chat/${item._id}`)
  }

  render() {
    return (
      <WingBlank>
        <WhiteSpace />
        {this.props.userlist.map(
          item =>
            item.avatar ? (
              <div key={item.user} onClick={() => this.handleClick(item)}>
                <Card>
                  <Card.Header
                    title={item.user}
                    thumb={require(`../img/${item.avatar}.png`)}
                    extra={<span>{item.title}</span>}
                  />
                  <Card.Body>
                    {item.type === 'boss' ? (
                      <div>公司：{item.company}</div>
                    ) : null}
                    {item.type === 'boss' ? (
                      <div>薪资：{item.money}</div>
                    ) : null}
                    <WhiteSpace />
                    {item.desc
                      .split('/n')
                      .map(d => <div key={d}>介绍：{d}</div>)}
                  </Card.Body>
                </Card>
                <WhiteSpace />
              </div>
            ) : null
        )}
      </WingBlank>
    )
  }
}

export default UserCard
