// 输入整型数组和排序标识，对其元素按照升序或降序进行排序

// 描述
// 输入整型数组和排序标识，对其元素按照升序或降序进行排序

// 数据范围： 1≤n≤1000  ，元素大小满足 0≤val≤100000
// 输入描述：
// 第一行输入数组元素个数
// 第二行输入待排序的数组，每个数用空格隔开
// 第三行输入一个整数0或1。0代表升序排序，1代表降序排序

// 输出描述：
// 输出排好序的数字

const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})
var countLine = 1
var tokens = []
var trulyLine = 3
rl.on('line', line => {
  tokens.push(line)
  if (countLine === trulyLine) {
    // 请输入你的方法
    let arr = tokens[1].split(' ')
    const ascSort = parseInt(tokens[2]) === 0
    sortArr(arr, ascSort)
  } else {
    countLine++
  }
})

function sortArr(arr, ascSort) {
  let newArr = arr
  newArr.sort((a, b) => {
    let computedNum = parseInt(a) > parseInt(b)
    if (ascSort) {
      return computedNum ? 1 : -1
    } else {
      return computedNum ? -1 : 1
    }
  })
  console.log(newArr.join(' '))
}

// 8
// 1 2 4 9 3 55 64 25
// 0
// 1 2 3 4 9 25 55 64

// 5
// 1 2 3 4 5
// 1
// 5 4 3 2 1
