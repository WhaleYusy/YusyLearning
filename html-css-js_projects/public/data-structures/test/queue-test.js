// 队列的测试
const Queue = require('../model/queue')
const queue = new Queue()
console.log(queue.isEmpty()) // true

queue.enqueue('John')
queue.enqueue('Jack')
console.log(queue.toString()) // John,Jack

queue.enqueue('Camila')
console.log(queue.toString()) // John,Jack,Camila
console.log(queue.size()) // 3
console.log(queue.isEmpty()) // false
queue.dequeue()
queue.dequeue()
console.log(queue.toString()) // Camila

// 击鼓传花游戏
function hotPotato(elementsList) {
  const queue = new Queue()
  const eliminatedList = []
  for (let i = 0; i < elementsList.length; i++) {
    queue.enqueue(elementsList[i])
  }
  while (queue.size() > 1) {
    for (let i = 0; i < Math.ceil(Math.random() * 10); i++) {
      queue.enqueue(queue.dequeue())
    }
    eliminatedList.push(queue.dequeue())
  }
  return {
    eliminated: eliminatedList,
    winner: queue.dequeue()
  }
}

const names = ['John', 'Jack', 'Camila', 'Ingrid', 'Carl']
const result = hotPotato(names)
result.eliminated.forEach(name => console.log(`${name}在击鼓传花游戏中被淘汰。`))
console.log(`胜利者：${result.winner}`)
