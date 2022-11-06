// import {
//   onLogin
// } from "./login.js"
import {
  onLogin
} from "./loginWxAuth.js"

const app = getApp();
global.$ajax = function (url, data = {}, options = {}) {
  return new Promise((resolve, reject) => {
    var method = options.type || "post";
    var prompt = options.prompt || true; 
    if (global.state.ajaxNum <= 0) {
      // wx.showLoading({
      //   title: '加载中',
      //   mask: true
      // });
      wx.showNavigationBarLoading();
    }
    if (global.state.ajaxNum > 5){
      return ;
    }
    global.state.ajaxNum ++;
    var user_token = global.state.token ? global.state.token : '';
    // var user_token ='eyJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6Im91a2RMNUZ3ajE3akY1c19qcE1oNmJfd3BXNlEifQ.qfjnsLgV9emw4wSt0ZrDZDGlkzU1DaJR9PCiTyZMkxM';
    // debugger
    wx.request({
      url: global.state.baseUrl + url,
      data: data,
      method: method,
      header: {
        // 'Content-Type': 'application/x-www-form-urlencoded',
        // 'Content-Type': 'application/json',
        'token': user_token || ''
      },
      success: res => {
        console.log(res)
        if (res.data.result !== null && res.data.result !== undefined && res.data.result.isLogin === false) {
          console.log("fetch111")
          if (wx.getStorageSync("authorizedCount") == 1){ //用于处理与loginWxAuth.js的授权的重复提示
            return;
          } else {
            wx.setStorageSync("authorizedCount", 1)
          }
          wx.showModal({
            title: '授权提示',
            content: '您还未授权，请点击前往授权页面进行授权',
            success: (res) => {
              if (res.confirm) {
                wx.navigateTo({
                  url: '/pages/authorized/authorized'
                })
              } else if (res.cancel) {
                // console.log("返回上一級頁面")
                wx.navigateBack({
                  delta: 1
                })
              }
            },
            complete:(res)=>{
              wx.setStorageSync("authorizedCount", 0)
            }
          })
         return  
        }
        resolve(res)
        // if (res.data.code === 200 || res.data.code === 1 || res.statusCode == 200) {
        //   resolve(res);
        // } else {
        //   resolve(res);
          //重新登录5次就不再进行登录
          // let num = wx.getStorageSync('loginTimes') == '' ? 0 : Number(wx.getStorageSync('loginTimes'))+1
          // wx.setStorageSync('loginTimes', num)
          // if (Number(wx.getStorageSync('loginTimes')) > 5){
          //   return 
          // }
          //token超时的时候，有账号密码则自动登录，否则就去登录页面
          // let that = this;
          // let username = JSON.parse(wx.getStorageSync('username')) 
          // let password = JSON.parse(wx.getStorageSync('password'))
          
          // if (username !== '' && password !== ''){
          //   global.$ajax("/wechat/login", { username: username, password: password }, { type: "POST" }).then(res => {
          //     console.log(res)
          //     if (res.code == 1) {
          //       global.zSetData('userInfo', res.data.user, true);
          //       global.zSetData('token', res.data.token, true);
          //       global.zSetData('username', username, true);
          //       global.zSetData('password', password, true);
          //       // wx.showToast({
          //       //   title: '登陆成功',
          //       // })
          //     } 
          //   }).catch((res) => {
          //     console.log("catch")
          //     console.log(res)
          //   })
          // }else{
          //   wx.showToast({
          //     title: '请先登录',
          //     icon:'none'
          //   })
          //   wx.reLaunch({
          //     url: '/pages/login/login',
          //   })
          // }
        // }
      },
      fail: err => {
        reject(err);
        wx.hideLoading();
        wx.showToast({
          title: '请求超时,请刷新重试~',
          icon: 'none'
        })
      },
      complete: () => {
        global.state.ajaxNum = global.state.ajaxNum - 1;
        if (global.state.ajaxNum <= 0) {
          wx.hideLoading();
          wx.hideNavigationBarLoading();
          wx.stopPullDownRefresh();
        }
      }
    });
  })
}