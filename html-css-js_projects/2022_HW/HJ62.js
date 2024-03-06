// 查找输入整数二进制中1的个数

// 描述
// 输入一个正整数，计算它在二进制下的1的个数。
// 注意多组输入输出！！！！！！

// 数据范围：1≤n≤2^31−1
// 输入描述：
// 输入一个整数

// 输出描述：
// 计算整数二进制中1的个数

const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})
var countLine = 0
var tokens = []
// var trulyLine = 1
rl.on('line', line => {
  tokens.push(line)
  // if (countLine === trulyLine) {
  // 请输入你的方法
  let match = parseInt(tokens[countLine]).toString(2).match(/1/g)
  console.log(match ? match.length : 0)
  // } else {
  countLine++
  // }
})

// 5
// 2

// 0
// 0

// 13277435
// 14
// 2567237
// 10
