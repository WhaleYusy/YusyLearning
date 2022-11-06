// pages/purchase/component/xyAssistant/myCard/myCard.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:"",
    name:"",
    imgUrl:"",
    job:"",
    companyName:"",
    phone:"",
    wechat:"",
    email:"",
    area:"",
    hobby:"",
    address:"",
    qrcodeUrl:"",
    fromShare:false,
    imageSavePath:""
  },
  imgView(e) {
    var img = [];
    img.push(e.currentTarget.dataset.img)
    tt.previewImage({
      urls: img
    })
  },
  // 返回小易助手主页
  rLastPage: function () {
    tt.navigateBack({
      delta: 1
    })
  },
  /**
   * 初始化二维码
   */
  initQrCode(){
    let data = {
      page:'pages/purchase/component/xyAssistant/myCard/myCard',
      scene:this.data.id
    }
    global.$ajax('/uac/auth/wx/gen_qr_code', data, { type: 'POST' }).then((res) => {
      if (res.data.code == 200) {
        this.setData({
          qrcodeUrl: res.data.result.attachmentUrl
        })
      }
    }).catch(err => {
    })
    this.getXcxCode(data.scene);
  },
  /**
   * 初始化用户信息
   */
  initUserInfo(scene){
    if(scene == null){
        global.$ajax('/uac/auth/wx/common/findUserInfo', {}).then((res) => {
          if (res.data.code == 200) {
            let data = res.data.result;
            this.setData({
              name: data.nickName,
              imgUrl: data.userPic,
              job: data.job,
              companyName: data.companyName,
              phone: data.telephone,
              wechat: data.wxNumber,
              email: data.email,
              area: data.nativePlace,
              hobby: data.hobby,
              address: data.address,
              id: data.id
            })
            this.initQrCode();
          }
        }).catch(err => {
      })
    }else{
      global.$ajax('/uac/auth/wx/common/findUserInfoById/' + scene).then((res) => {
        if (res.data.code == 200) {
          let data = res.data.result;
          this.setData({
            name: data.nickName,
            imgUrl: data.userPic,
            job: data.job,
            companyName: data.companyName,
            phone: data.telephone,
            wechat: data.wxNumber,
            email: data.email,
            area: data.nativePlace,
            hobby: data.hobby,
            address: data.address,
            id: data.id
          })
          this.initQrCode();
        }
      }).catch(err => {
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const scene = decodeURIComponent(options.scene) === "undefined" ? null : decodeURIComponent(options.scene);    
    if (scene){
      this.setData({
        fromShare:true
      })
    }
    this.initUserInfo(scene);
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
  getXcxCode(id) {
    global.$ajax(`/uac/auth/wx/getUserPostcard`, { id: id }, { type: 'GET' }).then(res => {
      console.log(res)
      if (res.data.code == 200) {
        this.setData({
          imageSavePath: res.data.result.attachmentUrl
        })
      }
    });
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    let userId = wx.getStorageSync('userInfo') != '' ? JSON.parse(wx.getStorageSync('userInfo')).userId : ''
    let titleName = this.data.name || "采销更容易，爱上【采销易】"
    let message = {
      title: titleName,
      desc: titleName,
      path: "pages/purchase/component/xyAssistant/myCard/myCard?scene=" + this.data.id + '&pid=' + userId,
      imageUrl: this.data.imageSavePath
    }
    console.log(message)
    return message
  }
})