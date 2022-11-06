// pages/shoppingMall/component/my/order/orderList/orderList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    result:{},
    isPassword:false,
    enterPassword:'',
    isPayPopup:true,//支付方式的弹窗
    active:1,
    pageNum: 1,
    pageSize: 10,
    orderStatus: "",
    total:0,
    showNoMore:false,
    orderList:[],
    selectItem:{},//选中的该条数据
  },
  orderList(e){
    let index = e.currentTarget.dataset.index;
    this.setData({
      active:index,
      orderList:[]
    })
    let orderStatus = ''
    console.log(this.data.active)
    switch (this.data.active) {
      case '1': orderStatus = ''; break;
      case '2': orderStatus = '1'; break;
      case '3': orderStatus = '2'; break;
      case '4': orderStatus = '3'; break;
      case '5': orderStatus = '4'; break;
    }
    console.log(orderStatus)
    this.setData({
      orderStatus: orderStatus
    })
    this.getOrderList()
  },
  calcelOrder(e){
    let orderNo = e.currentTarget.dataset.no
    tt.showModal({
      title: '提示',
      content: '确认取消订单?',
      success: (res) => {
        if (res.confirm) {
          global.$ajax(`/uac/auth/goodsOrder/closeOrder/${orderNo}`).then(res => {
            if (res.data.code === 200) {
              if (res.data.result.code === 1) {
                tt.showToast({
                  title: '取消订单成功'
                })
                this.setData({
                  orderList:[]
                })
                this.getOrderList()
              } else {
                // this.$toast('取消订单失败')
                tt.showToast({
                  title: '取消订单失败',
                  icon: 'none'
                })
              }
            }
          })
        }
      }
    })
  },
  onOrderDetails(e){
    console.log(e)
    let id = e.currentTarget.dataset.id;
    //订单详情
    tt.navigateTo({
      url: '/pages/shoppingMall/component/my/order/orderDetail/orderDetail?id=' + id
    })
  },
  payNow(e){
    //先弹出支付选择
    let item = e.currentTarget.dataset.item
    this.setData({
      isPayPopup:false,
      selectItem: item
    })
  },
  close(){
    this.setData({
      isPassword:false
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
    // if (!tt.getStorageSync('createOrder')) {

    // } else {
    //   let createOrderData = JSON.parse(tt.getStorageSync('createOrder'))
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
            this.setData({
              orderList:[]
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
            // tt.navigateTo({
            //   url: '/pages/shoppingMall/component/my/order/orderList/orderList?orderType=2',
            // })
          } else {
            // this.$toast('密码输入错误')
            // this.isPayPopup = true // 初始化支付弹窗
            tt.showToast({
              title: '密码输入错误',
              icon: 'none'
            })
            this.setData({
              isPayPopup: false
            })
          }
        }
      })
    // }
  },
  onIsPayPopupClose() {
    this.setData({
      isPayPopup: true
    })
  },
  onPointsPayment() {
    //积分支付
    let _this = this
    let result = JSON.parse(JSON.stringify(this.data.result))
    if (result.bi === null || result.bi <= 0) {
      tt.showToast({
        title: '您没有可用积分',
        icon: 'none'
      })
    } else if (result.bi < this.data.goodsPoints) {
      tt.showToast({
        title: '您的积分不足以支付当前商品',
        icon: 'none'
      })
    } else if (result.payPassword === null || result.payPassword === '') {
      tt.showModal({
        title: '提示',
        content: '系统检测到您未设置支付密码，将不能使用积分进行支付，是否前往设置支付密码？',
        success: (res) => {
          if (res.confirm) {
            _this.setData({
              isPayPopup: true
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
              isPassword: true,
              isPayPopup: true
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
      () => {
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

  onViewLogistics(e){
    //查看物流
    let id = e.currentTarget.dataset.id
    tt.navigateTo({
      url: '/pages/shoppingMall/component/Logistics/Logistics?id=' + id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.index)
    let index = options.index
    this.setData({
      active:index
    })
    let orderStatus = ''
    switch (parseInt(this.data.active)){
      case 1: orderStatus = ''; break;
      case 2: orderStatus = '1'; break;
      case 3: orderStatus = '2'; break;
      case 4: orderStatus = '3'; break;
      case 5: orderStatus = '4';break;
    }
    this.setData({
      orderStatus: orderStatus
    })
    this.getOrderList()
  },
  getOrderList(){
    tt.showLoading({
      title: '加载中...'
    })
    let params = {
      pageSize: this.data.pageSize,
      pageNum: this.data.pageNum,
      orderStatus: this.data.orderStatus
    }
    global.$ajax('/uac/auth/goodsOrder/orderList', params, { type: 'POST' }).then(res => {
      let arr = JSON.parse(JSON.stringify(this.data.orderList))
      if (res.data.code == 200) {
        arr = arr.concat(res.data.result.list)
        this.setData({
          orderList: arr,
          total: Number(res.data.result.total)
        })
        if (this.data.orderList.length == this.data.total || res.data.result.list.length == 0) {
          this.setData({
            showNoMore: true
          })
        }
        tt.hideLoading()
      }
    }).catch(res => {

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
    global.$ajax("/uac/auth/wx/common/findUserInfo").then(res => {
      console.log("嘿嘿")
      if (res.data.code === 200) {
        this.setData({
          result: res.data.result
        })
      }
    })
  },
  ensureReceive(e) {
    let _this = this
    let orderNo = e.currentTarget.dataset.no
    tt.showModal({
      title: '提示',
      content: '是否确认收到货物',
      success:(res)=>{
        if(res.confirm){
          global.$ajax(`/uac/auth/goodsOrder/confirmReceive/${orderNo}`, {}).then(res => {
            if (res.data.code === 200) {
              if (res.data.result.code === 1) {
                // this.orderList[index].orderStatus = 4 // 已完成状态
                // this.$toast('确认收货成功')
                _this.setData({
                  orderList: []
                })
                _this.getOrderList()
                tt.showToast({
                  title: '确认收货成功'
                })
              } else {
                // this.$toast('确认收货失败')
                tt.showToast({
                  title: '确认收货失败',
                  icon: 'none'
                })
              }
            }
          })
        }
      }
    })
    //确认收货

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
      this.getOrderList()
    } else {
      console.log("没有")
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