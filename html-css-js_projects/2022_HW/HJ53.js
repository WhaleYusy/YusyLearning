// 杨辉三角的变形

// 描述

// 以上三角形的数阵，第一行只有一个数1，以下每行的每个数，是恰好是它上面的数、左上角数和右上角的数，3个数之和（如果不存在某个数，认为该数就是0）。

// 求第n行第一个偶数出现的位置。如果没有偶数，则输出-1。例如输入3,则输出2，输入4则输出3，输入2则输出-1。

// 数据范围： 1≤n≤10^9

// 输入描述：
// 输入一个int整数

// 输出描述：
// 输出返回的int值

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
    const num = parseInt(tokens[0])
    //本题就是一个找规律的题，不难看出第一行和第二行都没有偶数，所以输出－1；
    // 从第二行开始，每行的第二个数都是上一行第二个数加1，所以一旦是奇数行，那每行的第二个数必然是偶数。所以if(n % 2 == 1) return 2;
    // 而根据继续找规律可以知道，从第6行开始，每隔四行，第一次出现偶数是第四个数，但是只要是4的倍数行，输出的一定是3，如此，便得到以下算法，题目迎刃而解！
    // 当然啦，也可以写算法把每行的数计算出来，再行判断偶数在每行的第几个也是可以的。
    function yhsj(n) {
      if (n == 1 || n == 2) return -1
      if (n % 2 == 1) return 2
      if (n % 4 == 0) return 3
      return 4
    }
    console.log(yhsj(num))
  } else {
    countLine++
  }
})

// 4
// 3
