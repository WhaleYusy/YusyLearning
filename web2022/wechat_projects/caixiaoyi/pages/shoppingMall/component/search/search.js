// pages/shoppingMall/component/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isSearch:false,
    pageSize:10,
    pageNum:1,
    total:0,
    showNoMore:false,
    keyWords:'',//搜索关键词
    searchList:[]
  },
  saveKeyword(e){
    let value = e.detail.value
    this.setData({
      keyWords:value
    })
  },
  onSearchClick(e){
    let item = e.currentTarget.dataset.item
    wx.navigateTo({
      url: `/pages/shoppingMall/component/pageDetail/pageDetail?id=${item.id}`
    })
  },
  onSearch(){
    if (this.data.keyWords == "" || this.data.keyWords==null){
      wx.showToast({
        title: '请输入关键字搜索',
        icon:"none"
      })
      return;
    }
    this.setData({
      searchList:[]
    })
    this.getsearchList();
  },
  getsearchList() {
    wx.showLoading({
      title: '加载中...'
    })
    this.setData({
      isSearch:true 
    })
    let params = {
      pageNum: this.data.pageNum,
      pageSize: this.data.pageSize,
      keyWords:this.data.keyWords,
    }
    let arr = JSON.parse(JSON.stringify(this.data.searchList))
    global.$ajax('/uac/auth/goods/queryGoods', params, { type: 'POST' }).then(res => {
      if (res.data.code == 200) {
        arr = arr.concat(res.data.result.list)
        this.setData({
          searchList: arr,
          total: Number(res.data.result.count)
        })
        this.setData({
          isSearch: false
        })
        if (this.data.total == this.data.searchList.length || res.data.result.total.length == 0) {
          this.setData({
            showNoMore: true
          })
        }
      }
    }).catch(err => {
      wx.hideLoading()
      this.setData({
        isSearch: false
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getsearchList()
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
      this.getsearchList();//拉取
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})