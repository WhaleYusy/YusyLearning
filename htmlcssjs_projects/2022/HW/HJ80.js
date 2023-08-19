// 整型数组合并

// 描述
// 题目标题：

// 将两个整型数组按照升序合并，并且过滤掉重复数组元素。
// 输出时相邻两数之间没有空格。



// 输入描述：
// 输入说明，按下列顺序输入：
// 1 输入第一个数组的个数
// 2 输入第一个数组的数值
// 3 输入第二个数组的个数
// 4 输入第二个数组的数值

// 输出描述：
// 输出合并之后的数组

const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})
var countLine = 1
var tokens = []
var trulyLine = 4
rl.on('line', (line) => {
  tokens.push(line)
  if (countLine === trulyLine) {
    // 请输入你的方法
    const l1 = parseInt(tokens[0]), l2 = parseInt(tokens[2])
    let arr1 = tokens[1].split(' ').map(Number).filter((item, index) => index < l1)
    let arr2 = tokens[3].split(' ').map(Number).filter((item, index) => index < l2)
    console.log([...new Set([...arr1, ...arr2])].sort((a, b) => a > b ? 1 : -1).join(''))
  } else {
    countLine++
  }
})

// 3
// 1 2 5
// 4
// -1 0 3 2
// -101235