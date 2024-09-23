// 字符串字符匹配

// 描述
// 判断短字符串S中的所有字符是否在长字符串T中全部出现。
// 请注意本题有多组样例输入。

// 数据范围：1≤len(S),len(T)≤200

// 输入描述：
// 输入两个字符串。第一个为短字符串，第二个为长字符串。两个字符串均由小写字母组成。

// 输出描述：
// 如果短字符串的所有字符均在长字符串中出现过，则输出字符串"true"。否则输出字符串"false"。
const rl = require('readline').createInterface({ input: process.stdin })
var iter = rl[Symbol.asyncIterator]()
const readline = async () => (await iter.next()).value

void (async function () {
  // Write your code here
  while ((line = await readline())) {
    let a = line
    line = await readline()
    let b = line
    console.log(a && b ? a.split('').every(c => b.includes(c)) : false)
  }
})()

// bc
// abc
// true
