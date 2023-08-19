// let msg = 'module1'
// function foo () {
//   console.log('foo()', msg)
// }
// function bar () {
//   console.log('bar()', msg)
// }
// let obj = {
//   msg: 'module2',
//   foo () {
//     console.log('foo()' + this.msg)
//   }
// }
// ;(function (window) {
//   let msg = 'module3'
//   function foo () {
//     console.log('foo()', msg)
//   }
//   window.module3 = { foo }
// })(window)
;(function (window, $) {
  let msg = 'module4'
  function foo () {
    console.log('foo()', msg)
  }
  window.module4 = foo
  $('body').css('background', 'red')
})(window, jQuery)
