// pages/service/component/vote/voteList/voteList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    voteList:[
      
    ],
    pageNum:1,
    pageSize:10
  },
  goPage(e){
    let item = e.currentTarget.dataset.item
    console.log(item)
    wx.navigateTo({
      url: `/pages/service/component/vote/voteIndex/voteIndex?id=${item.id}&status=${item.status}&name=${item.actionTitle}`
    })
  },
  getList() {
    wx.showLoading({
      title: '加载中',
      mask: false
    })
    global.$ajax("/uac/auth/vote/findVoteActionList", { pageSize: this.data.pageSize, pageNum: this.data.pageNum }, { type: 'POST' }).then(res => {
      let arr = JSON.parse(JSON.stringify(this.data.voteList))
      let tem = res.data.result.list
      arr = arr.concat(tem)
      this.setData({
        voteList:arr
      })
      wx.hideLoading()
      console.log('liebiao ')
      console.log(res)
    }).catch(err => {
      console.log(err)
      wx.hideLoading()
    })
  },
  getAdList() {
    global.$ajax('/uac/auth/wxAdver/getAdverListByType', { type: 1 }, { type: 'POST' }).then(res => {
      this.setData({
        imgUrls: res.data.result
      })
    }).catch(res => {

    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList()
    this.getAdList()
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
      voteList: [],
      pageNum: 1,
      pageSize: 10
    })
    this.getList()
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