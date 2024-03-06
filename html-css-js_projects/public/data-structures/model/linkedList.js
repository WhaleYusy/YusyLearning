const { defaultEquals, Node } = require('./linked-list-model')

class LinkedList {
  constructor(equalsFn = defaultEquals) {
    this.count = 0
    this.head = undefined
    this.equalsFn = equalsFn
  }
  push(element) {
    const node = new Node(element)
    let current
    if (this.getHead() == null) {
      this.head = node
    } else {
      current = this.getHead()
      while (current.next != null) {
        current = current.next
      }
      current.next = node
    }
    this.count++
  }
  removeAt(index) {
    if (index >= 0 && index < this.size()) {
      let current = this.getHead()
      if (index === 0) {
        this.head = current.next
      } else {
        // let previous;
        // for (let i = 0; i < index; i++) {
        //   previous = current;
        //   current = current.next;
        // }
        // previous.next = current.next;
        const previous = this.getElementAt(index - 1)
        current = previous.next
        previous.next = current.next
      }
      this.count--
      return current.element
    }
    return undefined
  }
  getElementAt(index) {
    if (index >= 0 && index <= this.size()) {
      let node = this.getHead()
      for (let i = 0; i < index && node != null; i++) {
        node = node.next
      }
      return node
    }
    return undefined
  }
  insert(element, index) {
    if (index >= 0 && index <= this.size()) {
      const node = new Node(element)
      if (index === 0) {
        const element = this.getHead()
        node.next === current
        this.head = node
      } else {
        const previous = this.getElementAt(index - 1)
        const current = previous.next
        node.next = current
        previous.next = node
      }
      this.count++
      return true
    }
    return false
  }
  indexOf(element) {
    let current = this.getHead()
    for (let i = 0; i < this.size() && current != null; i++) {
      if (this.equalsFn(element, current.element)) {
        return i
      }
      current = current.next
    }
    return -1
  }
  remove(element) {
    const index = this.indexOf(element)
    return this.removeAt(index)
  }
  size() {
    return this.count
  }
  isEmpty() {
    return this.size() === 0
  }
  getHead() {
    return this.head
  }
}

class DoublyLinkedList extends LinkedList {
  constructor(equalsFn = defaultEquals) {
    super(equalsFn)
    this.tail = undefined
  }
}

module.exports = { LinkedList, DoublyLinkedList }
