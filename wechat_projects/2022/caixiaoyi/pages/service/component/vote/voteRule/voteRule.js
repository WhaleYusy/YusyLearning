// pages/service/component/vote/voteRule/voteRule.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    coupon: {
      // couponPrice:33,
      // startTime:'2019-10-10',
      // endTime:'2019-10-10',
    },
    reward: {
      // content:'<div>规则还在路上哦</div>'
    },
    topBarParam: {
      title: "规则/奖品",
      clickType: 0,
      url: ""
    }
  },
  getFindVoteActionDetail(id) {
    global.$ajax(`/uac/auth/vote/findVoteActionDetail/${id}`, {}, { type: 'POST' })
      .then(res => {
        console.log("详情")
        console.log(res)
        if (res.data.code == 200) {
          // console.log(res);
          this.setData({
            reward:res.data.result,
            coupon:res.data.result.actionCoupon
          })
        }
      });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.getFindVoteActionDetail(options.id);
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