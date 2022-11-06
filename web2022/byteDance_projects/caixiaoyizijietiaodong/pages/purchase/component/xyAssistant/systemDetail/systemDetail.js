// pages/purchase/component/xyAssistant/systemDetail/systemDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msgList: [],
    param: {
      pageNum: 1,
      pageSize: 10
    },
    isShowMore: false
  },
  onMoreClick: function(){
    var p = this.data.param;
    p.pageNum = p.pageNum + 1;
    this.setData({
      param: p
    })
    this.getFindSysMsgByUser();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getFindSysMsgByUser();
    this.endSysMsg();
  },
  // 查询用户的系统消息列表
  getFindSysMsgByUser: function() {
    global.$ajax('/uac/auth/user/findSysMsgByUser', this.data.param, { type: 'POST' })
      .then(res => {
        console.log(res);
        if (res.data.code == 200) {
          var mList = this.data.msgList;
          if (res.data.result.list.length > 0) {
            mList = mList.concat(res.data.result.list);
            this.setData({
              msgList : mList
            })
            this.setData({
              isShowMore: false
            })
          } else {
            this.setData({
              isShowMore: true
            })
          }
        }
      })
  },
  // 查看信息清理助手信息红点
  endSysMsg(){
    global.$ajax('/uac/auth/user/deleteUnReadSysMsg', {}, { type: 'POST' })
      .then(res => {
        if (res.data.code == 200) {

        }
      })
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