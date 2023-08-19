// pages/purchase/component/xyAssistant/myBusiness/myBusiness.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mbList:[
    // {
    //   id:"111",//企业id
    //   supplierName:"酸菜鱼",
    //   logo:"/img/gzhImg/fengjing.jpg",
    //   regCapital: "888萬元", //单位万元
    //   supplierAddress:"广东深圳",
    //   establishTime:"2019-10-10 12:00:55",
    //   type: 1  //是否供应商 1供應商
    // }
    ],
    requestData: {
      pageSize: 10,
      pageNum: 1
    },
    showNoMore: false,
    total: 0
  },
  // 跳轉至公司詳情頁
  goBusinessDetail: function(e){
    let id = e.currentTarget.dataset.id
    console.log(id)
    //去详情
    wx.navigateTo({
      url: '/pages/supply/component/supplyDetail/supplyDetail?id=' + id
    })
  },
  //修改企业信息
  oneditBus: function(event){
    var id = event.currentTarget.dataset.id;
    console.log(id);
    wx.navigateTo({
      url: "/pages/purchase/component/xyAssistant/myBusinessEdit/myBusinessEdit?id=" + id
    })
  },
  // 我的企业列表
  getMyBusinessList() {
    wx.showLoading({
      title: '加载中...',
      mask: false
    })
    //其他需求列表
    global.$ajax('/uac/auth/wx/common/findPageInfoToSupplier', this.data.requestData, { type: 'POST' }).then(res => {
      console.log(res)
      let arr = JSON.parse(JSON.stringify(this.data.mbList))
      if (res.data.code == 200) {
        if (res.data.result.list.length > 0) {
          arr = arr.concat(res.data.result.list)
          this.setData({
            mbList: arr,
            total: Number(res.data.result.total)
          })
          if (this.data.total == this.data.mbList.length) {
            this.setData({
              showNoMore: true
            })
          }
        } else {
          //没有更多
          this.setData({
            showNoMore: true
          })
        }
        wx.hideLoading()
      }
    }).catch(err => {
      console.log(err)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMyBusinessList();
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
    if (!this.data.showNoMore) {
      this.data.requestData.pageNum += 1
      this.setData({
        requestData: this.data.requestData
      })
      this.getMyBusinessList();
    } else {
      console.log("已经没有更多了")
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})