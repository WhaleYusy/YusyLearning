// 字符串最后一个单词的长度

// 描述
// 计算字符串最后一个单词的长度，单词以空格隔开，字符串长度小于5000。（注：字符串末尾不以空格为结尾）
// 输入描述：
// 输入一行，代表要计算的字符串，非空，长度小于5000。

// 输出描述：
// 输出一个整数，表示输入字符串最后一个单词的长度。

const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})
var countLine = 1
var tokens = []
var trulyLine = 1
rl.on('line', (line) => {
  tokens.push(line)
  if (countLine === trulyLine) {
    // 请输入你的方法
    let strArr = tokens[0].split(' '), length = strArr.length
    console.log(strArr[length - 1].length)
  } else {
    countLine++
  }
})

// hrllo noecoder
// 8