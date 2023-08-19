// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isGetUserInfo: true
  },
  handleParent: function () {
    wx.switchTab({
      url: '/pages/index2/index2'
    })
    // wx.navigateTo({
    //   url: '/pages/index2/index2'
    // })
    // wx.redirectTo({
    //   url: '/pages/index2/index2',
    // })
  },
  handleChild: function () {
    console.log("子元素");
  },
  bindGetUserInfo: function (e) {
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      isGetUserInfo: true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("onLoad");
    wx.getSetting({
      success: (res)=>{
        if (res.authSetting['scope.userInfo']){
          wx.getUserInfo({
            success:(e)=>{
              console.log(e)
              this.setData({
                userInfo: e.userInfo,
                isGetUserInfo:true
              })
            }
          })
        }else{
          this.setData({
            isGetUserInfo: false
          })
        }
      }
    })
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("onReady");
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("onShow");
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log("onHide");
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log("onUnload");
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log("onPullDownRefresh");
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("onReachBottom");
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    console.log("onShareAppMessage");
  }
})