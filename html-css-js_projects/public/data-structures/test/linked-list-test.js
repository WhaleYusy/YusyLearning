const { LinkedList } = require("../model/linkedList");

const list = new LinkedList();
list.push(15);
list.push(10);
console.log(list.head); // Node 15
console.log(list.head.next); // Node 10