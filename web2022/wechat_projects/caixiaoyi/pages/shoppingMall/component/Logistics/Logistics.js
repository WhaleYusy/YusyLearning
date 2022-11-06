// pages/shoppingMall/component/Logistics/Logistics.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topNavData: {
      title: "物流信息",
      clickType: 0,
      url: ""
    },
    id:'',
    active: 0, // 订单当前状态 
    logisticsList: [
      {
        context: '酸菜鱼正在为你揽件',
        time: '2019-10-01 12:09:09'
      }
    ],
    logistics: {
      expNo: '24546546464',
      expName: '韵达快递',

    },
  },
  getFindExpInfo() {
    global.$ajax(`/uac/auth/goodsOrder/findExpInfo/${this.data.id}`,{},{type:'GET'}).then(res => {
      if (res.data.code === 200) {
        if (res.data.result.code === 1) {
          this.data.logistics = res.data.result
          this.data.logisticsList = res.data.result.expInfo.data
          if (res.data.result.expInfo.state === '3') { // 已签收
            this.data.active = 0
          }
        }
        this.setData({
          logistics: this.data.logistics,
          logisticsList: this.data.logisticsList,
          active: this.data.active 
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id
    this.setData({
      id:id
    })
    this.getFindExpInfo()
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