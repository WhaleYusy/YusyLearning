const fs = require('fs');
// fs.writeFile('./座右铭.txt', 'Hello NodeJs!', err => {
//   if(err){
//     console.log(err);
//     return
//   }else{
//     console.log('成功');
//   }
// })
// fs.appendFileSync('./座右铭.txt', '\nHello NodeJs!')
// console.log(1);

const ws = fs.createWriteStream('./座右铭2.txt')

ws.write('123')
ws.write('456')
ws.write('789')