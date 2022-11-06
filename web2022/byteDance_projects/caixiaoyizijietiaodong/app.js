import "./common/fetch.js"
import "./common/store.js"
import {
  onLogin
} from "./common/loginWxAuth.js"
App({
  onLaunch: function () {
     // I am global data
     onLogin()
     global.overShare()
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
