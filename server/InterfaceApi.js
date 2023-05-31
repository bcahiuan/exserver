// Interface document 接口文档

const user = require('./api/user')
const image = require('./api/image')
const icon = require('./api/icon')

module.exports = [
  ...icon,
  ...user,
  ...image
]
