/**
 * 1 ?? 空值合并运算符
 * 操作符是一个判断是否为空然后赋值的操作
 * null undefined 时取后者，其它则是自身
 * Chrome 85
 */
// const a1 = 0 ?? 18
// const a2 = null ?? 18
// const a3 = undefined ?? 18
// const a4 = '' ?? 18
// const a5 = false ?? 18
// console.log(a1, a2, a3, a4, a5) // 0 18 18 ('') false

/**
 * 2 ?. 可选链操作符
 * 读取属性并不会因为undefined而报错
 * Chrome 80
 */
const a = {
  name: 'aaa',
  children: {
    name: 'bbb',
    hobby: {
      h1: '篮球'
    }
  }
}
const b = {}
// console.log(a.children.name, b.children.name) // undefined报错
console.log(a.children.hobby.h1.fff?.ght.asda.asda.asdasd, b.children?.hobby.h1.abc.def) // undefined undefined(没有报错)
