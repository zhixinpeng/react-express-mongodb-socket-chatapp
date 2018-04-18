import React from 'react'
import PropTypes from 'prop-types'
import { TabBar } from 'antd-mobile'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

@withRouter
@connect(state => state.chat)
class NavLinkBar extends React.Component {
  static propTypes = {
    data: PropTypes.array.isRequired
  }

  render() {
    const navList = this.props.data.filter(item => !item.hide)
    const { pathname } = this.props.location
    return (
      <div style={{ position: 'fixed', bottom: 0, width: '100%' }}>
        <TabBar>
          {navList.map(item => (
            <TabBar.Item
              key={item.path}
              badge={item.path === '/message' ? this.props.unread : 0}
              title={item.text}
              icon={{ uri: require(`./img/${item.icon}.png`) }}
              selectedIcon={{ uri: require(`./img/${item.icon}-active.png`) }}
              selected={pathname === item.path}
              onPress={() => {
                this.props.history.push(item.path)
              }}
            />
          ))}
        </TabBar>
      </div>
    )
  }
}

export default NavLinkBar
