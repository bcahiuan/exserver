// icon 图标

const fs = require('fs')

const icon = fs.readFileSync('resourceFile/icon/favicon.ico')

module.exports = [
  // 登录
  {
    url: '/favicon.ico',
    type: 'get',
    response: (path, method, data) => {
      // 处理数据
      return icon
    }
  }
]
