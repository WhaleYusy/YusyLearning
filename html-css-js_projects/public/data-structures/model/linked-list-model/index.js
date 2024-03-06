function defaultEquals(a, b) {
  return a === b
}

class Node {
  constructor(element) {
    this.element = element
    this.next = undefined
  }
}

class DoublyNode extends Node {
  constructor(element, next, prev) {
    super(element, next)
    this.prev = prev
  }
}

module.exports = { defaultEquals, Node, DoublyNode }
