// pages/service/component/news/news.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showNoMore:false,
    queryData:{
      pageNum:1,
      pageSize:10
    },
    purchaseProductlist: [
      // {
      // logo:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=4045567916,990363638&fm=26&gp=0.jpg',
      // title:'国外优秀的网页界面设计,国外优秀的网页界面设计,国外优秀的网页界面设计,国外优秀的网页界面设计,国外优秀的网页界面设计,国外优秀的网页界面设计,国外优秀的网页界面设计',
      // createdTime:'2019-01-01 10:10:10'
      // },
      
    ],
  },
  onSeeNewListDetails(e){
    let v = e.currentTarget.dataset.v
    console.log(v)
    tt.navigateTo({
      url: `/pages/service/component/news/newsDetail/newsDetail?id=${v.id}&pid=${v.pid}`
    })
  },

  getNewsList(){
    global.$ajax('/uac/auth/generalizeArticle/findGeneralizeArticleList', this.data.queryData,{type:'POST'}).then(res=>{
      console.log(res)
      let arr = JSON.parse(JSON.stringify(this.data.purchaseProductlist))
      if(res.data.code == 200){
        arr = arr.concat(res.data.result.list)
        this.setData({
          purchaseProductlist:arr,
          total: Number(res.data.result.total)
        })
        if (this.data.purchaseProductlist.length == this.data.total || res.data.result.list.length == 0){
          this.setData({
            showNoMore:true
          })
        }
      }
    }).catch(err=>{
      console.log(err)
    })
  },
  getAdList() {
    global.$ajax('/uac/auth/wxAdver/getAdverListByType', { type: 1 }, { type: 'POST' }).then(res => {
      this.setData({
        imgUrls: res.data.result
      })
    }).catch(res => {

    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("qingqiu ")
    this.getNewsList()
    this.getAdList()
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
      this.data.queryData.pageNum += 1
      this.setData({
        queryData: this.data.queryData
      })
      this.getNewsList()
    }else{
      console.log("没有更多啦")
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})