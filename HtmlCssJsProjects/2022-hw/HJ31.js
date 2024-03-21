// 单词倒排

// 描述
// 对字符串中的所有单词进行倒排。

// 说明：

// 1、构成单词的字符只有26个大写或小写英文字母；

// 2、非构成单词的字符均视为单词间隔符；

// 3、要求倒排后的单词间隔符以一个空格表示；如果原字符串中相邻单词间有多个间隔符时，倒排转换后也只允许出现一个空格间隔符；

// 4、每个单词最长20个字母；

// 数据范围：字符串长度满足1≤n≤10000
// 输入描述：
// 输入一行，表示用来倒排的句子

// 输出描述：
// 输出句子的倒排结果

const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})
var countLine = 1
var tokens = []
var trulyLine = 1
rl.on('line', line => {
  tokens.push(line)
  if (countLine === trulyLine) {
    // 请输入你的方法
    console.log(
      tokens[0]
        .replace(/[^A-Za-z]/g, ' ')
        .split(' ')
        .reverse()
        .join(' ')
    )
  } else {
    countLine++
  }
})

// I am a student
// student a am I

// $bo*y gi!r#l
// l r gi y bo
