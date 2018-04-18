const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const model = require('./model')
const Chat = model.getModel('chat')

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

app.listen(9093, function() {
  console.log(' Node app start at port 9093')
})
