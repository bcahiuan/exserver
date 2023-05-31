//

const fs = require('fs')
const path = require('path')
// 图片宽高 模块
const imagesize = require('image-size')

const { ip, port, webimgsize, reqUrl } = require('../../setting')

const Style = fs.readFileSync('server/module/image/extra.css', 'utf-8')
const extraStyle = `<style>${Style}</style>`
// let style = `padding: 10px;`

///////////////////////////////////////////////////////////////////////////////

//------------------------读取文件路径(文件目录)------------------------------//
function readFilePaths(filedir) {
  const filepath = []
  const filedirs = fs.readdirSync(filedir)
  filedirs.forEach(item => filepath.push(filedir + item)) // 拼接路径
  return filepath
}

//----------------------根据图片宽高进行排序---------------------------------//
function imageSort(filepath) {
  const sortpath = { width: [], height: [] }
  // 遍历图片 区分宽高图片
  Array.from(filepath).forEach(item => {
    const { width, height } = imagesize(item) // 获取图片宽高
    if(width <= height) { sortpath.height.push(item) }
    else { sortpath.width.push(item) }
  })
  return sortpath
}

//-----------------读取拼接图片内容(图片路径, 编码格式)-------------------------//
function readFile(filepath, type) {
  let resfile = { data: [], html: '' }
  filepath.forEach((item, index) => {
    const title = path.basename(item) // 图片全称
    const ext = path.extname(item).slice(1) // 图片扩展名
    const styles = imageSize(item) // 图片样式大小
    const content = fs.readFileSync(item, 'base64') // 读取 图片内容信息
    const pathurl = `http://${ip}:${port}/${reqUrl}/${title}`
    if(type === 'url') {
      resfile.data[index] = pathurl
      resfile.html += `<img style="${styles}" src="${pathurl}" title="${title}">`
    } else if(type === 'base64' || type === undefined) {
      resfile.data[index] = content
      resfile.html += `<img style="${styles}" src="data:image/${ext};base64,${content}" title="${title}">`
    }
  })
  return resfile
}

// 图片大小判断
function imageSize(itemfilepath) {
  let size = ''
  const { width, height } = imagesize(itemfilepath) // 获取图片宽高
  if(width <= height) { size += `height: ${webimgsize};` }
  else { size += `width: ${webimgsize};` }
  return size
}

// image 返回格式 base64
exports.resimageBase64 = (dirpath, sort, type) => {
  let resImage = { data: [], html: '' }
  const filepaths = readFilePaths(dirpath)
  if(sort) {
    const { width, height } = imageSort(filepaths)
    const imgwidth = readFile(width, type)
    const imgheight = readFile(height, type)
    resImage.html = imgheight.html + imgwidth.html
    resImage.data = imgheight.data.concat(imgwidth.data)
  }
  else { resImage = readFile(filepaths, type) }
  resImage.html += extraStyle
  return resImage
}
