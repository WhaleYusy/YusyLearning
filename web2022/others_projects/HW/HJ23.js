// 删除字符串中出现次数最少的字符

// 描述
// 实现删除字符串中出现次数最少的字符，若出现次数最少的字符有多个，则把出现次数最少的字符都删除。输出删除这些单词后的字符串，字符串中其它字符保持原来的顺序。

// 数据范围：输入的字符串长度满足1≤n≤20  ，保证输入的字符串中仅出现小写字母
// 输入描述：
// 字符串只包含小写英文字母, 不考虑非法输入，输入的字符串长度小于等于20个字节。

// 输出描述：
// 删除字符串中出现次数最少的字符后的字符串。

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
    let str = tokens[0]
    let strArr = str.split('')
    const strArr2 = {}
    strArr.forEach(item => {
      if (Object.keys(strArr2).includes(item)) {
        strArr2[item] += 1
      } else {
        strArr2[item] = 1
      }
    });
    const min = Math.min(...new Set(Object.values(strArr2)))
    Object.keys(strArr2).forEach(key => {
      if (strArr2[key] === min) {
        strArr = strArr.filter(item3 => item3 !== key)
      }
    });
    console.log(strArr.join(''))
  } else {
    countLine++
  }
})

// aabcddd
// aaddd
