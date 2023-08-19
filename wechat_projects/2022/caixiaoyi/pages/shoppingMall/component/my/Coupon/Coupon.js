// pages/shoppingMall/component/my/Coupon/Coupon.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    couponList: [],
    pageNum:1,
    pageSize:10,
    showNoMore:false
  },
  onImmediateUse(){
    wx.switchTab({
      url: '/pages/shoppingMall/index/shoppingIndex',
    })
  },
  getPuList(){
    wx.showLoading({
      title: '加载中...'
    })
    let params = {
      pageNum:this.data.pageNum,
      pageSize:this.data.pageSize
    }
    let arr = JSON.parse(JSON.stringify(this.data.couponList))
    global.$ajax('/uac/auth/wx/coupon/getPersonalCouponList',params,{type:'POST'}).then(res=>{
      if(res.data.code == 200){
        arr = arr.concat(res.data.result.list)
        this.setData({
          couponList:arr,
          total: Number(res.data.result.total)
        })
        if (this.data.total == this.data.couponList.length || res.data.result.total.length == 0){
          this.setData({
            showNoMore:true
          })
        }
      }
    }).catch(err=>{

    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getPuList();
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
    if(!this.data.showNoMore){
      this.setData({
        pageNum: this.data.pageNum + 1
      })
      this.getPuList();//拉取
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})