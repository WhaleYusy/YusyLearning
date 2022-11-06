// pages/playAllegro/playThird/playThird.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList:[],
    res: {},
    res2: {},
    addr: {},
    file: [],
    memo: "",
    addressId: "",
    resMsg: {},
    userInfo: {},
    supplyId: "",
    supplyName: "",
    active: "",
    showPswBoard:false,
    //
    // 密码部分
    isPassword: false,
    enterPassword: '',
    password: '',
    orderId: 0,
    useCode:0,
    shouldPay:0,
    preBi:0,
    activeLi:null //选择供应商
  },
  chooseService: function (event) {
    var index = event.currentTarget.dataset.index;
    var data = event.currentTarget.dataset.item;
    console.log(data)
    this.setData({
      activeLi: index,
      supplyId: data.id,
      supplyName: data.supplierName
    })
  },
  // 私信某一个服务商
  onchatInfo: function(event){
    var id = event.currentTarget.dataset.id;
    var data = event.currentTarget.dataset.item;
    console.log(id);
    if (data.applyStatus == 1) {
      global.$ajax(`/uac/auth/wx/common/findUserInfoById/${data.uid}`,{})
        .then(res => {
          if (res.data.code == 200) {
            wx.navigateTo({
              url: '/pages/chatDetails/chatDetails?userId=' + res.data.result.id + '&shopLogo=' + res.data.result.userPic + '&sendName=' + res.data.result.onchatInfo
            })
          }
        });
    }
    
  },
  goBack(){
    wx.navigateBack({
      
    })
  },
  //
  checkpswd(e) {
    console.log("嘿嘿")
    console.log(e.detail)
    this.setData({
      enterPassword: e.detail,
      showPswBoard: false
    })
    this.payContinute(this.data.params)
    // wx.showLoading({
    //   title:'校验中'
    // })
  },
  close() {
    console.log(123456)
    //关闭键盘
    this.setData({
      showPswBoard: false
    })
    //关闭键盘还是支付失败，跳转
    // setTimeout(() => {
    //   wx.navigateTo({
    //     url: '/pages/playAllegro/AllegroOrder/indexOrder/indexOrder?ordeType=1',
    //   })
    // }, 1000)
  }, 
  //输入完了密码之后的操作
  payContinute(e) {
    console.log("继续")
    wx.showLoading({
      title: '支付中...'
    })
    if (this.data.enterPassword.trim() == '') {
      wx.showToast({
        title: '支付密码不能为空',
        icon: 'none'
      })
    } else {
      console.log(this.data.orderId)
      global.$ajax("/uac/auth/pcb/pcbPay", { id: this.data.orderId, payPassword: setEncode64(this.data.enterPassword) })
        .then(res => {
          console.log(res)
          /////在这里判断
          if (res.data.code == 200 && res.data.result == '支付成功') {
            wx.showToast({
              title: '请尽快前往订单详情页面上传生产稿件',
              icon: 'none'
            })
          } else if (res.data.result.code){
            wx.showToast({
              title: res.data.result.msg,
              icon: 'none'
            })
          } else {
            wx.showToast({
              title: res.data.result,
              icon: 'none'
            })
          }
          setTimeout(() => {
            wx.navigateTo({
              url: '/pages/playAllegro/AllegroOrder/indexOrder/indexOrder?ordeType=1',
            })
          }, 1000)
          this.setData({
            enterPassword: '',
            showPswBoard: false
          })
          
          ///如果成功
        })
    }
    // this.isPassword = false
  },
  saveMemo(e){
    //保存留言
    let value = e.detail.value
    this.setData({
      memo:value
    })
  },
  toCreateOrder(){
    let code = this.data.useCode > this.data.userInfo.bi ? this.data.userInfo.bi : this.data.useCode
    //去快板订单页面
    // wx.navigateTo({
    //   url: '/pages/playAllegro/AllegroOrder/indexOrder/indexOrder'
    // })
    let that = this
    if (this.data.addr !== null && this.data.addr !== {} && this.data.addr !== undefined && 　this.data.addr.area !== undefined) {
      wx.showModal({
        title: '提示',
        content: '确定下单并支付(优先以积分支付)？',
        success:(res)=>{
          if(res.confirm){
            let data = {
              boardFree: Number(that.data.res.boardFree),
              buyoutPrice: 0,
              charColor: that.data.res.charColor,
              copperThickness: that.data.res.copperThickness,
              delivery: that.data.res.delivery,
              depth: Number(that.data.res.depth),
              discount: Number(that.data.res.discount),
              filmFree: Number(that.data.res.filmFree),
              layerNum: Number(that.data.res.layerNum),
              materialUrl: "",
              padSpraying: that.data.res.padSpraying,
              panelization: Number(that.data.res.panelization),
              pcbArea: Number(that.data.res.pcbArea),
              pcbLong: Number(that.data.res.pcbLong),
              pcbNum: Number(that.data.res.pcbNum),
              pcbPrice: Number(that.data.res.pcbPrice),
              pcbWide: Number(that.data.res.pcbWide),
              projectFree: Number(that.data.res.projectFree),
              soldermaskColor: that.data.res.soldermaskColor,
              soldermaskCover: that.data.res.soldermaskColor,
              test: that.data.res.test,
              totalPrice: that.data.res.totalPrice,
              userName: that.data.addr.consignee,
              addressId: that.data.addr.id,
              userPhone: that.data.addr.telephone,
              testPrice: that.data.res.testPrice,
              totalPrice: that.data.res2.totalPrice,
              freightFree: that.data.res2.freightFree,
              orderMemo: that.data.memo,
              supplierId: that.data.supplyId,
              supplierName: that.data.supplyName,
              autoConfirmDays: Number(that.data.res2.autoConfirmDays)
            };
            global.$ajax('/uac/auth/pcb/crePcbOrder', data).then((res) => {
              //标记
              console.log(res)
              that.setData({
                orderId: res.data.result.orderId
              })
              console.log(that.data.orderId)
              if (that.data.shouldPay == 0) {
                //要使用密码
                console.log("嘿嘿嘿")
                if (that.data.userInfo.payPassword != null) {
                  //有支付密码
                  // this.payContinute(params);//先输入密码，再继续积分支付
                  let code = that.data.useCode > that.data.userInfo.bi ? that.data.userInfo.bi : that.data.useCode
                  that.setData({
                    showPswBoard: true,
                    preBi: code
                  })
                } else {
                  //去设置支付密码
                  wx.showModal({
                    title: '提示',
                    content: '是否前往设置支付密码？',
                    success:(res)=>{
                      if(res.confirm){
                        wx.navigateTo({
                          url: `/pages/purchase/component/xyAssistant/setPassword/setPasssword?setType=pcbOrder`
                        })
                      }
                    }
                  })
                }
              } else {
                wx.showToast({
                  title:'积分不足，将使用微信支付',
                  icon:'none'
                })
                  // .post("/uac/auth/pcb/pcbPay", { id: res.data.result.orderId })
                setTimeout(()=>{
                  wx.showLoading({
                    title: '支付中...'
                  })
                },1000)
                global.getPay("/uac/auth/pcb/pcbPay", { id: res.data.result.orderId },
                  () => {
                    //成功
                    wx.hideLoading()
                    wx.showToast({
                      title: '支付成功',
                      icon: 'none'
                    })
                    // var pages = getCurrentPages();
                    // var prevPage = pages[pages.length - 2]; //上一个页面
                    // //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
                    // prevPage.setData({
                    //   type: 1
                    // })
                    wx.navigateTo({
                      url: '/pages/playAllegro/AllegroOrder/indexOrder/indexOrder?ordeType=0',
                    })
                  }, () => {
                    //失败
                    wx.hideLoading()
                    wx.showToast({
                      title: '支付失败',
                      icon: 'none'
                    })
                    // var pages = getCurrentPages();
                    // var prevPage = pages[pages.length - 2]; //上一个页面
                    // //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
                    // prevPage.setData({
                    //   type: 2
                    // })
                    setTimeout(() => {
                      wx.navigateTo({
                        url: '/pages/playAllegro/AllegroOrder/indexOrder/indexOrder?ordeType=1',
                      })
                    }, 1000)
                  })
              }
            })
          }
        }
      })    
    } else {
      wx.showToast({
        title: '请先选择您的收货地址',
        icon:'none'
      })
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  //供应商列表
  getSuplierList() {
    global.$ajax("/uac/auth/wx/common/findFacilitatorInfoListByFacilitatorTypeId", {
        facilitatorTypeId: 9
      })
      .then(res => {
        this.setData({
          dataList :res.data.result.list
        })
        console.log(this.data.dataList);
      });
  },
  //用户信息
  getUserInfo() {
    global.$ajax("/uac/auth/wx/common/findUserInfo",{}).then(res => {
      this.setData({
        userInfo:res.data.result
      })
      wx.setStorageSync('userInfo222', res.data.result)
      console.log(this.data.userInfo);
    });
  },
  //添加朋友
  addFriend(e) {
    var id = e.currentTarget.dataset.uid;
    wx.showModal({
      title: '提示',
      content: '添加好友将扣除一个积分，确认添加？',
      success:(res)=>{
        if(res.confirm){
          global.$ajax('/uac/auth/wxfans/addCircleFirendApply/' + id,{})
            .then((res) => {
              console.log(res);
              wx.showToast({
                title: '申请发送成功'
              })
              this.getSuplierList();
            })
        }
      }
    })
  },
  //选择地址
  toChooseAddr(){
    wx.navigateTo({
      url: '/pages/shoppingMall/component/my/address/addressList/addressList?type=pcbOrder'
    })
  },
  onLoad: function (options) {
    this.getSuplierList();
    // dataList
    // this.$http.get('/uac/auth/wx/common/findFacilitatorTypeList').then((res)=>{
    //   console.log(res)
    // })
    this.data.resMsg = JSON.parse(wx.getStorageSync("res"));
    this.setData({
      resMsg: JSON.parse(wx.getStorageSync("res"))
    })
    if (this.data.resMsg !== null) {
      this.data.res = JSON.parse(wx.getStorageSync("res")).mdcPcbOrderBViEn;
      this.data.res2 = JSON.parse(wx.getStorageSync("res")).mdcPcbOrderViEn;
    }
    this.setData({
      res: this.data.res,
      res2: this.data.res2
    })
    this.setData({
      useCode:Math.ceil(this.data.res2.totalPrice * 2)
    })
    global.$ajax("/uac/auth/wx/common/findUserInfo",{}).then(res => {
      this.setData({
        userInfo: res.data.result,
      })
      let str = this.data.userInfo.bi - Math.ceil(this.data.res2.totalPrice * 2) > 0 ? 0 : Math.abs((this.data.userInfo.bi - Math.ceil(this.data.res2.totalPrice * 2)) / 2.0)
      this.setData({
        shouldPay: str
      })
      console.log(this.data.userInfo);
    });
    
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
    this.getUserInfo()

    if (this.data.addressId) {
      console.log("喜欢你")
      global.$ajax("/uac/auth/goods/findDeliveryAddressInfo/" + this.data.addressId,{}, { type: 'POST' })
        .then(res => {
          console.log(res.data.result)
          this.setData({
            addr: res.data.result
          })
          // this.data.addr = res.data.result;
        });
    } else {
      global.$ajax("/uac/auth/goods/findDeliveryAddressInfo",{},{type:'GET'}).then((res) => {
        console.log(res)
        //要考虑么哦有默认收货地址的时候
        if (res.data.result !== null) {
          this.setData({
            addr: res.data.result.addressInfo
          })
        }
      })
    }
    
  },
  stopPageScroll(){
    return;
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

function formatTime(date) {
  let str = new Date(date)
  let year = str.getFullYear()
  let month = str.getMonth() + 1 > 9 ? str.getMonth() + 1 : '0' + (str.getMonth() + 1)
  let day = str.getDate() + 1 > 9 ? str.getDate() + 1 : '0' + (str.getDate() + 1)

  return year + '-' + month + '-' + month + ' ' + '00:00:00'
}