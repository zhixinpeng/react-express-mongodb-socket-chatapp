import React from 'react'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router-dom'
import { renderToString } from 'react-dom/server'
import reducers from '../src/reducer'
import staticPath from '../build/asset-manifest.json'

import csshook from 'css-modules-require-hook/preset'
import assethook from 'asset-require-hook'

assethook({
  extensions: ['png']
})

import App from '../src/App'
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const model = require('./model')
const Chat = model.getModel('chat')
const path = require('path')

// 新建app
const app = express()

// socket.io work with express
const server = require('http').Server(app)

const io = require('socket.io')(server)

io.listen(9527)

io.on('connection', function(socket) {
  socket.on('sendMessage', function(data) {
    const { from, to, message } = data
    const chatid = [from, to].sort().join('_')
    Chat.create({ chatid, from, to, content: message }, function(err, doc) {
      io.emit('receiveMessage', Object.assign({}, doc._doc))
    })
  })
})

const userRouter = require('./user')

app.use(bodyParser())
app.use(cookieParser())

app.use('/user', userRouter)

// 中间件
app.use(function(req, res, next) {
  if (req.url.startsWith('/user') || req.url.startsWith('/static')) {
    return next()
  }

  let context = {}
  const store = createStore(reducers, applyMiddleware(thunk))
  const markup = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={context}>
        <App />
      </StaticRouter>
    </Provider>
  )

  const pageHtml = `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="keyword" content="React,Redux,Chat,SSR">
      <meta name="author" content="Angus">
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
      <meta name="theme-color" content="#000000">
      <link rel="manifest" href="%PUBLIC_URL%/manifest.json">
      <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
      <title>React App</title>
      <link rel="stylesheet" href="/${staticPath['main.css']}"></link>
    </head>
    <body>
      <noscript>
        You need to enable JavaScript to run this app.
      </noscript>
      <div id="root">${markup}</div>
      <script type="text/javascript" src="/${staticPath['main.js']}"></script>
    </body>
  </html>`

  return res.send(pageHtml)
  // return res.sendFile(path.resolve('build/index.html'))
})

// 设置静态资源库的地址
app.use('/', express.static(path.resolve('build')))

app.listen(9093, function() {
  console.log(' Node app start at port 9093')
})
