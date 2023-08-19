// pages/purchase/component/xyAssistant/bindPhone/bindPhone.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time:60,
    phone:'',
    smscode:'',
    loading:false,
    timer:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  setValue(e) {
    let value = e.detail.value
    let key = e.currentTarget.dataset.key
    if (key == 'phone') {
      this.setData({
        phone: value
      })
    } else if (key == 'smscode') {
      this.setData({
        smscode: value
      })
    }
  },
  onGetCode() {
    if (
      this.data.phone == "" ||
      !(/^1\d{10}$/.test(
        this.data.phone
      ))
    ) {
      tt.showToast({
        title: '请先输入正确的手机号',
        icon: 'none'
      })
    } else {
      if (this.data.loading) {
        return
      }
      let that = this
      global.$ajax(`/uac/auth/user/checkTelephone`, { telephone: this.data.phone}).then(resp => {
        console.log(resp)
        if (resp.data.result.code == 1){
          global.$ajax(`/uac/auth/sms/sendCode/${this.data.phone}`, {}, { type: 'POST' }).then(res => {
            if (res.data.code == 200) {
              tt.showToast({
                // title: '短信验证码已发送至手机，可能会出现延迟情况，请耐心等待！',
                title: '短信验证码已发送至手机，请耐心等待！',
                icon: 'none'
              })
              that.setData({
                loading: true
              })
              that.data.timer = setInterval(() => {
                if (that.data.time > 0) {
                  that.setData({
                    time: this.data.time - 1
                  })
                } else {
                  clearInterval(that.data.timer)
                  that.setData({
                    timer: null,
                    time: 60,
                    loading: false
                  })
                }
              }, 1000);
            } else {
              tt.showToast({
                title: res.data.message,
                icon: 'none'
              })
            }
          }).catch(err => {
            console.log(err)
            this.setData({
              time: 60,
              loading: false
            })
          })
        }else{
          tt.showToast({
            title: resp.data.result.msg,
            icon:'none'
          })
        }
      })
    }
  },
  bindPhone(){
    if (this.data.phone == "" ||
      !(/^1\d{10}$/.test(
        this.data.phone
      ))) {
      tt.showToast({
        title: '请先输入正确的手机号',
        icon: 'none'
      })
    } else if (this.data.smscode.trim() == ''){
      tt.showToast({
        title: '请输入验证码',
        icon: 'none'
      })
    } else {
      let params = {
        payTelephone: this.data.phone,
        vaildCode: this.data.smscode
      }
      global.$ajax("/uac/auth/user/setTelephone", params).then(res => {
        if (res.data.code == 200) {
          if (res.data.result.code == 1) {
            tt.navigateBack({})
          }
          tt.showToast({
            title: res.data.result.msg,
            icon: 'none'
          })
        }
      });
    }
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