// 查找组成一个偶数最接近的两个素数

// 描述
// 任意一个偶数（大于2）都可以由2个素数组成，组成偶数的2个素数有很多种情况，本题目要求输出组成指定偶数的两个素数差值最小的素数对。

// 数据范围：输入的数据满足 4≤n≤1000
// 输入描述：
// 输入一个大于2的偶数

// 输出描述：
// 从小到大输出两个素数

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
    function isSushu(no) {
      if (no >= 2) {
        for (let a = 2; a <= no / 2; a++) {
          if (no % a === 0) {
            return false
          }
        }
        return true
      } else {
        return false
      }
    }
    const num = parseInt(tokens[0])
    let num1, num2
    for (let b = num / 2; b < num; b--) {
      if (isSushu(b) && isSushu(num - b)) {
        console.log(b);
        console.log(num - b);
        break;
      }
    }
  } else {
    countLine++
  }
})

// 20
// 7
// 13

// 4
// 2
// 2