const Set = require('../model/set')

const set = new Set()
set.add(1)
console.log(set.values());
console.log(set.has(1));
console.log(set.size());

set.add(2)
console.log(set.values());
console.log(set.has(2));
console.log(set.size());

set.delete(1)
console.log(set.values());

set.delete(2)
console.log(set.values());