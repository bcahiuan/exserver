// server

// -----------------------------------------模块-------------------------------------------//
// 导入 http 模块
const http = require('http')
// fs 文件系统模块
const fs = require('fs')
// 导入 url 路径模块
const urls = require('url')
// 导入 path
const path = require('path')

// 导入 配置 信息
const {
  name, port, ip,
  web, codeType
} = require('./setting')
const { a } = codeType
// console color 控制台输出颜色
const {
  bgGreen, bgYellow, bgCyan, bgRed,
  magenta, blue, green
} = require('./utils/consoleColor')
// 工具方法
const utils = require('./utils/index')

// api 模块
const apiUrl = require('./InterfaceApi.js')

// 开始计时
console.time(name)
// -----------------------------------------实例-------------------------------------------//
// 创建 服务器 实例
const server = http.createServer((require, response) => {
  // 访问控制允许 [ 来源, 方法, 头信息 ]  "*": 全部允许 (解决跨域)
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Methods", "*");
  response.setHeader("Access-Control-Allow-Headers", "*");
// -----------------------------------------获取-------------------------------------------//
  // 获取 请求 方法 类型
  const method = require.method
  // 解析url参数 获取{ 路径, 查询 }参数
  const { pathname, query } = urls.parse(require.url, true)
  const paths = pathname.split('/')

  const filepath = "resourceFile" + pathname
  const exist = utils.static(filepath, response)
  if(exist) return

  // 存储 匹配的路径
  let apiItem = null
  const content = '404 Not Found'
  // 遍历 api接口 路径
  apiUrl.forEach(item => {
    // 判断 接口中 是否有此路径
    if(item.url === pathname) { apiItem = item }
  })
// -----------------------------------------首页-------------------------------------------//
  // 判断请求路径 响应不同信息
  if(pathname === '/' || pathname === '/index.html') {
    // 默认 响应
    // 读取 index.html 文件 [ 异步 ]
    fs.readFile('webHtml/index.html', a, (err, data) => {
      // 出现错误 抛出错误
      if(err) throw err
      var indexCss = '', indexJs = ''
      // 遍历 获取文件数据
      let indexHtml
      for(let w of web) {
        fs.readdir(w, (err, wdata) => {
          if(err) throw err
          wdata.forEach((item) => {
            const itemData = fs.readFileSync(`${w + item}`, a)
            if(w === web[0]) { indexCss += itemData }
            else { indexJs += itemData }
          })
          // 拼接 字符串
          const styleCss = `<style> ${indexCss} </style>`
          const javascript = `<script> ${indexJs} </script>`
          indexHtml = styleCss + data + javascript
          // 响应 返回数据
          console.log(bgCyan('访问主页!'))
          response.end(indexHtml)
        })
      }
    })
  }
// -----------------------------------------请求-------------------------------------------//
  else if(apiItem !== null) {
    // 判断 请求类型
    if(method === 'GET' || method === 'DELETE' || method === 'OPTIONS') {
      // 调用方法
      subReqRes(pathname, method, query)
    } else if(method === 'POST' || method === 'PUT') {
      let body = ''
      // 取出 传入 数据
      require.on('data', data => body += data)
      require.on('end', () => {
        // 调用方法
        subReqRes(pathname, method, body)
      })
    }
  }
// -----------------------------------------默认-------------------------------------------//
  // 路径不匹配 响应默认内容
  else {
    console.log(bgRed(content));
    response.end(`<h1 style="color: #ff0000;">${content}</h1>`)
  }
// -----------------------------------------响应-------------------------------------------//
  // 提交请求 响应数据 方法
  function subReqRes(path, method, data) {
    console.log(bgYellow('请求?'), green('路径:'), path, green('; 类型:'), method, green('; 数据:'), data)
    // 提交请求数据 获取响应数据
    const res = apiItem.response(path, method, data)
    console.log(bgGreen('响应?'), magenta(typeof res), utils.expString(res).substring(0, 100), '......');
    // 判断 请求数据中是否携带 html 属性, true返回类型为 'text/html'
    if(data.html) {}
    response.setHeader('Content-Type', 'text/html; charset=utf-8')
    // 返回 数据
    response.end(res)
  }
})

// -----------------------------------------启动-------------------------------------------//
// 服务器 端口号
server.listen(port, () => {
  console.log(`${bgCyan(name)}: ${magenta(`启动成功! 地址: http://${ip}:${port}/`)}`)
  console.timeEnd(name) // 结束计时
  console.log(blue('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<'));
})
