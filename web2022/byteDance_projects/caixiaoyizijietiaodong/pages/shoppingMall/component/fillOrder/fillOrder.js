// pages/shoppingMall/component/fillOrder/fillOrder.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressId:undefined,//由地址页直接设置这个值
    confirmOrder:{},
    isCouponPopup:false,//显示优惠券
    chooseAddr:false,//是否选择地址，没有默认地址页没有选择地址的时候
    couponList:[],
    goodsList:[],
    goodsAllPrice:0,
    goodsPaymentPrice:0,
    goodsPoints:0,
    pageSize:10,
    pageNum:1,
    total:0,
    couponPopupSelData:{},
    showNoMore:false,
    isPayPopup:false,//支付的弹窗
    enterPassword:'',//输入的密码
  },
  isEndClose(){
    this.setData({
      isPayPopup:false
    }) 
  },
  isEndClose1(){
    this.setData({
      isCouponPopup:false
    }) 
  },
  returnLast() {
    tt.navigateBack({

    })
  },
  onCouponPopupOpen(){
    this.setData({
      isCouponPopup:true
    }) 
  },
  onCouponPopupclose(){
    this.setData({
      isCouponPopup: false
    }) 
  },
  onGotoAddress(){
    //去到地址列表页面
    tt.navigateTo({
      url: '/pages/shoppingMall/component/my/address/addressList/addressList?type=fillOrder'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.data.goodsList = tt.getStorageSync("goodsPayInfo") != '' ? JSON.parse(tt.getStorageSync("goodsPayInfo")) : []
    // this.data.goodsList.forEach((item)=>{
    //   goodsAllPrice += Number(item.goodsPrice * item.goodsNum)
    // })
    this.data.goodsList.map(item => {
      this.data.goodsAllPrice += item.goodsNum * item.goodsPrice // 商品总额
      this.data.goodsPaymentPrice += item.goodsNum * item.goodsPrice // 实付金额(未选优惠券时)
      this.data.goodsPoints = Math.ceil(this.data.goodsPaymentPrice * 2) // 积分价格（实付金额 * 2）
    })
    this.setData({
      goodsList:this.data.goodsList,
      goodsAllPrice: this.data.goodsAllPrice.toFixed(2),
      goodsPaymentPrice: this.data.goodsPaymentPrice.toFixed(2),
      goodsPoints: this.data.goodsPoints
    })
    this.getCpuponList()
  },
  getCpuponList(){
    //couponList
    let params = {
      pageSize:this.data.pageSize,
      pageNum:this.data.pageNum
    }
    global.$ajax('/uac/auth/wx/coupon/getPersonalCouponList',params).then(res=>{
      let arr = JSON.parse(JSON.stringify(this.data.couponList))
      if(res.data.code == 200){
        arr = arr.concat(res.data.result.list)
      }
      this.setData({
        couponList: arr,
        total: Number(res.data.result.total)
      })
      if (this.data.couponList.length == this.data.total || res.data.result.list.length == 0){
        this.setData({
          showNoMore:true
        })
      }
    }).catch(res=>{

    })
  },
  //使用优惠券
  onImmediateUse(e){
    let index = e.currentTarget.dataset.index
    let data = e.currentTarget.dataset.item
    if (Number.parseInt(data.couponTop) === 0) {
      this.setCouponFn(data)
    } else {
      if (Number.parseInt(data.couponTop) > this.data.goodsAllPrice) {
        tt.showModal({
		  title: "提示",
          content: `商品价格不符合当前优惠券"满${data.couponTop}可用"的条件`,
          showCancel: false
        })
      } else {
        this.setCouponFn(data)
      }
    }
  },
  setCouponFn(data) {
    this.data.goodsPaymentPrice = (this.data.goodsPaymentPrice - Number.parseInt(data.couponPrice)) <= 0 ? 0 : (this.data.goodsPaymentPrice - Number.parseInt(data.couponPrice)) // 实付总额
    this.data.goodsPoints = Math.ceil(this.data.goodsPaymentPrice * 2) // 积分价格（实付金额 * 2）
    this.data.couponPopupSelData = data
    this.setData({
      goodsPaymentPrice: this.data.goodsPaymentPrice.toFixed(2),
      goodsPoints: this.data.goodsPoints,
      couponPopupSelData: this.data.couponPopupSelData,
      isCouponPopup:false
    })
  },
  onBuyNow(){
    //去支付
    if (Object.keys(this.data.confirmOrder).length === 0) {
      tt.showToast({
        title: '请选择收货地址',
        icon:'none'
      })
    } else if (this.data.goodsList.length <= 0) {
      tt.showToast({
        title: '数据异常，请联系管理员',
        icon:'none'
      })
    } else {
      let param = {
        deliveryAddressId: this.data.addressId, // 当前地址的id
        omcGoodsOrderViEnList: JSON.parse(tt.getStorageSync('goodsPayInfo')), // 当前商品信息列表
        orderPrice: this.data.goodsAllPrice, // 商品总额
        totalPrice: this.data.goodsPaymentPrice, // 实付金额
        couponId: Object.keys(this.data.couponPopupSelData).length === 0 ? '' : this.data.couponPopupSelData.id, // 优惠券id
        couponPrice: Object.keys(this.data.couponPopupSelData).length === 0 ? 0 : this.data.couponPopupSelData.couponPrice, // 优惠券价格
      }
      global.$ajax('/uac/auth/goodsOrder/createOrder', param).then(res => {
        if (res.data.code === 200) {
          if (res.data.result.code === 1) {
            this.setData({
              isPayPopup:true
            })
            tt.setStorageSync('createOrder', JSON.stringify(res.data.result)) // 点击去支付时，创建的商品订单信息
          } else {
            tt.showToast({
              title: res.data.result.msg ,
              icon:'none'
            })
          }
        }
      })
    }
  },
  onIsPayPopupClose(){
    this.setData({
      isPayPopup:false
    })
  },
  onPointsPayment(){
    //积分支付
    let _this = this
    let result = JSON.parse(JSON.stringify(this.data.result))
    if (result.bi === null || result.bi <= 0) {
      tt.showToast({
        title: '您没有可用积分',
        icon: 'none',
        duration: 2000
      })
    } else if (result.bi < this.data.goodsPoints) {
      tt.showToast({
        title: '您的积分不足以支付当前商品',
        icon: 'none',
        duration: 2000
      })
    } else if (result.payPassword === null || result.payPassword === '') {
      tt.showModal({
        title: '提示',
        content: '系统检测到您未设置支付密码，将不能使用积分进行支付，是否前往设置支付密码？',
        success: (res) => {
          if (res.confirm) {
            _this.setData({
              isPayPopup:false
            })
            tt.navigateTo({
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
      tt.showModal({
        title: '提示',
        content: '确定使用积分进行支付？',
        success: (res) => {
          if (res.confirm) {
            // _this.setData({
            //   isPayPopup: false
            // })
            // tt.navigateTo({
            //   url: '/pages/purchase/component/xyAssistant/setPassword/setPasssword?setType=fillOrder',
            // })
            _this.setData({
              isPassword:true,
              isPayPopup:false
            })
          }
        }
      })
    }
  },
  onWeChatPayment(e){
    //微信支付
    let _this = this
    let createOrderData = JSON.parse(tt.getStorageSync('createOrder'))
    let param = {
      orderPrice: createOrderData.totalPrice,
      payType: 2,
      repay: false,
      orderNo: createOrderData.orderNo
    }
    global.getPay("/uac/auth/goodsOrder/payOrder", param, 
    ()=>{
       // 去订单页面设置orderType
      let item = e.currentTarget.dataset.item
      var pages = getCurrentPages();
      var prevPage = pages[pages.length - 2]; //上一个页面
      //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
      prevPage.setData({
        active: 1
      })
      tt.navigateTo({
        url: '/pages/shoppingMall/component/my/order/orderList/orderList?orderType=2',
      })
    },
    ()=>{
      let item = e.currentTarget.dataset.item
      var pages = getCurrentPages();
      var prevPage = pages[pages.length - 2]; //上一个页面
      //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
      prevPage.setData({
        active: 2
      })
      // 去订单页面设置orderType
      tt.navigateTo({
        url: '/pages/shoppingMall/component/my/order/orderList/orderList?orderType=0',
      })
    })
  },
  checkpswd(val){
    //输入密码之后的积分支付
    this.setData({
      isPassword:false,
      enterPassword:val.detail
    })
    console.log("支付")
    if (!tt.getStorageSync('createOrder')) {
      
    } else {
      let createOrderData = JSON.parse(tt.getStorageSync('createOrder'))
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
            tt.showToast({
              title: '积分支付成功'
            })
            tt.setStorageSync('goodsPayInfo', '')
            tt.setStorageSync('createOrder', '')
           // 支付成功之后/或者支付弹窗关闭，清除当前商品信息
             // 点击去支付时，创建的商品订单信息
            // this.$router.push({
            //   path: '/mall/order',
            //   query: { orderType: 2, time: new Date().getTime() }
            // })
            var pages = getCurrentPages();
            var prevPage = pages[pages.length - 2]; //上一个页面
            //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
            prevPage.setData({
              active: 1
            })
            tt.navigateTo({
              url: '/pages/shoppingMall/component/my/order/orderList/orderList?orderType=2',
            })
          } else {
            // this.$toast('密码输入错误')
            // this.isPayPopup = true // 初始化支付弹窗
            tt.showToast({
              title: '密码输入错误',
              icon:'none'
            })
            this.setData({
              isPayPopup:true
            })
          }
        }
      })
    }
  },
  close(){
    //关闭 键盘
    this.setData({
      isPassword:false
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
  onShow: function (e) {
    console.log("show")
    console.log(e)
    if(this.data.addressId){
      //从地址页面传回来的
      global.$ajax(`/uac/auth/goods/findDeliveryAddressInfo/${this.data.addressId}`,{}).then(res=>{
        console.log(res)
        //根据id获取地址
        this.setData({
          confirmOrder: res.data.result
        })
      }).catch(err=>{
        console.log(res)
      })
    }else{
      //获取默认地址
      global.$ajax("/uac/auth/goods/findDeliveryAddressInfo", {}, { type: 'GET' }).then(res => {
        console.log(res)
        if (res.data.code === 200) {
          if (res.data.result.code === 1) {
            this.setData({
              confirmOrder: res.data.result.addressInfo,
              addressId: res.data.result.addressInfo.id
            })
            // this.confirmOrder = res.data.result.addressInfo
          }else{
            this.setData({
              chooseAddr:true
            })
          }
        }
      })
    }

    global.$ajax("/uac/auth/wx/common/findUserInfo").then(res => {
      console.log("嘿嘿")
      if (res.data.code === 200) {
        this.setData({
          result:res.data.result
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
    if(!this.data.showNoMore){
      this.setData({
        pageNum:this.data.pageNum + 1
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
function setEncode64(input) {
  var keyStr = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=`;
  let output = "";
  let chr1,
    chr2,
    chr3 = "";
  let enc1,
    enc2,
    enc3,
    enc4 = "";
  let i = 0;
  do {
    chr1 = input.charCodeAt(i++);
    chr2 = input.charCodeAt(i++);
    chr3 = input.charCodeAt(i++);
    enc1 = chr1 >> 2;
    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
    enc4 = chr3 & 63;
    if (isNaN(chr2)) {
      enc3 = enc4 = 64;
    } else if (isNaN(chr3)) {
      enc4 = 64;
    }
    output =
      output +
      keyStr.charAt(enc1) +
      keyStr.charAt(enc2) +
      keyStr.charAt(enc3) +
      keyStr.charAt(enc4);
    chr1 = chr2 = chr3 = "";
    enc1 = enc2 = enc3 = enc4 = "";
  } while (i < input.length);
  return output;
}
