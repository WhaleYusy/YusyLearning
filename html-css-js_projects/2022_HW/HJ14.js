// 字符串排序

// 描述
// 给定 n 个字符串，请对 n 个字符串按照字典序排列。

// 数据范围： 1≤n≤1000  ，字符串长度满足 1≤len≤100
// 输入描述：
// 输入第一行为一个正整数n(1≤n≤1000),下面n行为n个字符串(字符串长度≤100),字符串中只含有大小写字母。
// 输出描述：
// 数据输出n行，输出结果为按照字典序排列的字符串。

const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})
var countLine = 1
var tokens = []
var trulyLine = 0
rl.on('line', line => {
  tokens.push(line)
  if (countLine === trulyLine) {
    // 请输入你的方法
    tokens.splice(0, 1)
    tokens.sort()
    tokens.forEach(item => {
      console.log(item)
    })
  } else {
    trulyLine = parseInt(tokens[0]) + 1
    countLine++
  }
})

// 9
// cap
// to
// cat
// card
// two
// too
// up
// boat
// boot
// boat
// boot
// cap
// card
// cat
// to
// too
// two
// up
