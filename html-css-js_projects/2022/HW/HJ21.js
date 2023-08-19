// 简单密码

// 描述
// 现在有一种密码变换算法。
// 九键手机键盘上的数字与字母的对应： 1--1， abc--2, def--3, ghi--4, jkl--5, mno--6, pqrs--7, tuv--8 wxyz--9, 0--0，把密码中出现的小写字母都变成九键键盘对应的数字，如：a 变成 2，x 变成 9.
// 而密码中出现的大写字母则变成小写之后往后移一位，如：X ，先变成小写，再往后移一位，变成了 y ，例外：Z 往后移是 a 。
// 数字和其它的符号都不做变换。
// 数据范围： 输入的字符串长度满足 1≤n≤100 
// 输入描述：
// 输入一组密码，长度不超过100个字符。

// 输出描述：
// 输出密码变换后的字符串

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
    const arr = tokens[0].split('')
    let result = ''
    let r = ''
    let wordCode = null, wordCode2 = null
    arr.forEach(word => {
      wordCode = word.charCodeAt()
      if (wordCode >= 65 && wordCode <= 90) { // 大写字母
        wordCode2 = word.toLowerCase().charCodeAt() + 1
        if (wordCode === 90) {
          r = 'a'
        } else {
          r = String.fromCharCode(wordCode2)
        }
      } else if (wordCode >= 97 && wordCode <= 122) {  // 小写字母
        if (wordCode <= 99) {
          r = '2'
        } else if (wordCode <= 102) {
          r = '3'
        } else if (wordCode <= 105) {
          r = '4'
        } else if (wordCode <= 108) {
          r = '5'
        } else if (wordCode <= 111) {
          r = '6'
        } else if (wordCode <= 115) {
          r = '7'
        } else if (wordCode <= 118) {
          r = '8'
        } else {
          r = '9'
        }
      } else {
        r = word
      }
      result += r
    });
    console.log(result);
  } else {
    countLine++
  }
})

// YUANzhi1987
// zvbo9441987