// 计算某字符出现次数

// 描述
// 写出一个程序，接受一个由字母、数字和空格组成的字符串，和一个字符，然后输出输入字符串中该字符的出现次数。（不区分大小写字母）

// 数据范围： 1≤n≤1000
// 输入描述：
// 第一行输入一个由字母和数字以及空格组成的字符串，第二行输入一个字符。

// 输出描述：
// 输出输入字符串中含有该字符的个数。（不区分大小写字母）

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
    const str = tokens[0].toLowerCase()
    const word = tokens[1].toLowerCase()
    let num = 0
    for (const i of str) {
      if (i === word) {
        num++
      }
    }
    console.log(num)
  } else {
    countLine++
  }
})

// ABCabc
// A
// 2
