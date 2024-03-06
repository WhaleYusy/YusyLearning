// 质数因子

// 描述
// 功能:输入一个正整数，按照从小到大的顺序输出它的所有质因子（重复的也要列举）（如180的质因子为2 2 3 3 5 ）

// 数据范围： 1≤n≤2×10^9+14
// 输入描述：
// 输入一个整数

// 输出描述：
// 按照从小到大的顺序输出它的所有质数的因子，以空格隔开。

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
    let numArr = []
    let num = parseInt(tokens[0])

    // 方法1 暴力循环计算 如果质数太大/计算太久导致速度慢
    // function computed(n){
    //   if(n <= 1){
    //     return
    //   }
    //   for (let i = 2; i <= n; i++) {
    //     if(n % i === 0){
    //       numArr.push(i)
    //       computed(n / i)
    //       break;
    //     }
    //   }
    // }
    // computed(num)

    // 方法2 按质数从小到大先计算
    for (let i = 2; i * i <= num; i++) {
      while (num % i === 0) {
        numArr.push(i)
        num /= i
      }
    }
    if (num > 1) {
      numArr.push(num)
    }
    console.log(numArr.join(' '))
  } else {
    countLine++
  }
})

// 180
// 2 2 3 3 5
