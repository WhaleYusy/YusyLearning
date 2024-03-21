// 取近似值

// 描述
// 写出一个程序，接受一个正浮点数值，输出该数值的近似整数值。如果小数点后数值大于等于 0.5 ,向上取整；小于 0.5 ，则向下取整。

// 数据范围：保证输入的数字在 32 位浮点数范围内
// 输入描述：
// 输入一个正浮点数值

// 输出描述：
// 输出该数值的近似整数值

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
    console.log(Math.round(tokens[0]))
  } else {
    countLine++
  }
})

// 5.5
// 6

// 2.499
// 2
