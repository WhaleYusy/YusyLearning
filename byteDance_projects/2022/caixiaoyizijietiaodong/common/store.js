
var userInfo = {}
var token =''
userInfo = tt.getStorageSync("userInfo") === '' ? {} : tt.getStorageSync("userInfo")
// console.log(tt.getStorageSync("userInfo"))
token = tt.getStorageSync("token") === '' ? '' : JSON.parse(tt.getStorageSync("token"))
// token = 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6Im91a2RMNUNQalUzQTZHb1hXak14TnJZSHp2UmMifQ.h3lYwkNrPCRLVpY5MHTT5PMQBOklRllVULURJB5Hvoc'
global.state = {
  ajaxNum:0,
  //用户信息 
  userInfo: userInfo,
  token: token,
  rpx: 0.5,
  //请求地址
  // baseUrl: "http://micapi.qzdcloud.com",
  // baseUrl: "http://192.168.0.201:7979",
    //  baseUrl: "http://192.168.0.86:7979",
  // baseUrl: "http://192.168.0.197:7979",
  // baseUrl: "http://cxyapi.qzdcloud.com",
 baseUrl: "https://api.822644.com",
  // baseUrl: "http://192.168.0.123:7979",
  // imgBaseUrl: "http://image.qzdcloud.com/",
  imgBaseUrl:"http://120.77.36.117/",
  //投票人信息
  voterList: [],
  //筛选商品类型
  goodsType: {},
  //立即购买，购物车结算数据传递
  buyInfo: {},
  hobbyList: [],
  orderGoods: {}
}
global.zSetData = (oldValue, json, storage = false) => {
  if (oldValue) {
    global.state[oldValue] = json;
    if (storage) {
      tt.setStorage({
        key: oldValue,
        data: JSON.stringify(json)
      })
    }
  }
}

global.shareConfig = function (title, path, imageUrl) {
  var title = title || "采销更容易，爱上【采销易】";
  // var path = path || "/pages/home/home/home";
  var path = path || "pages/purchase/purchaseIndex?pid=" + global.state.userInfo.userId;
  var imageUrl = imageUrl || "http://qiniuoss.822644.com/wxPic/20191125/767178300916273152.png";
  return {
    title: title,
    desc: title,
    path: path,
    imageUrl: imageUrl
  }
};
//refresh

global.overShare = function(){  //暂时没有全局监听路由的功能
  // console.log("全局路由监听")
}