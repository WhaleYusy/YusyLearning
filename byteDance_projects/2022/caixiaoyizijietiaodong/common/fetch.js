// import {
//   onLogin
// } from "./login.js"
import {
  onLogin
} from "./loginWxAuth.js"

const app = getApp();
console.log(app)
global.$ajax = function (url, data = {}, options = {}) {
  return new Promise((resolve, reject) => {
    var method = options.type || "post";
    var prompt = options.prompt || true; 
    if (global.state.ajaxNum <= 0) {
      tt.showLoading({
        title: '加载中',
        mask: true
      });
      // tt.showNavigationBarLoading();
    }
    if (global.state.ajaxNum > 5){
      return ;
    }
    global.state.ajaxNum ++;
    var user_token = global.state.token ? global.state.token : '';
    // var user_token ='eyJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6Im91a2RMNUZ3ajE3akY1c19qcE1oNmJfd3BXNlEifQ.qfjnsLgV9emw4wSt0ZrDZDGlkzU1DaJR9PCiTyZMkxM';
    // debugger
    tt.request({
      url: global.state.baseUrl + url,
      data: data,
      method: method,
      header: {
        // 'Content-Type': 'application/x-www-form-urlencoded',
        // 'Content-Type': 'application/json',
        'token': user_token || ''
      },
      success: res => {
        resolve(res)
      },
      complete: () => {
        global.state.ajaxNum = global.state.ajaxNum - 1;
        if (global.state.ajaxNum <= 0) {
          tt.hideLoading();
          // tt.hideNavigationBarLoading();
          tt.stopPullDownRefresh();
        }
      }
    });
  })
}