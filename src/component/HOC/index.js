import React from 'react'

export default function HOC(Component) {
  return class WrapperComponent extends React.Component {
    state = {}

    constructor(props) {
      super(props)
      this.handleChange = this.handleChange.bind(this)
    }

    handleChange(key, val) {
      this.setState({
        [key]: val
      })
    }

    render() {
      return (
        <Component
          {...this.props}
          handleChange={this.handleChange}
          state={this.state}
        />
      )
    }
  }
}
