var code = "";
//获取用户信息
function getUserInfo(rowData) {
  // 发送 res.code 到后台换取 openId, sessionKey, unionId
  // console.log(global.state.referrerId)
  console.log("heiehi")
  tt.login({
    success: res => {
      console.log(res)
      code = res.code;
      let requestData = {
        code: code,
        rowData:rowData
      }
      console.log("546654")
      global.$ajax("/uac/auth/TTAPP/TTlogin", requestData, {
        type: "POST"
      }).then(data => {
        if (data.data.code == 200){            
          global.zSetData('userInfo', data.data.result.user, true); 
          global.zSetData('userInfoJson', data.data.result.user); 
          global.zSetData('token', data.data.result.user.token, true); 
          if (type == "authorized") {
            tt.navigateBack();
            tt.showToast({
              title: '授权成功',
              duration:3000
            })
          }
          if (global.state.referrerId) {
            delete (global.state["referrerId"]);
          }
        }
      });
    }
  })
}

//判断登录状态
var onLogin = function () {
  tt.login({
    success: res => {
      code = res.code;
      // 获取用户信息
      tt.getSetting({
        success: res => {
          console.log('43')
          console.log(res)
          if (res["authSetting"]['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框    
            console.log("getUser")
            tt.getUserInfo({
              success: data => {
                console.log('data')
                console.log(data.rawData)
                getUserInfo(data.rawData);
              }
            })
          } else {
            //  tt.showModal({
            //    title: '授权提示',
            //    content: '您还未授权，请点击前往授权页面进行授权',
            //    success:(res)=>{
            //      if(res.confirm){
            //        tt.navigateTo({
            //          url: '/pages/authorized/authorized'
            //        })
            //      }
            //   }
            //  })
            tt.authorize({
              scope: "scope.userInfo",
              success(data) {
                tt.getUserInfo({
                  success: data => {
                    console.log('data')
                    console.log(data.rawData)
                    getUserInfo(data.rawData);
                  }
                })
              }
            });
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
  tt.showToast({
    title: '微信支付功能暂未开放', // 内容
    icon: 'none'
  });
  return;
  //以上提示功能暂未开放 2020.01.16

  global.$ajax(url, data, { type: "POST" }).then(data => {
    if (data.data.result.code == 1 ) {   // 微信支付
      tt.requestPayment({
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