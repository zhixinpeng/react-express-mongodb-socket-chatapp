import React from 'react'
import ReactDom from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { AppContainer } from 'react-hot-loader'

import reducers from './reducer'
import './config'
import './index.css'

import Login from './container/login'
import Register from './container/register'
import AuthRoute from './component/authRoute'
import BossInfo from './container/bossinfo'
import GeniusInfo from './container/geniusinfo'
import DashBoard from './component/dashboard'
import Chat from './component/chat'

const store = createStore(
  reducers,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
)

ReactDom.render(
  <Provider store={store}>
    <AppContainer>
      <BrowserRouter>
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
      </BrowserRouter>
    </AppContainer>
  </Provider>,
  document.getElementById('root')
)

if (module.hot) {
  // Enable Webpack hot module replacement for reducers
  module.hot.accept('./reducer', () => {
    const nextRootReducer = require('./reducer')
    store.replaceReducer(nextRootReducer)
  })
}
