/**
 * Array遍历某个key获取value，费时间
 * 转化成Object后。直接根据key返回value
 */
function arrayToObject(array, keyAndValueName = { key: 'key', value: 'value' }) {
  const object = {},
    { key, value } = keyAndValueName
  array.forEach(arr => {
    object[arr[key]] = arr[value]
  })
  return object
}
// const testArr = [
//   { key: '001', value: '老大' },
//   { key: '002', value: '老二' },
//   { key: '003', value: '老三' }
// ]
// console.log(testArr)
// const testObj = arrayToObject(testArr)
// console.log(testObj)
// console.log(testObj['001'])
// console.log(testObj['004'])

// const testArr2 = [
//   {
//     dictKey: 'a',
//     dictLabel: 'A',
//     key: 'aaa',
//     value: 'AAA'
//   },
//   {
//     dictKey: 'b',
//     dictLabel: 'B',
//     key: 'bbb',
//     value: 'BBB'
//   },
//   {
//     dictKey: 'c',
//     dictLabel: 'C',
//     key: 'ccc',
//     value: 'CCC'
//   }
// ]
// console.log(testArr2)
// const testObj2 = arrayToObject(testArr2, { key: 'dictKey', value: 'dictLabel' })
// console.log(testObj2)
// console.log(testObj2.a)
// console.log(testObj2.d)

/**
 * Array遍历把某些值转成新值
 */
function arrayNameToNewName(
  array,
  oValue = { oldKey: 'dictKey', oldValue: 'dictLabel' },
  nValue = { newKey: 'key', newValue: 'value' }
) {
  const { oldKey, oldValue } = oValue,
    { newKey, newValue } = nValue
  return array.map(item => ({ [newKey]: item[oldKey], [newValue]: item[oldValue] }))
}
// const testArr3 = [
//   {
//     dictKey: 'a',
//     dictLabel: 'A'
//   },
//   {
//     dictKey: 'b',
//     dictLabel: 'B'
//   },
//   {
//     dictKey: 'c',
//     dictLabel: 'C'
//   }
// ]
// console.log(testArr3)
// const testArr31 = arrayNameToNewName(testArr3)
// console.log(testArr31)
// const testObj3 = arrayToObject(testArr31)
// console.log(testObj3)
// console.log(testObj3.b)
// console.log(testObj3.d)
// const testArr4 = [
//   {
//     name: 'aaa',
//     age: 18
//   },
//   {
//     name: 'bbb',
//     age: 25
//   },
//   {
//     name: 'ccc',
//     age: 60
//   }
// ]
// console.log(testArr4)
// const testArr41 = arrayNameToNewName(
//   testArr4,
//   { oldKey: 'name', oldValue: 'age' },
//   { newKey: 'verygood', newValue: 'soyoung' }
// )
// console.log(testArr41)
// const testObj4 = arrayToObject(testArr41, { key: 'verygood', value: 'soyoung' })
// console.log(testObj4)
// console.log(testObj4.ccc)
// console.log(testObj4.eee)
