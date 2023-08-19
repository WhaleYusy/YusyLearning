// pages/purchase/component/editorPage/editorPage.js
Page({
  data: {
    node:'',
    //先写死数据做测试
    // id:'801400947442988032',
    // orderId:'801400947149386752',
    // url:''
  },
  bindmessageFun(){
    console.log(1)
  },
  onLoad: function (options) {
    let id = options.id
    let orderId = options.orderId
    let type = options.type
    // let url = `http://127.0.0.1:5500/jsComouted/uploadQiniu.html?id=${this.data.id}&orderId=${this.data.orderId}`
    let token = tt.getStorageSync('token');
    // http://byteweb1.qzdcloud.com/comback.html
    // let url = `http://byteweb1.qzdcloud.com/uploadQiniu.html?id=${id}&token=${token}&orderId=${orderId}`
    
    // this.setData({
    //   url:url
    // })

    //用于解析富文本的时候
    // let str = 'd<span style="color: rgb(255, 128, 128);">adasdad</span><span style="color: rgb(0, 255, 255);">asadasdasd</span><div><span style="color: rgb(0, 255, 255);">asdasdasdasdas</span>dasdasdasdas</div><div>asdd<span style="color: rgb(128, 128, 192);">asdasdasdas</span>das</div><div>a<span style="color: rgb(64, 128, 128);">sdasdasd</span>asdasdas</div><div>asddasd<span style="color: rgb(128, 64, 0);">adasda</span>sdasdasdas</div><div>asdas<span style="color: rgb(255, 128, 64);">dasdasdasda</span>sdasdasdsda</div><div><img src="http://qiniuoss.822644.com/wxPic/20200110/800716255072891904.jpg"><br></div>'
    // if (str != null) {
    //   if (str.indexOf("<img") > -1) {
    //     str = str.replace(/<img/g, '<img style="max-width:100%;height:auto" ') //防止富文本图片过大
    //   } 
    //   if (str.indexOf("<p") > -1) {
    //     str = str.replace(/<p/g, '<p style="word -break: break-all; " ') //防止不换行
    //   }
    // }

    // this.setData({
    //   node:str
    // })
  }
})