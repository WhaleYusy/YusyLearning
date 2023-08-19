const express = require('express')
const app = express()

app.use((req, res, next) => {
  console.log("服务器1被调用了");
  next()
})

app.get('/students', (req,res) => {
  const students = [
    {id: 1, name: 'Tom', age: 18},
    {id: 2, name: 'Jerry', age: 19},
    {id: 3, name: 'Tony', age: 20},
  ]
  res.send(students)
})

app.listen(5000, (err) => {
  if(!err) console.log('server1已启动，学生信息接口为http://localhost:5000/students');
})