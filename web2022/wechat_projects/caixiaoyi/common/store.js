
var userInfo = {}
var token =''
userInfo = wx.getStorageSync("userInfo") === '' ? {} : wx.getStorageSync("userInfo")
// console.log(wx.getStorageSync("userInfo"))
// token = wx.getStorageSync("token") === '' ? '' : JSON.parse(wx.getStorageSync("token"))
token = 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6Im91a2RMNUNQalUzQTZHb1hXak14TnJZSHp2UmMifQ.h3lYwkNrPCRLVpY5MHTT5PMQBOklRllVULURJB5Hvoc'
global.state = {
  ajaxNum:0,
  //用户信息
  userInfo: userInfo,
  token: token,
  rpx: 0.5,
  //请求地址
//   baseUrl: "http://micapi.qzdcloud.com",
  // baseUrl: "http://192.168.0.145:7979",
  //  baseUrl: "http://192.168.0.86:7979",
//   baseUrl: "http://cxyapi.qzdcloud.com",
  baseUrl: "https://api.822644.com",
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
      wx.setStorage({
        key: oldValue,
        data: JSON.stringify(json)
      })
    }
  }
}

global.shareConfig = function (title, path, imageUrl) {
  console.log(path)
  var title = title || "采销易";
  // var path = path || "/pages/home/home/home";
  var path = path || "pages/purchase/purchaseIndex?pid=" + global.state.userInfo.userId;
  var imageUrl = imageUrl || "http://qiniuoss.822644.com/wxPic/20191125/767178300916273152.png";
  console.log(path)
  return {
    title: title,
    path: path,
    imageUrl: imageUrl
  }
};
//refresh

//重写分享方法
global.overShare = function () {
  //监听路由切换
  //间接实现全局设置分享内容
  wx.onAppRoute(function (res) {
    //获取加载的页面
    let pages = getCurrentPages(),
      //获取当前页面的对象
      view = pages[pages.length - 1],
      data;
    console.log(view.route)
      //采购易详情  分享我的名片  供应商详情 旅游订单 分享我的企业 不需要重写
    if (view.route.indexOf("pages/purchase/component/mertialNeed/metialNeddDetail/metialNeddDetail") < 0 
      && view.route.indexOf("pages/purchase/component/xyAssistant/myCard/myCard") < 0 
      && view.route.indexOf("pages/supply/component/supplyDetail/supplyDetail") < 0
      && view.route.indexOf("pages/purchase/component/xyAssistant/travelBill/travelBill") < 0
      && view.route.indexOf("pages/purchase/component/xyAssistant/myCompany/myCompany") < 0){
        view.onShareAppMessage = function () {
          return {
            title: '采销更容易，爱上【采销易】',
            // path: view.route + "?pid=" + global.state.userInfo.userId
            imageUrl: "http://qiniuoss.822644.com/wxPic/20191122/765288437703020544.blob"
          };
        }
    }
  })
}
