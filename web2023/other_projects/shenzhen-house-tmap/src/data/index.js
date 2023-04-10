const dataList = []
const houseData = import.meta.glob('./modules/*.js', {
  eager: true
})
for (const filePath in houseData) {
  dataList.push(...houseData[filePath].default)
}
export default dataList