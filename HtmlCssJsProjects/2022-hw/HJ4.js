// 字符串分隔

// 描述
// •输入一个字符串，请按长度为8拆分每个输入字符串并进行输出；

// •长度不是8整数倍的字符串请在后面补数字0，空字符串不处理。
// 输入描述：
// 连续输入字符串(每个字符串长度小于等于100)

// 输出描述：
// 依次输出所有分割后的长度为8的新字符串

const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})
var countLine = 1
var tokens = []
var trulyLine = 1
rl.on('line', line => {
  tokens.push(line)
  if (countLine === trulyLine) {
    // 请输入你的方法
    function consoleEight(str) {
      if (str.length <= 8) {
        console.log(str.padEnd(8, '0'))
      } else {
        console.log(str.substring(0, 8))
        consoleEight(str.substring(8))
      }
    }
    consoleEight(tokens[0])
  } else {
    countLine++
  }
})

// abc
// abc00000
