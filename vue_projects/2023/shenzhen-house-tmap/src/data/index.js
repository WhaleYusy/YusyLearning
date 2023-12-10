const dataList = []
const houseData = import.meta.glob('./modules/*.js', {
  eager: true
})
for (const filePath in houseData) {
  houseData[filePath].default.forEach(item => {
    item.date = filePath?.split('./modules/')[1]?.split('.js')[0] || ''
  })
  dataList.push(...houseData[filePath].default)
}
// const houseData2 = import.meta.glob('./history/*.js', {
//   eager: true
// })
// for (const filePath in houseData2) {
//   houseData2[filePath].default.forEach(item => {
//     item.date = filePath?.split('./history/')[1]?.split('.js')[0] || ''
//   })
//   dataList.push(...houseData2[filePath].default)
// }
export default dataList