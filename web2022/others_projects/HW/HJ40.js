// 统计字符

// 描述
// 输入一行字符，分别统计出包含英文字母、空格、数字和其它字符的个数。

// 数据范围：输入的字符串长度满足1≤n≤1000 

// 输入描述：
// 输入一行字符串，可以有空格

// 输出描述：
// 统计其中英文字符，空格字符，数字字符，其他字符的个数

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
    const wordList = tokens[0].split(''),
      p1 = new RegExp('[\u4E00-\u9FA5A-Za-z]'), // 中文以及英文大小写
      p2 = new RegExp('[0-9]'),
      sum = [0, 0, 0, 0]
    for (const i of tokens[0]) {
      if (p1.test(i)) {
        sum[0]++
      } else if (i === ' ') {
        sum[1]++
      } else if (p2.test(i)) {
        sum[2]++
      } else {
        sum[3]++
      }
    }
    sum.forEach(el => {
      console.log(el)
    });
  } else {
    countLine++
  }
})

// 1qazxsw23 edcvfr45tgbn hy67uj m,ki89ol.\\/;p0-=\\][
// 26
// 3
// 10
// 12