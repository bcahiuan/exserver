// image 图片

// base64 返回格式
const { resimageBase64 } = require('../module/image/index')
const imagedir = "resourceFile/image/"

const resimg = resimageBase64(imagedir, true)
// 返回路径
function imageurls() {
  const filedirs = fs.readdirSync(imagedir)
  const imgurls = []
  filedirs.forEach(item => imgurls.push(reqUrl + item))
  return imgurls
}

module.exports = [
  //
  {
    url: '/image',
    type: 'get',
    response: (path, method, data) => {
      let res = null
      // 判断 html为true 返回 html字符串
      if(data && data.html) { res = resimg.html }
      else { res = resimg.data.toString() }
      return res
    }
  },
  //
  {
    url: '/image/pathshow/',
    type: 'get',
    response: (path, method, data) => {

      return res
    }
  }
]

/**
 * @type data 查询参数
 *    --html = true 返回html字符串(网页中展示图片)----------------------------{已实现}
 *    --id = number(可选参数) 根据传入的 数值 展示指定索引的图片
 *    --name = string(可选参数) 根据传入的 字符串 展示指定名字的图片
 *    --ext = string(扩展名) 展示
 */

