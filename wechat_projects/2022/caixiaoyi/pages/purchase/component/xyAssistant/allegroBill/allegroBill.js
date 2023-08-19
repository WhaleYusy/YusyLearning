// pages/purchase/component/xyAssistant/allegroBill/allegroBill.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:"1",
    abList: [{
      size: "12X21",
      account: 10,
      level: 2,
      weight: 0.4,
      address: "深圳宝安",
      isPay: true
    },{
      size:"19X31",
      account:40,
      level:3,
      weight:0.6,
      address:"深圳龙华",
      isPay:true
    },{
      size:"7X10",
      account:30,
      level:6,
      weight:0.2,
      address:"深圳西乡",
      isPay:false
    }]
  },
  // 切换订单状态显示数据
  ontabType: function (event) {
    var type = event.currentTarget.dataset.type;
    if(type == this.data.type){
      return;
    }
    var nlist = [{
      size: "122X221",
      account: 1890,
      level: 20,
      weight: 1.4,
      address: "深圳南山",
      isPay: true
    }];
    this.setData({
      type: type,
      abList:nlist
    })
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