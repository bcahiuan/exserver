//

const path = require('path')

const contentType = {
  html: "text/html",
  js: "text/javascript",
  css: "text/css",
  gif: "image/gif",
  jpg: "image/jpeg",
  png: "image/png",
  ico: "image/icon",
  txt: "text/plain",
  json: "application/json",
  default: "application/octet-stream"
}

/**
 * 获取文档的内容类型
 * @param filePath
 * @returns {*}
 */
module.exports = {
  getContentType(filePath) {
    // 获取 文件的扩展名
    let ext = path.extname(filePath)
    if (contentType.hasOwnProperty(ext)) {
      return contentType[ext];
    } else {
      return contentType.default;
    }
  }
}

