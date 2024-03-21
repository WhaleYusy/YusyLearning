// 数字颠倒

// 描述
// 输入一个整数，将这个整数以字符串的形式逆序输出
// 程序不考虑负数的情况，若数字含有0，则逆序形式也含有0，如输入为100，则输出为001

// 数据范围： 0≤n≤2^30−1
// 输入描述：
// 输入一个int整数

// 输出描述：
// 将这个整数以字符串的形式逆序输出

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
    console.log(String(parseInt(tokens[0])).split('').reverse().join(''))
  } else {
    countLine++
  }
})

// 1516000
// 0006151

// 0
// 0
