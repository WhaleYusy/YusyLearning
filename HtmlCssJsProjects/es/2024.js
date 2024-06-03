/**
 * 1、Promise.withResolvers 自定义promise解构
 * const { promise, resolve, reject } = Promise.withResolvers()
 */

// const { promise, resolve, reject } = Promise.withResolvers()
// resolve(100)
// reject(200)
// promise
//   .then(res => {
//     console.log('res: ' + res)
//   })
//   .catch(err => {
//     console.log('err: ' + err)
//   })
//   .finally(() => {
//     console.log('finally')
//   })

/**
 * 2、Object.groupBy 数组分组转成Object形式
 */
// const arr = [
//   { name: 'yushengyu', age: 30, sex: true },
//   { name: 'huangyuxia', age: 31, sex: false },
//   { name: 'yuxiaojing', age: 2, sex: false }
// ]

// console.log(
//   Object.groupBy(arr, (item, index) => {
//     return item.sex ? 'male' : 'famale'
//   })
// )
// // {
// //     'male': [{ name: 'yushengyu', age: 30, sex: true }],
// //     'famale': [{ name: 'huangyuxia', age: 31, sex: false }, { name: 'yuxiaojing', age: 2, sex: false }]
// // }

/**
 * 3、Map.groupBy 数组分组转成Map形式
 */
// const arr = [
//   { name: 'yushengyu', age: 30, sex: true },
//   { name: 'huangyuxia', age: 31, sex: false },
//   { name: 'yuxiaojing', age: 2, sex: false }
// ]

// console.log(
//   Map.groupBy(arr, (item, index) => {
//     return item.sex ? 'male' : 'famale'
//   })
// )

/**
 * 4、Atomics.waitAsync
 * 看不懂，略过
 */
// const sab = new SharedArrayBuffer(1024)
// const int32 = new Int32Array(sab)

// const result = Atomics.waitAsync(int32, 0, 0, 2000)
// console.log(result)
// Atomics.notify(int32, 1)

// setTimeout(() => {
//   console.log(result)
// }, 1000)
// setTimeout(() => {
//   console.log(result)
// }, 3000)

/**
 * 5、String.prototype.isWellFormed
 * 返回该字符串是否包含单独代理项的布尔型
 */
const strings = [
  // 单独的前导代理
  'ab\uD800',
  'ab\uD800c',
  // 单独的后尾代理
  '\uDFFFab',
  'c\uDFFFdd',
  // 格式正确
  'abc',
  'ab\uD830\uDE04c'
]

for (const str of strings) {
  console.log(str.isWellFormed())
}

/**
 * 6、String.prototype.toWellFormed
 * 单独代理项被替换成Unicode
 */
for (const str of strings) {
  console.log(str.toWellFormed())
}
