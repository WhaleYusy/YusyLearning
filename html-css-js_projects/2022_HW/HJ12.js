// 字符串反转

// 描述
// 接受一个只包含小写字母的字符串，然后输出该字符串反转后的字符串。（字符串长度不超过1000）

// 输入描述：
// 输入一行，为一个只包含小写字母的字符串。

// 输出描述：
// 输出该字符串反转后的字符串。

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
    console.log(tokens[0].toLowerCase().split('').reverse().join(''))
  } else {
    countLine++
  }
})

// abcd
// dcba