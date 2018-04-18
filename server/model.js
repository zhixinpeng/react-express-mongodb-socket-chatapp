const mongoose = require('mongoose')

// 连接mongo，并且使用react这个集合
const DB_URL = 'mongodb://127.0.0.1:27017/react-chat-app'
mongoose.connect(DB_URL)

const models = {
  user: {
    user: { type: String, require: true },
    password: { type: String, require: true },
    type: { type: String, require: true },
    avatar: { type: String },
    desc: { type: String },
    title: { type: String },
    company: { type: String },
    money: { type: String }
  },
  chat: {
    chatid: { type: String, require: true },
    from: { type: String, require: true },
    to: { type: String, require: true },
    read: { type: Boolean, default: false },
    content: { type: String, require: true, default: '' },
    create_time: { type: Number, default: Date.now() }
  }
}

for (let key in models) {
  mongoose.model(key, new mongoose.Schema(models[key]))
}

module.exports = {
  getModel: function(name) {
    return mongoose.model(name)
  }
}
