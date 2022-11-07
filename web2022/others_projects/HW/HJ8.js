// 合并表记录

// 描述
// 数据表记录包含表索引index和数值value（int范围的正整数），请对表索引相同的记录进行合并，即将相同索引的数值进行求和运算，输出按照index值升序进行输出。

// 提示:
// 0 <= index <= 11111111
// 1 <= value <= 100000

// 输入描述：
// 先输入键值对的个数n（1 <= n <= 500）
// 接下来n行每行输入成对的index和value值，以空格隔开

// 输出描述：
// 输出合并后的键值对（多行）

const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})
var countLine = 1
var tokens = []
var trulyLine = 0
rl.on('line', (line) => {
  tokens.push(line)
  if (countLine === 1) {
    trulyLine = parseInt(tokens[0]) + 1
  }
  if (countLine === trulyLine) {
    // 请输入你的方法
    let obj = {}
    for (let i = 1; i < tokens.length; i++) {
      const element = tokens[i];
      const eArr = element.split(' ')
      if (Object.getOwnPropertyDescriptor(obj, eArr[0])) {
        obj[eArr[0]] += parseInt(eArr[1])
      } else {
        obj[eArr[0]] = parseInt(eArr[1])
      }
    }
    Object.entries(obj).forEach(item => {
      console.log(`${item[0]} ${item[1]}`)
    })
  } else {
    countLine++
  }
})

// 4
// 0 1
// 0 2
// 1 2
// 3 4
// 0 3
// 1 2
// 3 4

// 3
// 0 1
// 0 2
// 8 9
// 0 3
// 8 9