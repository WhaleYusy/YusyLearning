// pages/purchase/component/userInfo/userInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: "/img/头像.png",
    name: "",
    job: "",
    company: "",
    phone: "",
    telephone: "",
    wechat: "",
    email: "",
    area: "",
    hobby: "",
    address: "",
    isDisabled: false,
    recharge:'' //提现跳转接口
  },
  // 确认修改个人信息
  onEnterUserInfo: function(formE) {
    //打印表单提交数据
    console.log(formE.detail.value)
    let form = formE.detail.value
    if (form.telephone.trim() !== '') {
      if (!(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(form.telephone))) {
        tt.showToast({
          title: '手机号码格式不正确',
          icon: 'none'
        })
        return
      }
    }
    if(form.email.trim() !== ''){
      if (!(/^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(form.email))){
        tt.showToast({
          title: '邮箱格式不正确',
          icon: 'none'
        })
        return
      }
    }
    if (!this.data.isDisabled) {
      this.setData({
        isDisabled: true
      })
      global.$ajax("/uac/auth/wx/common/saveUserInfo", {
        address: form.address.trim(),
        companyName: form.company.trim(),
        email: form.email.trim(),
        fixedPhone: form.phone.trim(),
        telephone: form.telephone.trim(),
        hobby: form.hobby.trim(),
        job: form.job.trim(),
        nativePlace: form.area.trim(),
        realName: form.name.trim(),
        wxNumber: form.wechat.trim()
      }).then(res => {
        if (res.data.code == 200) {
          //完毕跳回小易助手页面
          console.log("修改成功！");
          if (this.data.recharge =="recharge"){
            tt.navigateTo({
              url: "../xyAssistant"
            })
          }
          tt.navigateTo({
            url: "../xyAssistant"
          })
        }
        this.setData({
          isDisabled: false
        })
        tt.showToast({
          title: res.data.result.msg,
          icon: 'none'
        })
      }).catch(res => {
        this.setData({
          isDisabled: false
        })
        tt.showToast({
          title: res.data.result.msg,
          icon: 'none'
        })
      });
    }
  },
  //上传图片
  onEditImage: function() {
    var that = this;
    tt.chooseImage({
      count: 1, // 最多可以选择的图片张数，默认9
      sizeType: ['compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function(res) {
        var avatar = res.tempFilePaths;
        that.setData({
          imgUrl: avatar
        })
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },

  initVisitingCard(userId) {
    console.log(global.state)
    global.$ajax(`/uac/auth/wx/common/findUserInfoById/` + userId, {}, {
      type: 'post'
    }).then(res => {
      console.log(res)
      if (res.data.code == 200) {
        let data = res.data.result;
        this.setData({
          imgUrl: data.userPic,
          name: data.realName,
          job: data.job,
          company: data.companyName,
          phone: data.fixedPhone,
          telephone: data.telephone,
          wechat: data.wxNumber,
          email: data.email,
          area: data.nativePlace,
          hobby: data.hobby,
          address: data.address
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if(options.type){
      this.setData({
        recharge : options.type
      })
    }
    // 初始化名片
    // this.initVisitingCard("763705110483193856");
    this.initVisitingCard(global.state.userInfo.userId);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})