import React from 'react'
import { Grid, List } from 'antd-mobile'
import PropTypes from 'prop-types'

class AvatarSelector extends React.Component {
  static propTypes = {
    selectAvatar: PropTypes.func.isRequired
  }

  state = {}

  render() {
    const avatarList = 'boy,girl,man,woman,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra'
      .split(',')
      .map(val => ({
        icon: require(`../img/${val}.png`),
        text: val
      }))

    const gridHeader = this.state.icon ? (
      <div>
        <span>已选择头像</span>
        <img src={this.state.icon} style={{ width: 20 }} alt="" />
      </div>
    ) : (
      '请选择头像'
    )

    return (
      <div>
        <List renderHeader={() => gridHeader} />
        <Grid
          data={avatarList}
          columnNum={5}
          onClick={avatar => {
            this.setState(avatar)
            this.props.selectAvatar(avatar.text)
          }}
        />
      </div>
    )
  }
}

export default AvatarSelector
