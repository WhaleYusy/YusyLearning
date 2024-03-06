// 截取字符串

// 描述
// 输入一个字符串和一个整数 k ，截取字符串的前k个字符并输出

// 数据范围：字符串长度满足1≤n≤1000 , \1≤k≤n 
// 输入描述：
// 1.输入待截取的字符串

// 2.输入一个正整数k，代表截取的长度

// 输出描述：
// 截取后的字符串

const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})
var countLine = 1
var tokens = []
var trulyLine = 2
rl.on('line', (line) => {
  tokens.push(line)
  if (countLine === trulyLine) {
    // 请输入你的方法
    let str = tokens[0]
    let k = parseInt(tokens[1])
    console.log(str.substring(0, k))
  } else {
    countLine++
  }
})

// abABCcDEF
// 6
// abABCc

// bdxPKBhih
// 6
// bdxPKB