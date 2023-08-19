// pages/purchase/component/xyAssistant/investCashout/investCashout.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabList:[
      {label:'充值'},
      {label:'提现'},
      {label:'优选圈'}
    ],
    payList:[
      {label:30},
      {label:50},
      {label:100},
      {label:200}
    ],
    currentInd:0,
    currentPayInd:0,
    investMoney:30,
    investPay:'',
    cashOutMoney:'',
    isTen:false,
    userInfo:{},
    realName:'',
    ppshow: false,  //提现弹框
    codeTxt:'获取验证码',  //验证码字段
    isDisabled: false, //获取验证码按钮
    code:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserInfo()
  },
  // 提现弹窗关闭
  onppClose(){
    this.setData({
      ppshow : false,
      codeTxt : "获取验证码",
      isDisabled : true,
      code:""
    })
  },
  onCode(event){
    this.setData({
      code: event.detail.value
    })
  },
  //获取验证码
  onCodeClick(){
    if (this.data.isDisabled == true) {
      console.log("获取验证码！");
      if (this.data.userInfo.payTelephone != "") {
        // global.$ajax(`/uac/auth/user/checkTelephone`, { telephone: this.data.userInfo.telephone }).then(resp => {
        //   if (resp.data.result.code == 1) {
        global.$ajax(`/uac/auth/sms/sendCode/${this.data.userInfo.payTelephone}`, {})
            .then(res => {
              if (res.data.code == 200) {
                // console.log(res);
                wx.showToast({
                  title: "短信验证码已发送至手机，可能会出现延迟情况，请耐心等待！",
                  icon: 'none'
                })
                this.setData({
                  isDisabled : false
                })
                let num = 60;
                this.time = setInterval(() => {
                  num--;
                  this.setData({
                    codeTxt: "剩余"+num+"s"
                  })
                  if (num == 0) {
                    this.setData({
                      codeTxt: "获取验证码"
                    })
                    clearInterval(this.time);
                    this.setData({
                      isDisabled: true
                    })
                  }
                }, 1000);
              } else {
                wx.showToast({
                  title: res.data.message,
                  icon: 'none'
                })
              }
            });
          // } else {
          //   wx.showToast({
          //     title: resp.data.message,
          //     icon: 'none'
          //   })
        //   }
        // })
      }
    }
  },
  // 验证
  onTelephone(telephone) {
    if (telephone == "" || telephone == null) {
      this.setData({
        isDisabled : false
      })
    } else {
      this.setData({
        isDisabled: true
      })
    }
  },
  //成为会员
  onGoto(){
    wx.navigateTo({
      url: '/pages/purchase/component/xyAssistant/becomeMember/becomeMember'
    })
  },
  //实名验证绑定
  goBindingInfo() {
    wx.navigateTo({
      url: '/pages/purchase/component/xyAssistant/userInfo/userInfo?type=recharge'
    })
  },
  //pay手机绑定
  goBindingInfoP() {
    wx.navigateTo({
      url: '/pages/purchase/component/xyAssistant/myWallet/myWallet'
    })
  },
  //确认提现
  onWiPopupSubmit(){
    var that = this;
    if (
      this.data.realName == "" ||
      this.data.realName == null ||
      this.data.realName == "未绑定姓名"
    ) {
      wx.showToast({
        title: "未绑定姓名",
        icon: 'none'
      })
    } else if (
      this.data.userInfo.payTelephone == "" ||
      this.data.userInfo.payTelephone == null
    ) {
      wx.showToast({
        title: "未绑定手机号码",
        icon: 'none'
      })
    } else if (this.data.code == "") {
      wx.showToast({
        title: "请输入验证码",
        icon: 'none'
      })
    } else {
      let param = {
        phoneCode: this.data.code, // 手机验证
        bi: this.data.cashOutMoney // 积分
      };
      global.$ajax(`/uac/auth/withdraw/saveWithdrawInfo`, param)
        .then(res => {
          // console.log(res);
          if (res.data.code == 200) {
            if (res.data.result.code == 0) {
              wx.showToast({
                title: res.data.result.msg,
                icon: 'none'
              })
            } else {
              wx.showToast({
                title: res.data.result.msg,
                icon: 'none'
              })
              setTimeout(function () {
                that.onppClose();
                that.setData({
                  cashOutMoney: ""
                })
                that.onLoad() 
              }, 1000);
            }
          } else {
            wx.showToast({
              title: res.data.result.msg,
              icon: 'none'
            })
          }
        });
    }
  },
  // 点击tab栏
  changeTab(ev){
    let index = ev.currentTarget.dataset.index;
    if (index != this.data.currentInd){
      if (index == 2){
        wx.switchTab({
          url: '/pages/shoppingMall/index/shoppingIndex'
        })
      }else{
        this.setData({
          currentInd: index
        })
      }
    }
  },
  // 切换价格
  changePayTab(ev){
    let index = ev.currentTarget.dataset.index;
    let item = ev.currentTarget.dataset.item;
    if (index != this.data.currentPayInd) {
      this.setData({
        currentPayInd: index,
        investMoney: item.label,
        investPay: ''
      })
    }
  },
  // 充值金额
  setVal(ev){
    this.setData({
      currentPayInd:null,
      investMoney:ev.detail.value,    
      investPay:ev.detail.value    
    })
  },
  // 提现积分
  setValue(ev){
    let val = ev.detail.value.replace(/^(0+)|[^\d]+/g, "");
    let isTen = true;
    if (val % 10 == 0) {
      isTen = true;
    } else {
      isTen = false;
    }
    this.setData({
      cashOutMoney: ev.detail.value,
      isTen: isTen
    })
  },
  // 充值
  doInvest(){
    if(this.data.investMoney === ''){
      wx.showToast({
        title: '请输入充值金额',
        icon:'none'
      })
      return
    }
    if (!(/(^[1-9]\d*$)/.test(this.data.investMoney))){
      wx.showToast({
        title: '金额只能是正整数',
        icon:'none'
      })
      return
    }
    // /uac/auth/wxPay/prepay
    let params = {
      amount: this.data.investMoney,
      bi: Number(this.data.investMoney) * 2,
      payType: 1,
      repay: false
    }
    global.getPay("/uac/auth/wxPay/prepay", params, (res)=>{
      console.log(res)
      wx.showToast({
        title: res.data.result.msg,
        icon:'none'
      })
    },(err)=>{
      wx.showToast({
        title: err.data.result.msg,
        icon: 'none'
      })
    })
  },
  // 提现
  cashout() {    
    this.onTelephone(this.data.userInfo.payTelephone);
    // wx.showToast({
    //   title: '暂不支持提现',
    //   icon:'none'
    // })
    if (this.data.cashOutMoney == "") {
      wx.showToast({
        title: "请输入提现积分，每日限提现一次，每次最高限额10000积分，提现积分限10倍数",
        icon: 'none'
      })
      return;
    }
    if (this.data.isTen == false) {
      wx.showToast({
        title: "积分输入错误，提现积分限10倍数",
        icon: 'none'
      })
    } else {
      if (
        this.data.userInfo.userLevelId != "" &&
        this.data.userInfo.userLevelId != null &&
        this.data.userInfo.userLevelId != "undefined"
      ) {
        if (this.data.userInfo.userLevelId == "1" && this.data.userInfo.bi < 200) {
          wx.showToast({
            title: "您是普通会员，可用积分小于200，不可提现",
            icon: 'none'
          })
        } else if (
          this.data.userInfo.userLevelId == "3" &&
          this.data.userInfo.bi < 100
        ) {
          wx.showToast({
            title: "您是黄金会员，可用积分小于100，不可提现",
            icon: 'none'
          })
        } else if (
          this.data.userInfo.userLevelId == "5" &&
          this.data.userInfo.bi < 100
        ) {
          wx.showToast({
            title: "您是钻石会员，可用积分小于100，不可提现",
            icon: 'none'
          })
        } else if (
          this.data.userInfo.userLevelId == "6" &&
          this.data.userInfo.bi < 100
        ) {
          wx.showToast({
            title: "您是合伙人，可用积分小于100，不可提现",
            icon: 'none'
          })
        } else if (Number(this.data.cashOutMoney) > this.data.userInfo.bi) {
          wx.showToast({
            title: '您输入的积分大于可用积分，请重新输入',
            icon: 'none'
          })
        } else if (
          this.data.userInfo.userLevelId == "1" &&
          Number(this.data.cashOutMoney) < 200
        ) {
          wx.showToast({
            title: `您是普通会员，输入的积分小于200，不可提现`,
            icon: 'none'
          })
        } else if (
          this.data.userInfo.userLevelId == "3" &&
          Number(this.data.cashOutMoney) < 100
        ) {
          wx.showToast({
            title: `您是黄金会员，输入的积分小于100，不可提现`,
            icon: 'none'
          })
        } else if (
          this.data.userInfo.userLevelId == "5" &&
          Number(this.data.cashOutMoney) < 100
        ) {
          wx.showToast({
            title: `您是钻石会员，输入的积分小于100，不可提现`,
            icon: 'none'
          })
        } else if (
          this.data.userInfo.userLevelId == "6" &&
          Number(this.data.cashOutMoney) < 100
        ) {
          wx.showToast({
            title: `您是合伙人，输入的积分小于100，不可提现`,
            icon: 'none'
          })
        } else {
          this.setData({
            ppshow: false
          })
          // wx.showToast({
          //   title: `keyitixian`,
          //   icon: 'none'
          // })
        }
      } else {
        wx.showToast({
          title: `系统异常，请稍后重试！`,
          icon: 'none'
        })
      }
    }
  },
  // 获取用户信息
  getUserInfo() {
    global.$ajax("/uac/auth/wx/common/findUserInfo", {})
      .then(res => {
        if (res.data.code == 200) {
          let realName = (res.data.result.realName == null || res.data.result.realName =='') ? "未绑定姓名" : res.data.result.realName;
          res.data.result.userLevelId == 1 ? (res.data.result.serviceCharge = "20") : (res.data.result.serviceCharge = "15");
          this.setData({
            userInfo: res.data.result,
            realName: realName
          })
          console.log(this.data.userInfo)
        }
      })
      .catch(res => {
        console.log(res)
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