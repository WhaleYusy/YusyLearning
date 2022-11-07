// 统计每个月兔子的总数

// 描述
// 有一种兔子，从出生后第3个月起每个月都生一只兔子，小兔子长到第三个月后每个月又生一只兔子。
// 例子：假设一只兔子第3个月出生，那么它第5个月开始会每个月生一只兔子。
// 一月的时候有一只兔子，假如兔子都不死，问第n个月的兔子总数为多少？
// 数据范围：输入满足1≤n≤31 
// 输入描述：
// 输入一个int型整数表示第n个月

// 输出描述：
// 输出对应的兔子总数

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
    function rabbit(num) {
      if ([1, 2].includes(num)) {
        return 1
      }
      return rabbit(num - 1) + rabbit(num - 2)
    }
    console.log(rabbit(parseInt(tokens[0])))
  } else {
    countLine++
  }
})

// 3
// 2