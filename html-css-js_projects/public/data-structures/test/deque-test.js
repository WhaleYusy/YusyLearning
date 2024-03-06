// 双端队列的测试
const Deque = require('../model/deque')
const deque = new Deque()
console.log(deque.isEmpty()) // true
deque.addBack('John')
deque.addBack('Jack')
console.log(deque.toString()) // John,Jack
deque.addBack('Camila')
console.log(deque.toString()) // John,Jack,Camila
console.log(deque.size()) //  3
console.log(deque.isEmpty()) // false
deque.removeFront()
console.log(deque.toString()) // Jack,Camila
deque.removeBack()
console.log(deque.toString()) // Jack
deque.addFront('John')
console.log(deque.toString()) // John,Jack

// 回文检查器
function palindromeChecker(aString) {
  if (aString === undefined || aString === null || (aString !== null && aString.length === 0)) {
    return false
  }
  const deque = new Deque()
  const lowerString = aString.toLocaleLowerCase().split(' ').join('')
  let isEqual = true
  let firstChar, lastChar
  for (let i = 0; i < lowerString.length; i++) {
    deque.addBack(lowerString.charAt(i))
  }
  while (deque.size() > 1 && isEqual) {
    firstChar = deque.removeFront()
    lastChar = deque.removeBack()
    if (firstChar !== lastChar) {
      isEqual = false
    }
  }
  return isEqual
}

console.log('a', palindromeChecker('a'))
console.log('aa', palindromeChecker('aa'))
console.log('kayak', palindromeChecker('kayak'))
console.log('level', palindromeChecker('level'))
console.log('Was it a car or a cat i saw', palindromeChecker('Was it a car or a cat i saw'))
console.log('Step on no pets', palindromeChecker('Step on no pets'))
console.log('aaddff', palindromeChecker('aaddff'))
