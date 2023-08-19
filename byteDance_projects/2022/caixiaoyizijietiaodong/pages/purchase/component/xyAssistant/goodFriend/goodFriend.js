// pages/purchase/component/xyAssistant/goodFriend/goodFriend.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    friendList: [],
    param: {
      pageNum: 1,
      pageSize: 10
    },
    isShowMore: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      param: {
        pageNum: 1,
        pageSize: 10,
      },
      friendList: []
    })
    this.getFindCircleFirdenApplyList();
    this.setDeleteViewed();
  },
  // 获取新圈友列表
  getFindCircleFirdenApplyList: function () {
    global.$ajax('/uac/auth/wxfans/findCircleFirdenApplyList', this.data.param, { type: 'POST' }).then(res => {
      if (res.data.code == 200) {
        // console.log(res);
        if (res.data.result.list.length > 0) {
          var fList = this.data.friendList;
          fList = fList.concat(res.data.result.list);
          this.setData({
            friendList: fList
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
    });
  },
  // 删除查看过的验证信息
  setDeleteViewed() {
      global.$ajax('/uac/auth/wxfans/deleteViewed', {}, { type: 'GET' }).then(res => {
      if (res.data.code == 200) {
      }
    });
  },
  // 拒绝
  onRefuse(e) {
    // console.log(e.currentTarget.dataset.v)
    this.setPost(e.currentTarget.dataset.v, -1, "已拒绝");
  },

  // 同意
  onAgree(e) {
    // console.log(e)
    this.setPost(e.currentTarget.dataset.v, 1, "已同意");
  },

  // 函数请求封装
  setPost(data, status, msg) {
    console.log(data);
    var that = this;
    global.$ajax('/uac/auth/wxfans/confirmApplyStatus', {
      id: data.id,
      applyStatus: status,
      applicantUserId: data.applicantUserId
    }, { type: 'POST' }).then(res => {
        if (res.data.code == 200) {
          tt.showToast({
            icon: 'none',
            title: `您${msg}添加${data.nickName}为圈友`,
            complete: function () { 
              that.onLoad();
            }
          })
        }
      });
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