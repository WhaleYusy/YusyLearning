// pages/detail/detail.js
let datas = require('../../datas/list-data.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail:{},
    isCollected:false,
    isPlay:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let index = options.index;
    this.setData({
      detail: datas.list_data[index]
    })
  },
  toCollect(){
    this.setData({
      isCollected: !this.data.isCollected
    })
    let title = this.data.isCollected ? '收藏成功' : '取消收藏';
    let title2 = this.data.isCollected ? '数据保存收藏成功' : '数据保存取消收藏';
    wx.showToast({
      title,
      icon: 'success'
    })
    wx.setStorage({
      key: 'isCollected',
      data: this.data.isCollected,
      success:()=>{
        setTimeout(() => {
          wx.showToast({
            title: title2,
            icon: 'success'
          })
        },2000)
      }
    })
  },
  toPlay(){
    this.setData({
      isPlay : !this.data.isPlay
    })
    if (this.data.isPlay){
      wx.playBackgroundAudio({
        dataUrl: 'http://nx01.sycdn.kuwo.cn/442fca9c5c6e4a11eefd4d172982f889/5e4e98ba/resource/n2/36/44/1478416719.mp3'
      })
    }else{
      wx.pauseBackgroundAudio()
    }
  },
  toShare(){
    wx.showActionSheet({
      itemList: ['分享到朋友圈']
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