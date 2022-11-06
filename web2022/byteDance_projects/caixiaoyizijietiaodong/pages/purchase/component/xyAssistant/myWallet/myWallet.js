// pages/purchase/component/xyAssistant/myWallet/myWallet.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    telephone:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  // 设置支付密码
  changePassword(){
    tt.navigateTo({
      url: "/pages/purchase/component/xyAssistant/setPassword/setPasssword"
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 获取用户信息
    global.$ajax(`/uac/auth/user/findUserInfo`).then((res) => {
      console.log(res)
      if (res.data.code == 200){
        this.setData({
          telephone: res.data.result.payTelephone
        })
      }
    })
  },
  // 绑定手机号
  bindPhone(){
    if(!this.data.telephone){
      tt.navigateTo({
        url: '/pages/purchase/component/xyAssistant/bindPhone/bindPhone'
      })
    }
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