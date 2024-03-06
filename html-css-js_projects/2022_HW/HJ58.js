// 输入n个整数，输出其中最小的k个

// 描述
// 输入n个整数，找出其中最小的k个整数并按升序输出

// 本题有多组输入样例

// 数据范围：1≤n≤1000  ，输入的整数满足 1≤val≤10000
// 输入描述：
// 第一行输入两个整数n和k
// 第二行输入一个整数数组

// 输出描述：
// 从小到大输出最小的k个整数，用空格分开。

const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})
var countLine = 1
var tokens = []
var trulyLine = 2
rl.on('line', line => {
  tokens.push(line)
  if (countLine === trulyLine) {
    // 请输入你的方法
    const nk = tokens[0].split(' ')
    let n = nk[0],
      k = nk[1]
    let arr = tokens[1].split(' ')
    arr.sort((a, b) => {
      return parseInt(a) > parseInt(b) ? 1 : -1
    })
    console.log(arr.splice(0, k).join(' '))
  } else {
    countLine++
  }
})

// 5 2
// 1 3 5 7 2
// 1 2
