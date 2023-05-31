// user 用户

const fs = require('fs')

// 获取 用户数据 JSON.parse()解析为对象 读取为字节格式 toString()字符串化
// const user = JSON.parse(fs.readFileSync('resourceFile/user.json').toString())
const user = fs.readFileSync('resourceFile/json/user.json').toString()


module.exports = [
  // 登录
  {
    url: '/login',
    type: 'post',
    response: (path, method, data) => {
      // 处理数据
      return user
    }
  }
]
