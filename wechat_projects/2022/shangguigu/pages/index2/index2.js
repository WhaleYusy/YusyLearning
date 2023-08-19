// pages/index2/index2.js
let datas = require('../../datas/list-data.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listArr: datas.list_data,
    swiperList: ['https://img1.baidu.com/it/u=4288790287,4081504524&fm=253&fmt=auto&app=138&f=JPEG?w=420&h=315', 'https://img0.baidu.com/it/u=2751205649,3771332885&fm=253&fmt=auto&app=138&f=PNG?w=602&h=355','https://img1.baidu.com/it/u=2429276717,3508580354&fm=253&fmt=auto&app=138&f=JPEG?w=461&h=300']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  toDetail(event){
    let index = event.currentTarget.dataset.index;
    wx.navigateTo({
      url: '/pages/detail/detail?index=' + index,
    })
  },
  carouselToDetail(event){
    console.log(event)
    let index = event.target.dataset.index;
    wx.navigateTo({
      url: '/pages/detail/detail?index=' + index,
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