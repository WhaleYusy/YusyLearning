// pages/purchase/component/xyAssistant/myReword/myReword.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    noMore: false,
    loadMore: false,
    pageNum: 1,
    pageSize: 10,
    rewordList: [],
    total: 0,
    showNoMore: false
  },
  // 返回小易助手主页
  rLastPage: function () {
    tt.navigateBack({
      delta: 1
    })
  },
  getMyRewardDemandList() {
    //打赏列表
    global.$ajax('/uac/auth/wx/common/findRewardDemandList', { pageNum: this.data.pageNum, pageSize: this.data.pageSize }, { type: 'POST' }).then(res => {
      if (res.data.code == 200) {
        let arr = JSON.parse(JSON.stringify(this.data.rewordList))
        arr = arr.concat(res.data.result.list)
        this.setData({
          rewordList: arr,
          total: Number(res.data.result.total)
        })
        if (this.data.rewordList.length == res.data.result.total || res.data.result.total == 0) {
          //
          this.setData({
            showNoMore: true
          })
        }
      }
    }).catch(res => {
      console.log(res)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMyRewardDemandList()
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
    this.setData({
      rewordList: [],
      noMore: false,
      loadMore: false,
      pageNum: 1
    })
    this.getMyRewardDemandList();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.total !== this.data.rewordList && !this.data.noMore) {
      this.setData({
        pageNum: this.data.pageNum + 1
      })
      this.getMyRewardDemandList();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})