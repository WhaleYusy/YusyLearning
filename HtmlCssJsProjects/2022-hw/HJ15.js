// 求int型正整数在内存中存储时1的个数

// 描述
// 输入一个 int 型的正整数，计算出该 int 型数据在内存中存储时 1 的个数。

// 数据范围：保证在 32 位整型数字范围内
// 输入描述：
//  输入一个整数（int类型）

// 输出描述：
//  这个数转换成2进制后，输出1的个数

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
    const num = parseInt(tokens[0])
    const numArr = num.toString(2).split('')
    let result = 0
    numArr.forEach(item => {
      if (parseInt(item) === 1) {
        result++
      }
    })
    console.log(result)
  } else {
    countLine++
  }
})

// 5
// 2

// 0
// 0
