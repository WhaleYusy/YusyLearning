// 计算日期到天数转换

// 描述
// 根据输入的日期，计算是这一年的第几天。
// 保证年份为4位数且日期合法。
// 进阶：时间复杂度：O(n)\O(n) ，空间复杂度：O(1)\O(1)
// 输入描述：
// 输入一行，每行空格分割，分别是年，月，日

// 输出描述：
// 输出是这一年的第几天

const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})
var countLine = 1
var tokens = []
var trulyLine = 1
var yearPing = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
var yearRun = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
rl.on('line', line => {
  tokens.push(line)
  if (countLine === trulyLine) {
    // 请输入你的方法
    const arr = tokens[0].split(' ').map(Number)
    function isPing(year) {
      if (year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0)) {
        return false
      }
      return true
    }
    let days = 0
    if (isPing(arr[0])) {
      for (let a = 0; a < arr[1] - 1; a++) {
        days += yearPing[a]
      }
    } else {
      for (let b = 0; b < arr[1] - 1; b++) {
        days += yearRun[b]
      }
    }
    days += arr[2]
    console.log(days)
  } else {
    countLine++
  }
})

// 2012 12 31
// 366

// 1982 3 4
// 63
