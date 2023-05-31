// 工具方法

const fs = require('fs')
const path = require('path')
// 图片宽高 模块
const imagesize = require('image-size')

exports.expString = (data) => {
  if(typeof data === String) {
    return data
  } else if(data instanceof Array) {
    return data.toString()
  } else if(data instanceof Object) {
    return JSON.stringify(data).toString()
  } else if(data === '' || data === null || data === undefined) {
    return 'null&&nudefined'
  } else {
    return data.toString()
  }
}
// width:${width}; height:${height};
exports.static = (filepath, response) => {
  console.log(filepath, fs.existsSync(filepath));
  if(fs.existsSync(filepath)) {
    const { width, height } = imagesize(filepath)
    let style = 'width:400px;'
    if(width <= height) { style = 'height:400px' }
    const images = fs.readFileSync(filepath, 'base64')
    const ext = path.extname(filepath).slice(1)
    const res = `<img style="${style}" src="data:image/${ext};base64,${images}">`
    response.setHeader('Content-Type', 'text/html; charset=utf-8')
    response.end(res)
    return true
  }
}
