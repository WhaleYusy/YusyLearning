var code = "";
//获取用户信息
function getUserInfo(encryptedData, iv, type, isShowSuccess) {
  // 发送 res.code 到后台换取 openId, sessionKey, unionId
  // console.log(global.state.referrerId)
  wx.login({
    success: res => {
      code = res.code;
      let requestData = {
        code: code,
        encryptedData: encryptedData || '',
        iv: iv || '',
        pid: ""
      }
      if (global.state.pid) {
        requestData.pid = global.state.pid;
      }
      global.$ajax("/uac/auth/wxMiniAppLogin/wxApp/wxLogin", requestData, {
        type: "POST"
      }).then(data => {
        console.log(data)
        if (data.data.code == 200){            
          global.zSetData('userInfo', data.data.result.user, true); 
          global.zSetData('userInfoJson', data.data.result.user); 
          global.zSetData('token', data.data.result.user.token, true); 
          if (type == "authorized") {
            wx.navigateBack();
            wx.showToast({
              title: '授权成功',
              duration:3000
            })
          }
          // if (global.state.referrerId) {
          //   delete (global.state["pid"]);
          // }
        }
      });
    }
  })
}

//判断登录状态
var onLogin = function () {
  wx.login({
    success: res => {
      code = res.code;
      // 获取用户信息
      wx.getSetting({
        success: res => {
          if (res["authSetting"]['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框    
            wx.getUserInfo({
              success: data => {
                getUserInfo(data.encryptedData, data.iv, "");
              }
            })
          } else {
            console.log("loginWxAuth111")
            if (wx.getStorageSync("authorizedCount") == 1) { //用于处理与fetch.js的调用接口提示的重复提示
              return;
            }else{
              wx.setStorageSync("authorizedCount", 1)
            }
            // // getUserInfo();
            // let sendData = { code: code };
            // if (global.state.referrerId) {
            //   sendData.shareId = global.state.referrerId;
            // }
            // global.$ajax("/uac/auth/wxAppLogin/wxLogin", sendData, {
            //   type: "POST"
            // }).then(data => {
            //   console.log(data)
            //   global.zSetData('userInfo', data, true);
            //   console.log(global.state.userInfo);
            //   if (global.state.referrerId) {
            //     delete (global.state["referrerId"]);
            //   }
            // });
            wx.showModal({
              title: '授权提示',
              content: '您还未授权，请点击前往授权页面进行授权',
              success:(res)=>{
                if(res.confirm){
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
              complete: (res) => {
                wx.setStorageSync("authorizedCount", 0)
              }
            })
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
// 支付
global.getPay = function (url, data, successCallback, failureCallback) {
  global.$ajax(url, data, { type: "POST" }).then(data => {
    if (data.data.result.code == 1 ) {   // 微信支付
      wx.requestPayment({
        timeStamp: data.data.result.map.timeStamp,
        nonceStr: data.data.result.map.nonceStr,
        package: data.data.result.map.package,
        signType: data.data.result.map.signType,
        paySign: data.data.result.map.paySign,
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