// 栈的测试
const Stack = require('../model/stack')
const stack = new Stack()
console.log(stack.isEmpty()) // true

stack.push(5)
stack.push(8)

console.log(stack.peek()) // 8

stack.push(11)
console.log(stack.size()) // 3
console.log(stack.isEmpty()) // false

stack.push(15)

stack.pop()
stack.pop()
console.log(stack.size()) // 2

console.log(stack.toString())

// 十进制转二进制
function decimalToBinary(decNumber) {
  const remStack = new Stack()
  let number = decNumber
  let rem
  let binaryString = ''
  while (number > 0) {
    rem = Math.floor(number % 2)
    remStack.push(rem)
    number = Math.floor(number / 2)
  }
  while (!remStack.isEmpty()) {
    binaryString += remStack.pop().toString()
  }
  return binaryString
}

console.log(decimalToBinary(233)) // 11101001
console.log(decimalToBinary(10)) //  1010
console.log(decimalToBinary(1000)) // 1111101000

// 进制转换算法
function baseConverter(decNumber, base) {
  const digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const remStack = new Stack()
  let number = decNumber
  let rem
  let baseString = ''
  if (!(base >= 2 && base <= 36)) {
    return ''
  }
  while (number > 0) {
    rem = Math.floor(number % base)
    remStack.push(rem)
    number = Math.floor(number / base)
  }
  while (!remStack.isEmpty()) {
    baseString += digits[remStack.pop()]
  }
  return baseString
}

console.log(baseConverter(100345, 2)) // 11000011111111001
console.log(baseConverter(100345, 8)) // 303771
console.log(baseConverter(100345, 16)) // 187F9
console.log(baseConverter(100345, 35)) // 2BW0
