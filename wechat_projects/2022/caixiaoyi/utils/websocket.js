// 聊天室
var url = 'ws://im.822644.com/ws'; 
// var utils = require('./util.js');

function connect(func) {
  wx.connectSocket({
    url: url,
    header: { 'content-type': 'application/json' },
    success: function () {
      console.log('信道连接成功~')
      func();
    },
    fail: function () {
      console.log('信道连接失败~')
    }
  })
}
//发送消息
function send(msg) {
  console.log(JSON.parse(msg))
  wx.sendSocketMessage({
    data: msg
  });
}
module.exports = {
  connect: connect,
  send: send
}
