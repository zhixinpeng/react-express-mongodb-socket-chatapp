const express = require('express')
const utils = require('utility')

const Router = express.Router()
const model = require('./model')
const User = model.getModel('user')
const Chat = model.getModel('chat')

const _Filter = { password: 0, __v: 0 }

// 获取用户列表
Router.get('/list', function(req, res) {
  const { type } = req.query
  User.find({ type }, _Filter, function(err, doc) {
    return res.json({ code: 0, data: doc })
  })
})

// 登录
Router.post('/login', function(req, res) {
  const { user, password } = req.body
  User.findOne({ user, password: md5Password(password) }, function(err, doc) {
    if (!doc) {
      return res.json({ code: 1, message: '用户名或者密码错误' })
    }
    const { password, __v, _id, ...data } = doc._doc
    res.cookie('userid', _id)
    return res.json({ code: 0, data: data })
  })
})

// 注册
Router.post('/register', function(req, res) {
  const { user, password, type } = req.body
  User.findOne({ user: user }, function(err, doc) {
    if (doc) {
      return res.json({ code: 1, message: '用户名重复' })
    }

    const usreModel = new User({ user, type, password: md5Password(password) })
    usreModel.save(function(err, doc) {
      if (err) {
        return res.json({ code: 1, message: '后端出错了' })
      }
      const { user, type, _id } = doc
      res.cookie('userid', _id)
      return res.json({ code: 0, data: { user, type } })
    })
  })
})

// 获取用户信息
Router.get('/info', function(req, res) {
  const { userid } = req.cookies
  if (!userid) {
    return res.json({ code: 1 })
  }
  User.findOne({ _id: userid }, _Filter, function(err, doc) {
    if (err) {
      return res.json({ code: 1, message: '后端出错了' })
    }
    if (doc) {
      return res.json({ code: 0, data: doc })
    }
  })
})

// 更新用户信息
Router.post('/update', function(req, res) {
  const userid = req.cookies.userid
  if (!userid) {
    return res.json.dumps({ code: 1 })
  }
  const body = req.body
  User.findByIdAndUpdate(userid, body, function(err, doc) {
    const data = Object.assign(
      {},
      {
        user: doc.user,
        type: doc.type
      },
      body
    )
    return res.json({ code: 0, data })
  })
})

// 密码加严
function md5Password(password) {
  const salt = 'Angus'
  return utils.md5(salt + password)
}

// Chat.remove({}, function() {})

// 获取用户聊天信息列表
Router.get('/getMessageList', function(req, res) {
  const user = req.cookies.userid
  User.find({}, function(err, userDoc) {
    let users = {}
    userDoc.forEach(v => {
      users[v._id] = { name: v.user, avatar: v.avatar }
    })
    Chat.find({ $or: [{ from: user }, { to: user }] }, function(err, doc) {
      if (!err) {
        return res.json({ code: 0, messages: doc, users })
      }
    })
  })
})

// 用户读取聊天信息
Router.post('/readMessage', function(req, res) {
  const userid = req.cookies.userid
  const { from } = req.body
  Chat.update(
    { from, to: userid },
    { $set: { read: true } },
    { multi: true },
    function(err, doc) {
      if (!err) {
        return res.json({ code: 0, number: doc.nModified })
      }
      return res.json({ code: 1, message: '修改失败' })
    }
  )
})

module.exports = Router
