// pages/purchase/component/xyAssistant/setPassword/setPasssword.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    oldPswd:'',
    newPswd:'',
    setType:'',
    userInfo:null,
    loading:false,
  },
  getUserInfo() {
    global.$ajax("/uac/auth/wx/common/findUserInfo", {},{type:'POST'}).then(res => {
      if (res.data.code == 200) {
        this.setData({
          userInfo: res.data.result
        })
      }
    });
  },
  setValue(e){
    let value = e.detail.value
    let key = e.currentTarget.dataset.key
    let reg = /^\d$/.test(value)

    if (key == 'oldPswd' && /^\d{0,6}$/.test(value) ){
      this.setData({
        oldPswd: String(value).slice(0,6)
      })
    } else if (key == 'newPswd' && /^\d{0,6}$/.test(value) ){
      this.setData({
        newPswd: String(value).slice(0, 6)
      })
    } else if (!(/^\d{0,6}$/.test(value)) && key == 'newPswd'){
      this.setData({
        newPswd: ''
      })
    } else if (!(/^\d{0,6}$/.test(value)) && key == 'oldPswd') {
      this.setData({
        oldPswd: ''
      })
    }
  },
  // 确认
  changePaswd() {
    if (
      this.data.userInfo.payPassword != "" &&
      this.data.userInfo.payPassword != null
    ) {
      if (this.data.oldPswd == "") {
        wx.showToast({
          title: '请输入旧密码',
          icon:'none'
        })
      } else if (this.data.newPswd == "") {
        wx.showToast({
          title: '请输入新密码',
          icon: 'none'
        })
      } else if (!/^\d{6}$/.test(this.data.newPswd)) {
        wx.showToast({
          title: '密码格式错误，请重新输入',
          icon: 'none'
        })
      } else {
        this.setPassword();
      }
    } else {
      if (this.data.newPswd == "") {
        wx.showToast({
          title: '请输入密码',
          icon: 'none'
        })
      } else if (!/^\d{6}$/.test(this.data.newPswd)) {
        wx.showToast({
          title: '密码格式错误，请重新输入',
          icon: 'none'
        })
      } else {
        this.setPassword();
      }
    }
  },

  // 设置密码
  setPassword() {
    // this.setData({
    //   oldPswd: setEncode64(this.data.oldPswd),
    //   newPswd: setEncode64(this.data.newPswd)
    // })
    let params = {
      oldPassword: setEncode64(this.data.oldPswd),
      newPassword: setEncode64(this.data.newPswd)
    }
    console.log(params)
    if(this.data.loading){
      // return 
    }
    this.setData({
      loading:true
    })
    global.$ajax("/uac/auth/user/setPayPassword", params).then(res => {
      if (res.data.result.code == 1) {
        // console.log(res);
        wx.showToast({
          title: res.data.result.msg,
          icon: 'none'
        })
        // if (this.data.setType != undefined){
        // }
        setTimeout(function(){
          wx.navigateBack({})
        },1000);
        this.setData({
          loading: false
        })
      } else {
        wx.showToast({
          title: res.data.result.msg,
          icon: 'none'
        })
        this.setData({
          loading: false
        })
      }
    }).catch(err=>{
      this.setData({
        loading:false
      })
    })
  },

  forgetPwd(){
    //忘记密码
    wx.navigateTo({
      url: '/pages/purchase/component/xyAssistant/forgetPassword/forgetPassword',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      setType:options.setType
    })
    this.getUserInfo()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
function setEncode64(input) {
  var keyStr = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=`;
  let output = "";
  let chr1,
    chr2,
    chr3 = "";
  let enc1,
    enc2,
    enc3,
    enc4 = "";
  let i = 0;
  do {
    chr1 = input.charCodeAt(i++);
    chr2 = input.charCodeAt(i++);
    chr3 = input.charCodeAt(i++);
    enc1 = chr1 >> 2;
    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
    enc4 = chr3 & 63;
    if (isNaN(chr2)) {
      enc3 = enc4 = 64;
    } else if (isNaN(chr3)) {
      enc4 = 64;
    }
    output =
      output +
      keyStr.charAt(enc1) +
      keyStr.charAt(enc2) +
      keyStr.charAt(enc3) +
      keyStr.charAt(enc4);
    chr1 = chr2 = chr3 = "";
    enc1 = enc2 = enc3 = enc4 = "";
  } while (i < input.length);
  return output;
}