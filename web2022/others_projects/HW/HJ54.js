// 表达式求值

// 描述
// 给定一个字符串描述的算术表达式，计算出结果值。

// 输入字符串长度不超过 100 ，合法的字符包括 ”+, -, *, /, (, )” ， ”0-9” 。

// 数据范围：运算过程中和最终结果均满足 ∣val∣≤2^31 − 1  ，即只进行整型运算，确保输入的表达式合法
// 输入描述：
// 输入算术表达式

// 输出描述：
// 计算出结果值

// 示例1
// 输入：
// 400+5
// 复制
// 输出：
// 405

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
    let str = eval(tokens[0])
    console.log(str)
  } else {
    countLine++
  }
})

// 1+2
// 3