//app.js
import "./common/store.js"
import "./common/fetch.js"
import {
  onLogin
} from "./common/loginWxAuth.js"
App({
  onLaunch: function () {
    onLogin()
    global.overShare()
    // 新需求 弹框关注 暂时注释 2019.12.19
    wx.setStorage({ //记录每次登录的弹框状态
      key:'loginStatus',
      data:false
    })
    if (wx.getStorageSync('loginStatusNum')){ //记录未授权用户弹框二维码
    } else {
      wx.setStorage({
        key: 'loginStatusNum',
        data: 0
      })
    }

    // if (wx.getStorageSync("token") === '' || wx.getStorageSync("userInfo") === {}) {
    //   console.log("去登陆吧")
    //   wx.redirectTo({
    //     url: '/pages/login/login',
    //   })
    // } else {
    //   // wx.navigateTo({
    //   //   url: '/pages/home/home',
    //   // })
    //   wx.navigateBack({

    //   })
    // }
  },
  onShow: function (options) {
    console.log(options)
    if (options.query.pid != null && options.query.pid != undefined) {
      global.state.pid = options.query.pid
    }
  },
  globalData: {
    userInfo: null,
    config: {
      theme: {
        active: ''
      }
    }
  }
})