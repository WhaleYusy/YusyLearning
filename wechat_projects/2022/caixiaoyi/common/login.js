var code = "";
//获取用户信息
function getUserInfo(encryptedData, iv, type, isShowSuccess) {
  // 发送 res.code 到后台换取 openId, sessionKey, unionId
  console.log(type)

  global.$ajax("/wechat/login",
    { username: 'admin', password: 'admin123' }
   , {
      type: "POST"
    })
    .then(data => {
      console.log(data)
      // if(res.code){
      // debugger;
      // }
      // global.state.userInfo = data.user
      // global.state.token = data.token;
      // console.log(global.state.userInfo)
      // console.log(global.state.token)
      //缓存
      global.zSetData('userInfo', data.user, true);
      global.zSetData('token', data.token, true);
      if (data.numNoSendOldOrder > 0) {
        wx.showTabBarRedDot({
          index: 4
        });
      }
      if (type == "authorized") {
        wx.navigateBack();
      }
      if (!isShowSuccess) {
        wx.showToast({
          title: '登录成功',
        })
        // console.log(wx.getStorageSync("userInfo"))
      }
    }).catch((res=>{ console.log(res) }))
}

//判断登录状态
var onLogin = function (isMicroShop) {
  wx.login({
    success: res => {
      code = res.code;
      console.log(res.code)
      // 获取用户信息
      wx.getSetting({
        success: res => {
          console.log(res);
          console.log(res["authSetting"]['scope.userInfo'])
          if (res["authSetting"]['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
            wx.getUserInfo({
              success: data => {
                console.log(code);
                getUserInfo(data.encryptedData, data.iv, code, true);
              }
            })
          } else {
            // debugger
            // wx.redirectTo({
            //   url: '/pages/home/authorized/authorized',
            // })
            // wx.navigateTo({
            //   url: '/pages/login/login'
            // })
          }
        }
      })
    }
  })
}

//登录成功回调
let userInfoState = true;
global.checkLogin = function (callback) {
  if (global.state.userInfo.token) {
    userInfoState = false;
    callback();
  } else if (userInfoState) {
    var userInfo = {};
    Object.defineProperty(global.state, 'userInfo', {
      get: function (val) {
        return userInfo;
      },
      set: function (newVal) {
        userInfo = newVal;
        if (newVal.token && userInfoState) {
          userInfoState = false;
          callback();
        }
      }
    })
  }
}
//支付
global.getPay = function (data, successCallback, failureCallback) {
  global.$ajax("/uac/auth/wxPay/prepay", data, { type: "POST" }).then(data => {
    if (data.code == 1 && payType === 1) {   // 微信支付
      wx.requestPayment({
        timeStamp: data.map.timeStamp,
        nonceStr: data.map.nonceStr,
        package: data.map.package,
        signType: data.map.signType,
        paySign: data.map.paySign,
        'success': function (res) {
          successCallback(res);
        },
        'fail': function (res) {
          if (failureCallback) {
            failureCallback(res);
          }
        }
      })
    }

  }).catch(res => {
    if (failureCallback) {
      failureCallback(res);
    }
  });
}
module.exports = {
  onLogin,
  getUserInfo
}