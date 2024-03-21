// 输出单向链表中倒数第k个结点

// 描述
// 输入一个单向链表，输出该链表中倒数第k个结点，链表的倒数第1个结点为链表的尾指针。

// 链表结点定义如下：
// struct ListNode
// {
//     int m_nKey;
//     ListNode* m_pNext;
// };
// 正常返回倒数第k个结点指针，异常返回空指针.
// 要求：
// (1)正序构建链表;
// (2)构建后要忘记链表长度。
// 数据范围：链表长度满足1≤n≤1000  ， k≤n  ，链表中数据满足0≤val≤10000

// 本题有多组样例输入。

// 输入描述：
// 输入说明
// 1 输入链表结点个数
// 2 输入链表的值
// 3 输入k的值

// 输出描述：
// 输出一个整数

const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})
var countLine = 1
var tokens = []
var trulyLine = 3
var i = 0
rl.on('line', line => {
  tokens.push(line)
  if (countLine % trulyLine === 0) {
    // 请输入你的方法
    const length = parseInt(tokens[i * 3])
    const arr = new Array(length)
    const arr2 = tokens[i * 3 + 1].split(' ')
    arr2.forEach((item, index) => {
      arr[index] = item
    })
    const num = parseInt(tokens[i * 3 + 2])
    console.log(arr[length - num])
    i++
  }
  countLine++
})

// 8
// 1 2 3 4 5 6 7 8
// 4
// 5

// 1
// 8108
// 1
// 8108
// 7
// 2542 4218 9064 4908 1526 6655 921
// 1
// 921
