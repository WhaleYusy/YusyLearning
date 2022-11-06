// pages/shoppingMall/shoppingIndex.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageSize:10,
    pageNum:1,
    keyWords:"",
    imgUrls: [
      
    ],
    showNoMore:false,
    todaySpecialList: [], // 今日特惠
    recommendList: [], // 精品推荐列表
    total:0,
  },
  onTodayOddsClick(e){
    let id = e.currentTarget.dataset.v.id
    console.log(id)
    wx.navigateTo({
      url: `/pages/shoppingMall/component/pageDetail/pageDetail?id=${id}`
    })
  },
  onRightArrowClick(){
    wx.navigateTo({
      url: '/pages/shoppingMall/component/pageDetail/pageDetail'
    })
  },
  onRecommendClick(e) {
    let id = e.currentTarget.dataset.v.id
    wx.navigateTo({
      url: `/pages/shoppingMall/component/pageDetail/pageDetail?id=${id}`
    })
  },
  toPath(e){
    // let path = e.detail
    // wx.switchTab({
    //   url: path
    // })
  },
  getSwiper(){
    global.$ajax('/uac/auth/wxAdver/getAdverListByType', { type: 6 },{type:'POST'}).then(res=>{
      console.log('sw')
      console.log(res.data.result)
      this.setData({
        imgUrls:res.data.result
      })
    })
  },
  //今日特惠
  getToday(){
    global.$ajax('/uac/auth/goods/getPreferentiGoods', { }, { type: 'GET' }).then(res => {
      console.log("今日特惠")
      console.log(res.data.result.list)
     this.setData({
       todaySpecialList:res.data.result.list
     })
    })
  },
  //金品推荐
  getGoods(){
    console.log("??")
    global.$ajax('/uac/auth/goods/queryGoods', {pageSize:this.data.pageSize,pageNum:this.data.pageNum,keyWords:this.data.keyWords}, { type: 'POST' }).then(res => {
      let arr = JSON.parse(JSON.stringify(this.data.recommendList))
      if(res.data.code == 200){
        arr = arr.concat(res.data.result.list)
          this.setData({
            recommendList: arr,
            total: Number(res.data.result.count)
        })
        if (this.data.recommendList.length == this.data.total || res.data.result.total < this.data.pageSize){
          this.setData({
            showNoMore:true
          })
        }
      }
      console.log("gooda")
      console.log(res)
      
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSwiper()
    this.getToday()
    this.getGoods()
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
      this.setData({
        pageNum: this.data.pageNum + 1
      })
      this.getGoods()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})