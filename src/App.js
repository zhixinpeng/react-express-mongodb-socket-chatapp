import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Login from './container/login'
import Register from './container/register'
import AuthRoute from './component/authRoute'
import BossInfo from './container/bossinfo'
import GeniusInfo from './container/geniusinfo'
import DashBoard from './component/dashboard'
import Chat from './component/chat'

class App extends React.Component {
  render() {
    return (
      <div>
        <AuthRoute />
        <Switch>
          <Route path="/bossinfo" component={BossInfo} />
          <Route path="/geniusinfo" component={GeniusInfo} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/chat/:user" component={Chat} />
          <Route component={DashBoard} />
        </Switch>
      </div>
    )
  }
}

export default App
