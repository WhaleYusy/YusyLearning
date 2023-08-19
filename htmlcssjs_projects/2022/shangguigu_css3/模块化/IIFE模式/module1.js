// let msg = 'module1'
// function foo () {
//   console.log('foo()', msg)
// }
// function bar () {
//   console.log('bar()', msg)
// }
let obj = {
  msg: 'module2',
  foo () {
    console.log('foo()' + this.msg)
  }
}
