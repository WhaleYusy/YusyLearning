// pages/shoppingMall/component/my/order/orderDetail/orderDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderDetails:{},
    id:'',
    isPayPopup:false,
    isPassword:false,
    result:{},
    goods:{
      allGoodsNum:0
    }
  },
  returnLast() {
    wx.navigateBack({

    })
  },
  payNow(e) {
    //先弹出支付选择
    let item = JSON.parse(JSON.stringify(this.data.orderDetails))
    this.setData({
      isPayPopup: true,
      selectItem: item
    })
  },
  close() {
    this.setData({
      isPassword: false
    })
  },
  checkpswd(val) {
    let createOrderData = JSON.parse(JSON.stringify(this.data.selectItem))
    //输入密码之后的积分支付
    this.setData({
      isPassword: false,
      enterPassword: val.detail
    })
    console.log("支付")
    // if (!wx.getStorageSync('createOrder')) {

    // } else {
    //   let createOrderData = JSON.parse(wx.getStorageSync('createOrder'))
    let param = {
      bi: createOrderData.totalBi,
      orderNo: createOrderData.orderNo,
      payType: 1,
      payPassword: setEncode64(this.data.enterPassword)
    }
    global.$ajax('/uac/auth/goodsOrder/payOrder', param).then(res => {
      if (res.data.code === 200) {
        if (res.data.result.code === 1) {
          // this.$toast('')
          wx.showToast({
            title: '积分支付成功'
          })
          wx.setStorageSync('goodsPayInfo', '')
          wx.setStorageSync('createOrder', '')
          this.setData({
            orderList: []
          })
          this.getOrderList();
          // 支付成功之后/或者支付弹窗关闭，清除当前商品信息
          // 点击去支付时，创建的商品订单信息
          // this.$router.push({
          //   path: '/mall/order',
          //   query: { orderType: 2, time: new Date().getTime() }
          // })
          // var pages = getCurrentPages();
          // var prevPage = pages[pages.length - 2]; //上一个页面
          // //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
          // prevPage.setData({
          //   active: 1
          // })
          // wx.navigateTo({
          //   url: '/pages/shoppingMall/component/my/order/orderList/orderList?orderType=2',
          // })
        } else {
          // this.$toast('密码输入错误')
          // this.isPayPopup = true // 初始化支付弹窗
          wx.showToast({
            title: '密码输入错误',
            icon: 'none'
          })
          this.setData({
            isPayPopup: true
          })
        }
      }
    })
    // }
  },
  onIsPayPopupClose() {
    this.setData({
      isPayPopup: false
    })
  },
  onPointsPayment() {
    //积分支付
    let _this = this
    let result = JSON.parse(JSON.stringify(this.data.result))
    if (result.bi === null || result.bi <= 0) {
      wx.showToast({
        title: '您没有可用积分',
        icon: 'none'
      })
    } else if (result.bi < this.data.goodsPoints) {
      wx.showToast({
        title: '您的积分不足以支付当前商品，请充值',
        icon: 'none'
      })
    } else if (result.payPassword === null || result.payPassword === '') {
      wx.showModal({
        title: '提示',
        content: '系统检测到您未设置支付密码，将不能使用积分进行支付，是否前往设置支付密码？',
        success: (res) => {
          if (res.confirm) {
            _this.setData({
              isPayPopup: false
            })
            wx.navigateTo({
              url: '/pages/purchase/component/xyAssistant/setPassword/setPasssword?setType=fillOrder',
            })
          }
        }
      })
      // this.$dialog.confirm({ title: "提示", message: "系统检测到您未设置支付密码，将不能使用积分进行支付，是否前往设置支付密码？" }).then(res => {
      //   this.$router.push({
      //     path: '/setPassword',
      //     query: { orderType: 0, type: "goodsPaySet" }
      //   })
      // }).catch(err => { })
    } else {
      // this.$dialog.confirm({ title: "提示", message: "确定使用积分进行支付？" }).then(res => {
      //   this.isPassword = true // 开启输入密码弹窗
      // }).catch(err => { })
      wx.showModal({
        title: '提示',
        content: '确定使用积分进行支付？',
        success: (res) => {
          if (res.confirm) {
            // _this.setData({
            //   isPayPopup: false
            // })
            // wx.navigateTo({
            //   url: '/pages/purchase/component/xyAssistant/setPassword/setPasssword?setType=fillOrder',
            // })
            _this.setData({
              isPassword: true,
              isPayPopup: false
            })
          }
        }
      })
    }
  },
  onWeChatPayment() {
    //微信支付
    let _this = this
    let createOrderData = JSON.parse(JSON.stringify(this.data.selectItem))
    let param = {
      orderPrice: createOrderData.totalPrice,
      payType: 2,
      repay: true,
      orderNo: createOrderData.orderNo
    }
    global.getPay("/uac/auth/tour/saveTourOrder", param,
      () => {
        // 去订单页面设置orderType
        // let item = e.currentTarget.dataset.item
        var pages = getCurrentPages();
        var prevPage = pages[pages.length - 2]; //上一个页面
        //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
        prevPage.setData({
          active: 1
        })
        wx.navigateTo({
          url: '/pages/shoppingMall/component/my/order/orderList/orderList?orderType=2',
        })
      },
      () => {
        // let item = e.currentTarget.dataset.item
        var pages = getCurrentPages();
        var prevPage = pages[pages.length - 2]; //上一个页面
        //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
        prevPage.setData({
          active: 2
        })
        // 去订单页面设置orderType
        wx.navigateTo({
          url: '/pages/shoppingMall/component/my/order/orderList/orderList?orderType=0',
        })
      })
  },

  cacelOrder(e){
    let _this = this
    let orderNo = e.currentTarget.dataset.no
    wx.showModal({
      title:'提示',
      content:'确认取消订单?',
      success:(res)=>{
        if(res.confirm){
          global.$ajax(`/uac/auth/goodsOrder/closeOrder/${orderNo}`).then(res => {
          if (res.data.code === 200) {
            if (res.data.result.code === 1) {
              wx.showToast({
                title: '取消订单成功'
              })
              this.getDetail()
              // global.$ajax('/uac/auth/goodsOrder/orderList', paymentNum).then(res => {
              //   if (res.data.code === 200) {
              //     // this.setMallOrderPaymentNum(Number.parseInt(res.data.result.total)) // 待付款数量
              //   }
              // })
            } else {
              // this.$toast('取消订单失败')
              wx.showToast({
                title: '取消订单失败',
                icon:'none'
              })
            }
          }
        })
        }
      }
    })
  },
  ensureReceive(e){
    let orderNo = e.currentTarget.dataset.no
    global.$ajax(`/uac/auth/goodsOrder/confirmReceive/${orderNo}`,{}).then(res => {
      if (res.data.code === 200) {
        if (res.data.result.code === 1) {
          // this.orderList[index].orderStatus = 4 // 已完成状态
          // this.$toast('确认收货成功')
          this.setData({
            orderList:[]
          })
          this.getOrderList()
          wx.showToast({
            title: '确认收货成功'
          })
        } else {
          // this.$toast('确认收货失败')
          wx.showToast({
            title: '确认收货失败',
            icon:'none'
          })
        }
      }
    })
    //确认收货

  },
  getDetail(){
    global.$ajax('/uac/auth/goodsOrder/findOrderDetail/'+this.data.id,{},{type:'GET'}).then(res=>{
      res.data.result.goods.map(val => this.data.goods.allGoodsNum += val.goodsNum)
      this.data.orderDetails = res.data.result
      this.setData({
        goods: this.data.goods,
        orderDetails: this.data.orderDetails
      })
    }).catch(err=>{

    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let id = options.id
    this.setData({
      id:id
    })
    this.getDetail()
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
    global.$ajax("/uac/auth/wx/common/findUserInfo").then(res => {
      console.log("嘿嘿")
      if (res.data.code === 200) {
        this.setData({
          result: res.data.result
        })
      }
    })
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