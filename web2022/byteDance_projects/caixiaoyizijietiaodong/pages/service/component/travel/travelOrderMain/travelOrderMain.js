// pages/service/travelOrderMain/travelOrderMain.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPswBoard:false,//显示安全键盘
    password:'',//密码
    tourId:{},
    money:{},
    userInfo:{},
    toBookData:{},//请求获取，
    storeData:{},//缓存获取
    cusMsg:{
      name: '',
      email: '',
      phone: '',
      idNo: '',
    },
    useTimeS: "",
    imgUrl:"",
    routeTitle: "",
    setTypeS: "",
    setEditionS: "",
    nowPoints: 0,
    travelPoints: 0,
    payPoints: 0,
    payTravelPoints: 0,
    allPrice: 0,
    enterPassword:'',//输入的密码

  },
  //返回上一页
  rLastIndex: function () {
    tt.navigateBack({
      delta: 1
    })
  },
  getTripDetail() {
    tt.showToast({
      title: '加载中',
      icon: 'none'
    })
    global.$ajax(`/uac/auth/tour/findTourProjectDetail/${this.data.tourId}`, {}, { type: 'POST' })
      .then(res => {
        console.log(res)
        if (res.data.code == 200) {
          // console.log(res);
          this.setData({
            toBookData: res.data.result
          })
          tt.hideLoading()
        }
      });
  },
  getUserInfo() {
    global.$ajax("/uac/auth/wx/common/findUserInfo",{},{type:'POST'}).then(res => {
      // console.log(res);
      this.setData({
        userInfo: res.data.result
      })
    });
  },
  setValue(e){
    console.log(e)
    let value = e.detail.value
    let key = e.currentTarget.dataset.key
    console.log(key)
    console.log(value)
    this.data.cusMsg[key] = value
    this.setData({
      cusMsg:this.data.cusMsg
    })
  },
  /**
   * 最后一步，支付操作，慎重！！！
   */
  onstepPay:function(){
    let emailReg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
    let phone = /^1\d{10}$/
    let idNoReg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
    if (this.data.cusMsg.name.trim().length < 2 || this.data.cusMsg.name.trim().length > 20){
      tt.showToast({
        title: '姓名位数2~20位',
        icon:'none'
      })
      return
    }
    if (this.data.cusMsg.email.trim() != '' && !emailReg.test(this.data.cusMsg.email)) {
      tt.showToast({
        title: '请输入正确的邮箱',
        icon: 'none'
      })
      return
    }
    if (this.data.cusMsg.phone.trim() == '') {
      tt.showToast({
        title: '请输入手机号码',
        icon: 'none'
      })
      return
    }
    if (!phone.test(this.data.cusMsg.phone)) {
      tt.showToast({
        title: '请输入正确的手机号码',
        icon: 'none'
      })
      return
    }
    if (this.data.cusMsg.idNo.trim() == '') {
      tt.showToast({
        title: '请输入身份证号',
        icon: 'none'
      })
      return
    }
    if (!idNoReg.test(this.data.cusMsg.idNo)) {
      tt.showToast({
        title: '请输入正确的身份证号',
        icon: 'none'
      })
      return
    }
    let _this = this
    tt.showModal({
      title: '提示',
      content: '请确认已上所填信息无误，是否继续支付？',
      confirmColor: "#040df9",
      success: function (res) {
        if (res.confirm) {
          tt.setStorageSync('userMsg', JSON.stringify(_this.data.cusMsg))
          //校验是否有支付密码
          let params = {
            userName: _this.data.cusMsg.name,
            userPhone: _this.data.cusMsg.phone,
            userEmail: _this.data.cusMsg.email,
            userIdCard: _this.data.cusMsg.idNo,
            tourId: _this.data.tourId,
            pid:'',
            repay: false,
            personOrderCount: _this.data.storeData.personOrderCount,
            childOrderCount: _this.data.storeData.childOrderCount,
            tourDate: formatTime(_this.data.useTimeS),
            newPassword: ""
          }
          _this.setData({
            params: params
          })
          console.log(params)
          if (_this.data.storeData.money.amount == '' || _this.data.storeData.money.amount == 0){
            //积分支付
            if (_this.data.userInfo.payPassword != null){
              //有支付密码
              // this.payContinute(params);//先输入密码，再继续积分支付
              _this.setData({
                showPswBoard:true
              })
            }else{
              //去设置支付密码
              tt.navigateTo({
                url: `/pages/purchase/component/xyAssistant/setPassword/setPasssword?setType=trip`
              })
            }
          }else{
            //微信支付
            let that = this
            tt.showLoading({
              title:'支付中...',
              icon:'none'
            })
            global.getPay("/uac/auth/tour/saveTourOrder", params, 
            ()=>{
              //成功
              tt.hideLoading()
              tt.showToast({
                title: '支付成功',
                icon: 'none'
              })
              var pages = getCurrentPages();
              var prevPage = pages[pages.length - 2]; //上一个页面
              //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
              prevPage.setData({
                type: 1
              })
              tt.navigateTo({
                url: '/pages/purchase/component/xyAssistant/travelBill/travelBill',
              })
            }, ()=>{
              //失败
              tt.hideLoading()
              tt.showToast({
                title: '您已取消支付',
                icon: 'none'
              })
              var pages = getCurrentPages();
              var prevPage = pages[pages.length - 2]; //上一个页面
              //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
              prevPage.setData({
                type: 2
              })
              tt.navigateTo({
                url: '/pages/purchase/component/xyAssistant/travelBill/travelBill',
              })
            })
          }
        }
      }
    })
  },
  payContinute(e){
    console.log("继续")
    //输入完了密码之后的操作
    tt.showLoading({
      title: '支付中...'
    })
    this.data.params.newPassword = setEncode64(this.data.password);
    this.setData({
      params: this.data.params
    })
    // console.log(params);
    global.$ajax("/uac/auth/tour/saveTourOrder", this.data.params, { type: 'POST' })
      .then(res => {
          console.log(res);
        if (res.data.code == 200) {
          if (res.data.result.code == 1) {
            tt.showToast({
              title: res.data.result.msg,
              icon: 'none',
            })
            setTimeout(function () {
              //跳转到订单列表
              tt.navigateTo({
                url: '/pages/purchase/component/xyAssistant/travelBill/travelBill'
              })
            }, 1000)
          } else {
            tt.showToast({
              title: res.data.result.msg,
              icon: 'none',
            })
            // Toast(res.data.result.msg);
          }
        }
      });
  },
  
  checkpswd(e){
    console.log("嘿嘿")
    console.log(e.detail)
    this.setData({
      password: e.detail,
      showPswBoard:false
    })
    this.payContinute(this.data.params)
    // tt.showLoading({
    //   title:'校验中'
    // })
  }, 
  close(){
    //关闭键盘
    this.setData({
      showPswBoard:false
    })
  }, 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let toBookData = tt.getStorageSync("bookData") != '' ? JSON.parse(tt.getStorageSync("bookData")) : {}
    this.setData({
      tourId: options.id,
      useTimeS: toBookData.time,
      storeData: toBookData
    })
    this.getTripDetail();
    let str = formatTime(this.data.useTimeS)
    console.log(str)
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

function formatTime(date){
  let str = new Date(date)
  let year = str.getFullYear()
  let month = str.getMonth() + 1 > 9 ? str.getMonth() + 1 : '0' + (str.getMonth() + 1)
  let day = str.getDate() > 9 ? str.getDate() : '0' + str.getDate()

  return year+'-'+month+'-'+day+' '+ '00:00:00'
}