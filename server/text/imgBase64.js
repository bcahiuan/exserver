// img base64 返回格式

const fs = require('fs')
const path = require('path')
// 图片宽高 模块
const imagesize = require('image-size')

let image



const imgPath = "resourceFile/image/"
let imgWArrPath = []
let imgHArrPath = []
// 获取 resourceFile/image 目录下所有文件
fs.promises.readdir(imgPath,  (err, data) => {
  if (err) throw err
  // 遍历目录文件数 await 组  拼接图片路径并存入数组
 data.forEach(item => {
    const imagePath = imgPath + item
    // 获取图片宽高
    const { width, height } = imagesize(imagePath)
    // 分开 宽高图片
    if(width <= height) { imgHArrPath.push(imagePath) }
    else { imgWArrPath.push(imagePath) }
  })
  // 最终数据
  image = joint(imgWArrPath, imgHArrPath)
})

// 拼接数据字符串
function joint(width, height) {
  // 调用方法
  let resh = imageRes(height, false) // 高度
  console.log(resh);
  let resw = imageRes(width, true) // 宽度
  return {
    html: resh.imghtml + resw.imghtml,
    data: resh.imgdata + resw.imgdata
  }
}

// 自适应调节 额外样式
function elseStyles(bool) {
  // 宽高
  let w = '200px'
  let h = '200px'
  let elseStyle = `padding: 10px;`
  // 判断 图片 横竖状态
  if(bool) { elseStyle += `width: ${w};` }
  else { elseStyle += `height: ${h};` }
  return elseStyle
}

// 处理图片返回数据
function imageRes(pathArr, bool) {
  let imghtml = ''
  let imgdata = ''
  // 遍历
  pathArr.forEach(item => {
    // 获取 样式
    const styles = elseStyles(bool)
    // 获取 图片名字和扩展名
    const imgName = path.basename(item)
    const ext = path.extname(item).slice(1)
     // 读取 图片信息
    const srcBase64 = fs.readFileSync(item, 'base64')
    // 服务端渲染 html字符串拼接
    imghtml += `<img style="${styles}" src="data:image/${ext};base64,${srcBase64}" title="${imgName}">`
    // 图片数据
    imgdata += `${srcBase64}&`
  })
  return { imghtml, imgdata }
}

module.exports = {
  /**
   * @type
   */
  html: image.html,
  /**
   * @type
   */
  data: image.data
}
