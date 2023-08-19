// pages/purchase/component/xyAssistant/travelBill/travelDetail/travelDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    tripOrderDetails:{},
    loading:false,
  },
  getFindTourOrderDetail() {
    global.$ajax(`/uac/auth/tour/findTourOrderDetail/${this.data.id}`,{},{type:'POST'})
      .then(res => {
        if (res.data.code == 200) {
          // console.log(res);
          this.setData({
            tripOrderDetails: res.data.result
          })
        }
      });
  },
  toPayOrder(){
    //未支付订单的支付
    tt.showLoading({
      title: '支付中'
    })
    let _this = this
    let params = {
      tourId: this.data.tripOrderDetails.projectId,
      pid: this.data.tripOrderDetails.pid,
      repay: true,
      personOrderCount: this.data.tripOrderDetails.personsOrderCount,
      childOrderCount: this.data.tripOrderDetails.childOrderCount,
      orderNo: this.data.tripOrderDetails.orderNo
    };
    if(this.data.loading){
      return 
    }
    this.setData({
      loading:true
    })
    global.getPay("/uac/auth/tour/saveTourOrder", params,()=>{
      _this.setData({
        loading: false
      })
      tt.showToast({
        title: '支付成功',
        icon: 'none'
      })
      tt.hideLoading()
      //直接设置orderlist页面的type
      tt.navigateBack({ type: 1 })
    },()=>{
      _this.setData({
        loading: false
      })
      //支付取消
      tt.showToast({
        title: '您已取消支付',
        icon: 'none'
      })
      tt.hideLoading()
      //直接设置orderlist页面的type
      tt.navigateBack({ type: 2 })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id || '764496279941182464'
    this.setData({
      id:id
    })
    this.getFindTourOrderDetail()
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