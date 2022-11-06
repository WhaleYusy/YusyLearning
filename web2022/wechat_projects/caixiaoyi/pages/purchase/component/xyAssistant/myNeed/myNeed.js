// pages/purchase/component/xyAssistant/myNeed/myNeed.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    purchaseProductlist:[],
    total:null,
    showNoMore:false,
    loadMore:false,
    pageNum:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList();
  },
  // 获取列表
  getList(){
    let params = {
      pageNum: this.data.pageNum,
      pageSize:10
    }
    this.setData({
      loadMore:true
    })
    global.$ajax(`/uac/auth/wx/common/findPageInfoToDemand`, params).then((res)=>{
      if(res.data.code == 200){
        this.setData({
          purchaseProductlist: this.data.purchaseProductlist.concat(res.data.result.list),
          total: Number(res.data.result.total),
          loadMore: false
        })
        if (this.data.purchaseProductlist.length == this.data.total && this.data.total != 0){
          this.setData({
            showNoMore:true
          })
        }
      }
    })
  },
    //去到求购页的详情
  goPage(e) {
    let item = e.currentTarget.dataset.item
    wx.navigateTo({
      url: '/pages/purchase/component/mertialNeed/metialNeddDetail/metialNeddDetail?id=' + item.id
    })
  },
    //去到编辑
  goEdit(e) {
    let item = e.currentTarget.dataset.item
    wx.navigateTo({
      url: '/pages/purchase/component/pushPurchase/pushPurchase?id=' + item.id
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
    if (this.data.purchaseProductlist.length != this.data.total && !this.data.showNoMore ) {
      this.setData({
        pageNum: this.data.pageNum + 1
      })
      this.getList();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})