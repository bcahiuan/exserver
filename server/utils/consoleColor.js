// console color 控制台输出颜色

module.exports = {
  // 样式
  bold: formatter('\x1b[1m', '\x1b[22m'), // 粗体
  dim: formatter('\x1b[2m', '\x1b[22m'), // 暗淡的
  italic: formatter('\x1b[3m', '\x1b[23m'), // 斜体
  underline: formatter('\x1b[4m', '\x1b[24m'), // 下划线
  inverse: formatter('\x1b[7m', '\x1b[27m'), // 颠倒的
  hidden: formatter('\x1b[8m', '\x1b[28m'), // 隐藏
  strikethrough: formatter('\x1b[9m', '\x1b[29m'), // 删除线
  // 字体颜色
  black: formatter('\x1b[30m', '\x1b[39m'), // 黑色
  red: formatter('\x1b[31m', '\x1b[39m'), // 红色
  green: formatter('\x1b[32m', '\x1b[39m'), // 绿色
  yellow: formatter('\x1b[33m', '\x1b[39m'), // 黄色
  blue: formatter('\x1b[34m', '\x1b[39m'), // 蓝色
  magenta: formatter('\x1b[35m', '\x1b[39m'), // 洋红色
  cyan: formatter('\x1b[36m', '\x1b[39m'), // 青色
  white: formatter('\x1b[37m', '\x1b[39m'), // 白色
  gray: formatter('\x1b[90m', '\x1b[39m'), // 灰色
  // 背景颜色
  bgBlack: formatter('\x1b[40m', '\x1b[49m'), //
  bgRed: formatter('\x1b[41m', '\x1b[49m'), //
  bgGreen: formatter('\x1b[42m', '\x1b[49m'), //
  bgYellow: formatter('\x1b[43m', '\x1b[49m'), //
  bgBlue: formatter('\x1b[44m', '\x1b[49m'), //
  bgMagenta: formatter('\x1b[45m', '\x1b[49m'), //
  bgCyan: formatter('\x1b[46m', '\x1b[49m'), //
  bgWhite: formatter('\x1b[47m', '\x1b[49m'), //

}

// 格式化
function formatter(open, close) {
  return function (input) {
    return open + input + close
  }
}
