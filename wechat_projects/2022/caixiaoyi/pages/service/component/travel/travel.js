// pages/service/travel/travel.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showNoMore:false,
    active:2,
    queryData:{
      pageNum:1,
      pageSize:10
    },
    total:0,
    swiperData:[],
    travelData:[]
  },
  // 内容跳转内容页面
  onNavigateCon: function (e) {
    let id = e.currentTarget.dataset.item.id
    wx.navigateTo({
      url: `travelContent/travelContent?id=${id}`
    })
  },
  //返回服务易首页
  rServiceIndex:function(){
    wx.switchTab({
      url: "/pages/service/serviceacIndex"
    })
  },
  getSwiper(){
    // /uac/auth/tour/findTourBannerList
    global.$ajax('/uac/auth/tour/findTourBannerList',{},{type:'GET'}).then(res=>{
      if(res.data.code == 200){
        this.setData({
          swiperData:res.data.result
        })
        if(this.data.swiperData.length == 0){
          this.data.swiperData.push('https://qiniuoss.822644.com/wxPic/20200117/805758410606781440.jpg')
          this.setData({
            swiperData:this.data.swiperData
          })
        }
      }
    }).catch(res=>{
      console.log(res)
    })
  },
  getTourList(){
    wx.showLoading({
      title: '加载中...',
      mask:false
    })
    global.$ajax('/uac/auth/tour/findTourProjectList',this.data.queryData,{type:'POST'}).then(res=>{
      let arr = JSON.parse(JSON.stringify(this.data.travelData))
      if(res.data.code == 200){
        arr = arr.concat(res.data.result.list)
        this.setData({
          travelData:arr,
          total: Number(res.data.result.total)
        })
        if (this.data.total == this.data.travelData.length || res.data.result.list.length == 0){
          this.setData({
            showNoMore:true
          })
        }
      }
    }).catch(res=>{
      console.log(res)
      wx.hideLoading()
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSwiper()
    this.getTourList()
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
    if (!this.data.showNoMore){
      this.data.queryData.pageNum += 1
      this.setData({
        queryData: queryData
      })
      this.getTourList()
    }else{
      console.log("没有啦")
    }
  },  

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})