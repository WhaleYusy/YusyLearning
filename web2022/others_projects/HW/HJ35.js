// 蛇形矩阵

// 描述
// 蛇形矩阵是由1开始的自然数依次排列成的一个矩阵上三角形。

// 例如，当输入5时，应该输出的三角形为：

// 1 3 6 10 15

// 2 5 9 14

// 4 8 13

// 7 12

// 11


// 输入描述：
// 输入正整数N（N不大于100）

// 输出描述：
// 输出一个N行的蛇形矩阵。

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
    const num = parseInt(tokens[0])
    for (let i = 0; i < num; i++) {
      let fNum = (i) * (i + 1) / 2 + 1
      let result = fNum + ''
      for (let j = i + 1; j < num; j++) {
        fNum += j + 1
        result += ` ${fNum}`
      }
      console.log(result)
    }
  } else {
    countLine++
  }
})

// 4
// 1 3 6 10
// 2 5 9
// 4 8
// 7       
