// pages/service/travelOrder/travelOrder.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      tourId:'',
      // orderTimeS: "2019-04-15 12:30",
      orederDate:'',
      // orederTime:'',
      // imgUrl:"/img/gzhImg/bt4.jpg",
      // routeTitle:"洛杉矶豪华定制路线",
      // setTypeS:"双人套餐",
      // setEditionS:"豪华定制版",
      // adultPrice:"6500",
      // childPrice:"3250",
      adultNum:0,
      childAmount:0,
      // nowPoints:0,
      // travelPoints:0,
      // payPoints:0,
      // payTravelPoints:0,
      // allPrice: 0,
      money:{
        amount:0,
        sum:0,
      }
  },
  setDate(e){
    console.log(e)
    this.setData({
      orederDate: e.detail
    })
  },
  setTime(e){
    console.log(e)
    this.setData({
      orederTime: e.detail
    })
  },
  //返回上一页
  rLastIndex: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  // 计算总价格
  // computeAllPrice: function () {
  //   var adultPrice = this.data.adultPrice;
  //   var childPrice = this.data.childPrice;
  //   var adultNum = this.data.adultNum;
  //   var childNum = this.data.childNum;
  //   this.setData({
  //     allPrice: adultPrice * adultNum + childPrice * childNum
  //   })
  // },
  // 加减成人票数
  onAdultChange: function (event) {
    // debugger
    this.setData({
      adultNum:event.detail
    })
    let num = this.data.adultNum * this.data.money.price + this.data.childAmount * this.data.money.childPrice
    this.data.money.sum = num
    this.setData({
      money:this.data.money
    }) 
    this.setIntegralCalculation();
  },
  // 加减儿童票数
  onChildChange: function (event) {
    // debugger
    this.setData({
      childAmount: event.detail
    })
    let num = this.data.adultNum * this.data.money.price + this.data.childAmount * this.data.money.childPrice
    this.data.money.sum = num
    this.setData({
      money: this.data.money
    }) 
    // this.computeAllPrice();
    this.setIntegralCalculation();
  },
  //跳转付款详情页面的提示
  onNextStep:function(){
    if(this.data.adultNum == 0 ){
      wx.showToast({
        title: '请选择成人票数',
        icon:'none'
      })
      return
    }
    let that = this
    wx.showModal({
      title: '提示',
      content: '请与客服人员确认后购买\n售出不变退货哟~',
      confirmColor:"#040df9",
      success: function (res) {
        if (res.confirm) {
          //先进行缓存参数
          let data = JSON.stringify({
            bi: that.data.toBookData.bi,
            travelBi: that.data.toBookData.travelBi,
            money: that.data.money,
            name: that.data.toBookData.name,
            time: that.data.orederDate,
            personOrderCount: that.data.adultNum,
            childOrderCount: that.data.childAmount
          })
          wx.setStorageSync('bookData', data)
          //确认，跳转
          wx.navigateTo({
            url: '/pages/service/component/travel/travelOrderMain/travelOrderMain?id='+that.data.tourId
          })
        } else if (res.cancel) {
          return;
        }
      }
    })
  },
  getTripDetail() {
    wx.showToast({
      title: '加载中',
      icon:'none'
    })
    global.$ajax(`/uac/auth/tour/findTourProjectDetail/${this.data.tourId}`,{},{type:'POST'})
      .then(res => {
        console.log(res)
        if (res.data.code == 200) {
          // console.log(res);
          this.data.money.price = res.data.result.price
          this.data.money.childPrice = res.data.result.childAmount
          this.setData({
            toBookData: res.data.result,
            money: this.data.money,
          })
          // wx.hideLoading()
          this.setIntegralCalculation();//积分计算
        }
      });
  },
  // 积分计算
  setIntegralCalculation() {
    // debugger
    if (this.data.toBookData.bi >= 0){  //积分大于等于0
      if (this.data.toBookData.travelBi >= this.data.money.sum * 2) {
        // 旅游积分够用
        this.data.money.preTravelBi = this.data.money.sum * 2;
        this.data.money.preBi = 0;
        this.data.money.amount = 0;
        this.setData({
          money:this.data.money
        })
      } else if (
        this.data.toBookData.travelBi + this.data.toBookData.bi >=
        this.data.money.sum * 2
      ) {
        // 旅游积分不够用，用户积分够用，同时扣除旅游积分与用户积分
        this.data.money.preTravelBi = this.data.toBookData.travelBi;
        this.data.money.preBi = this.data.money.sum * 2 - this.data.toBookData.travelBi;
        this.data.money.amount = 0;
        this.setData({
          money: this.data.money
        })
      } else {
        // 旅游积分不够用，用户积分不够用，同时扣除旅游积分与用户积分，支付余下现金
        this.data.money.preTravelBi = this.data.toBookData.travelBi;
        this.data.money.preBi = this.data.toBookData.bi;
        this.data.money.amount =
          (this.data.money.sum * 2 - this.data.toBookData.travelBi - this.data.toBookData.bi) /
          2;
        this.setData({
          money: this.data.money
        }) 
      }
    }else{
      if (this.data.toBookData.travelBi >= this.data.money.sum * 2) {
        // 旅游积分够用
        this.data.money.preTravelBi = this.data.money.sum * 2;
        this.data.money.preBi = 0;
        this.data.money.amount = 0;
        this.setData({
          money: this.data.money
        })
      } else {
        // 旅游积分不够用，扣除旅游积分，支付余下现金
        this.data.money.preTravelBi = this.data.toBookData.travelBi;
        this.data.money.preBi = 0;
        this.data.money.amount =
          (this.data.money.sum * 2 - this.data.toBookData.travelBi) /
          2;
        this.setData({
          money: this.data.money
        })
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    //进场计算总价格
    // this.computeAllPrice();
    this.travelCalendar = this.selectComponent("#travelCalendar");
    this.travelCalendar._onLoad();
    this.formatTime();
    this.setData({
      // orederDate: this.formatTime(),
      tourId:options.id
    })
    this.getTripDetail()
  },
  formatTime(){
    var today = new Date();
    console.log(today)
    today.setTime(new Date().getTime() + 24 * 60 * 60 * 1000);
    console.log(today)
    let month = today.getMonth() + 1 > 9 ? today.getMonth() + 1 : '0' + (today.getMonth() + 1)
    let date = today.getDate() > 9 ? today.getDate() : '0' + today.getDate()
    let str = today.getFullYear() + '/' + month + '/' + date
    this.setData({
      orederDate: str
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

