// 放苹果

// 描述
// 把m个同样的苹果放在n个同样的盘子里，允许有的盘子空着不放，问共有多少种不同的分法？
// 注意：如果有7个苹果和3个盘子，（5，1，1）和（1，5，1）被视为是同一种分法。

// 数据范围：0≤m≤10 ，1≤n≤10 。

// 输入描述：
// 输入两个int整数

// 输出描述：
// 输出结果，int型

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
    const arr = tokens[0].split(' ')
    let m = parseInt(arr[0]),
      n = parseInt(arr[1])
    function compute(m, n) {
      if (m <= 1) return 1 // 没有苹果/1个苹果
      if (n === 1) return 1 // 只有一个盘子
      if (m < n) {
        return compute(m, m)
      }
    }
  } else {
    countLine++
  }
})
