// 尼科彻斯定理

// 描述
// 验证尼科彻斯定理，即：任何一个整数m的立方都可以写成m个连续奇数之和。

// 例如：

// 1^3=1

// 2^3=3+5

// 3^3=7+9+11

// 4^3=13+15+17+19

// 输入一个正整数m（m≤100），将m的立方写成m个连续奇数之和的形式输出。
// 数据范围：1≤m≤100 
// 进阶：时间复杂度：O(m)\O(m) ，空间复杂度：O(1)\O(1) 

// 输入描述：
// 输入一个int整数

// 输出描述：
// 输出分解后的string

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
    const num = parseInt(tokens[0]), sum = Math.pow(num, 3)
    if (num % 2 === 0) {
      let middle = sum / num, middleCount = num / 2, arr = [middle - 1, middle + 1]
      for (let i = 1; i < middleCount; i++) {
        arr.push(middle + 1 + i * 2)
        arr.unshift(middle - 1 - i * 2)
      }
      console.log(arr.join('+'))

    } else {
      let middle = sum / num, middleCount = num / 2, arr = [middle]
      for (let i = 1; i <= middleCount; i++) {
        arr.push(middle + i * 2)
        arr.unshift(middle - i * 2)
      }
      console.log(arr.join('+'))
    }
  } else {
    countLine++
  }
})

// 6
// 31+33+35+37+39+41