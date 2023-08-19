// pages/playAllegro/AllegroOrder/indexOrder/indexOrder.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active:0,
      // componentId:() => import("./catchOrder"),
      tabList:[
        {title:'全部订单'},
        {title:'待支付'},
        {title:'生产中'},
        {title:'已发货'},
        {title:'已完成'},
        {title:'申诉单'},
        {title:'已取消'}
      ],
  },
  onTabClick(e){
    let index = e.currentTarget.dataset.index;
    let active = e.currentTarget.dataset.active;
    console.log(active)
    if(active == -1){
      this.setData({
        active: -1
      })
    }else{
      this.setData({
        active: index
      })
    }
  },
  getSuplierList() {
    global.$ajax('/uac/auth/wx/common/findPageInfoToSupplier',
      { type: 2, facilitatorTypeId: 9 }
    ).then((res) => {
      this.setData({
        dataList: res.data.result.list
      })
      console.log("接口测试的结果")
      console.log(this.dataList)
    })
  },
  
  //用户信息
  getUserInfo() {
    global.$ajax("/uac/auth/wx/common/findUserInfo", {}).then(res => {
      this.setData({
        userInfo: res.data.result
      })
      wx.setStorageSync('userInfo222', res.data.result)
      console.log(this.data.userInfo);
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSuplierList()
    this.getUserInfo();//用户直接从订单进入，没有缓存用户信息
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
    if(this.data.active == -1){
      this.selectComponent("#catchOrder").getListMore()
    } else if (this.data.active == 0){
      // console.log(this.selectComponent("#allOrder").data.showNoMore)
      this.selectComponent("#allOrder").getListMore()
    } else if (this.data.active == 1) {
      this.selectComponent("#waitPay").getListMore()
    } else if (this.data.active == 2) {
      this.selectComponent("#create").getListMore()
    } else if (this.data.active == 3) {
      this.selectComponent("#hasPost").getListMore()
    } else if (this.data.active == 4) {
      this.selectComponent("#hasBeen").getListMore()
    } else if (this.data.active == 5) {
      this.selectComponent("#appeal").getListMore()
    } else if (this.data.active == 6) {
      this.selectComponent("#hasCancel").getListMore()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})