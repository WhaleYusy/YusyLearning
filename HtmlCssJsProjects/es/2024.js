/**
 * 1 Group By分组
 * 将可迭代对象分组为一个新的Map，key由回调提供（Math.sign用于判断一个数的符号）
 * Chrome 117
 *
 * 分组为一个新的对象
 * Chrome 117
 */

// const m1 = Map.groupBy([0, -5, 3, -4, 8, 9], x => Math.sign(x))
// console.log(m1)

// const o1 = Object.groupBy([0, -5, 3, -4, 8, 9], x => Math.sign(x))
// console.log(o1)

/**
 * 2 Promise.withResolvers
 * 将Promise解构出来
 * Chrome 119
 */
// const { promise, resolve, reject } = Promise.withResolvers()
// console.log(promise)
// resolve()
// console.log(promise)
// reject()
// console.log(promise)
