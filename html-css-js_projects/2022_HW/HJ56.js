// 完全数计算

// 描述
// 完全数（Perfect number），又称完美数或完备数，是一些特殊的自然数。

// 它所有的真因子（即除了自身以外的约数）的和（即因子函数），恰好等于它本身。

// 例如：28，它有约数1、2、4、7、14、28，除去它本身28外，其余5个数相加，1+2+4+7+14=28。

// 输入n，请输出n以内(含n)完全数的个数。

// 数据范围： 1≤n≤5×10^5

// 输入描述：
// 输入一个数字n

// 输出描述：
// 输出不超过n的完全数的个数

// 示例1
// 输入：
// 1000
// 输出：
// 3

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
    let num = parseInt(tokens[0]),
      result = 0,
      thanSum,
      thanNum
    for (let a = 4; a <= num; a++) {
      thanSum = 1
      thanNum = a / 2
      for (let i = 2; i <= thanNum; i++) {
        if (a % i === 0) {
          thanSum += i
        }
      }
      if (thanSum === a) {
        result++
      }
    }
    console.log(result)
  } else {
    countLine++
  }
})

// 1000
// 3
