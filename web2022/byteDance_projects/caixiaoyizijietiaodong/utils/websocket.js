// 聊天室
var url = 'ws://im.822644.com/ws'; 


function connect(func) {
  return tt.connectSocket({
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
  tt.sendSocketMessage({
    data: msg
  });
}
module.exports = {
  connect: connect,
  send: send
}
