// pages/purchase/component/xyAssistant/myCompany/myCompany.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:"",
    name:"",
    imgUrl:"",
    goodCount:"",
    registerMoney:"",
    buildDateS:"",
    buildAddress:"",
    watchCountS:"",
    introduce:"",
    imgUrlNormal:"/img/gzhImg/fabu.jpg",
    imageSavePath:''
  },
  // 返回小易助手主页
  rLastPage: function(){
    tt.navigateBack({
      delta: 1
    })
  },
  // 点赞
  likeCout() {
    global.$ajax(`/uac/auth/wx/common/dainzan/${this.data.id}`)
      .then(res => {
        if (res.data.code === 200) {
          if (res.data.result != "您已点赞过了") {
            let goodCount = null;
            res.data.result >= 10000
              ? (goodCount = `${res.data.result / 10000}万+`)
              : (goodCount = res.data.result);
            this.setData({
              goodCount: goodCount
            })
            tt.showToast({
              title: '点赞成功',
              icon: 'none'
            })
          } else {
            tt.showToast({
              title: res.data.result,
              icon: 'none'
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
    if (options.id) {
      this.setData({
        id: options.id
      })
      this.initBusiness()
      this.getXcxCode(options.id)
    }
  },
  initBusiness(){
    tt.showLoading({
      title: '加载中...'
    })
    global.$ajax(`/uac/auth/wx/common/querySupplierInfoById/${this.data.id}`).then((res) => {
      if (res.data.code == 200) {
        var result = res.data.result;
        this.setData({
          name: result.supplierName,
          imgUrl: result.logo,
          goodCount: result.likeCount,
          registerMoney: result.regCapital,
          buildDateS: result.establishTime,
          buildAddress: result.supplierAddress,
          watchCountS: result.viewNum,
          introduce: result.shortName,
          bgimgUrl: result.coverUrl
        })
        tt.hideLoading()
      }
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

  getXcxCode(id) {
    global.$ajax(`/uac/auth/wx/getSupplierShare`, { id: id }, { type: 'GET' }).then(res => {
      console.log(res)
      if (res.data.code == 200) {
        this.setData({
          imageSavePath: res.data.result.attachmentUrl
        })
      }
    });
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    let that = this
    let titleName = this.data.name || '采销更容易，爱上【采销易】';
    let sharePath = "pages/supply/component/supplyDetail/supplyDetail?id=" + this.data.id
    let userId = wx.getStorageSync('userInfo') != '' ? JSON.parse(wx.getStorageSync('userInfo')).userId : ''
    sharePath = sharePath + "&pid=" + userId;
    let message = {
      title: titleName,
      desc: titleName,
      path: sharePath,
      imageUrl: this.data.imageSavePath
    }
    console.log(message)
    return message
  }
})