// pages/service/component/news/newsDetail/newsDetail.js

Page({
  /**
   * 页面的初始数据
   */
  data: {
    isShowInsertBtn:false,
    queryData:{
      id: '',
      pid: '',
    },
    params:{
      title:'',
      createdTime:'',
      content:'',
    },
    content:'',
    mdcSupplierViEn:null,
  },
  getDetail(){
    //获取详情
    global.$ajax('/uac/auth/generalizeArticle/findGeneralizeAriticleInfo',this.data.queryData,{type:'POST'}).then(res=>{
      console.log(res)
      this.content = res.data.result.content;
      this.params = res.data.result;
      this.mdcSupplierViEn = res.data.result.mdcSupplierViEn;
      this.setData({
        content: res.data.result.content.replace(/<img/g, '<img style="width:100%" '),
        params: res.data.result,
        mdcSupplierViEn: res.data.result.mdcSupplierViEn
      })
      if (res.data.result.isAdd == true) {
        this.setData({
          isShowInsertBtn:false
        })
      } else {
        this.setData({
          isShowInsertBtn: true
        })
      }
    }).catch(err=>{
      console.log(err)
    })
  },
  onInsert() {
    global.$ajax(
        `/uac/auth/generalizeArticle/updateSupplierId2Article/${this.data.queryData.id}`,{},{type:'POST'}
      )
      .then(res => {
        // console.log(res);
        if (res.data.code == 200) {
          if (res.data.result.code == true) {
            this.getDetail();
            // this.reload();
            wx.showLoading({
              title: res.data.result.msg,
              icon:'none'
            })
          } else {
            wx.showModal({
              title: '提示',
              content: '您账户下未有供应商入驻或者供应商未审核，是否前往入驻或联系客服审核?',
              success(res) {
                if (res.confirm) {
                  //去往供应商入住页面
                  wx.navigateTo({
                    url: '/pages/purchase/component/xyAssistant/myBusinessEdit/myBusinessEdit'
                  })
                } else if (res.cancel) {
                  console.log(res)
                }
              }
          })
        }
        }
      });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.data.queryData.id = options.id
    this.data.queryData.pid = options.pid
    this.setData({
      queryData: this.data.queryData
    })
    this.getDetail()
    // this.onInsert()
    // const that = this
    // let data = '<image src="http://qiniuoss.822644.com/images/product/admin/645535134082150400.jpg"></image>'
    // var template = WxParse.wxParse('article', 'html', data, that, 5);
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