// setting

module.exports = {

  name: '[user-defined-server]',

  /**
   * @type {Number}
   * @description 端口号
   */
  port: 8081,

  /**
   * @type {String}
   * @description ip地址
   */
  ip: '127.0.0.1',

  /**
   * @type {Array} [css, js]
   * @默认路径 webHtml/(css|js)
   */
  web: ['webHtml/css/', 'webHtml/javascript/'],

  /**
   * @type {Object} String
   * @description 编码格式
   */
  codeType: {
    a: 'utf8'
  },

  /**
   * @type {Number}
   * @description 网页显示图片大小
   */
  webimgsize: '200px',

  /**
   * @type {String}
   * @description 请求响应返回为路径
   */
  reqUrl: '/image/pathshow/'
}
