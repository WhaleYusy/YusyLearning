const express = require('express')
const app = express()

app.use((req, res, next) => {
  console.log("服务器2被调用了");
  next()
})

app.get('/cars', (req,res) => {
  const students = [
    {id: 1, name: '宝马', age: '2M'},
    {id: 2, name: '奔驰', age: '999K'},
    {id: 3, name: '奥托', age: '10K'},
  ]
  res.send(students)
})

app.listen(5001, (err) => {
  if(!err) console.log('server2已启动，车辆信息接口为http://localhost:5001/students');
})