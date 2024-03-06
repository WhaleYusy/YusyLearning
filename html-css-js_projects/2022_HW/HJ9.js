// 提取不重复的整数

// 描述
// 输入一个 int 型整数，按照从右向左的阅读顺序，返回一个不含重复数字的新的整数。
// 保证输入的整数最后一位不是 0 。

// 数据范围： 1≤n≤10^8

// 输入描述：
// 输入一个int型整数

// 输出描述：
// 按照从右向左的阅读顺序，返回一个不含重复数字的新的整数

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
    console.log([...new Set(tokens[0].split('').reverse())].join(''))
  } else {
    countLine++
  }
})

// 9876673
// 37689
