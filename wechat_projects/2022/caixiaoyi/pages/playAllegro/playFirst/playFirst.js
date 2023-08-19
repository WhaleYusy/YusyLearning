// pages/playAllegro/playFirst/playFirst.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    layer:2,
    ifShow:false,
    isShowSelect:false,//选择班子数量的板子
    layerlist:[2,1,4,6],
    radioList: [
      5, 10, 15, 20, 25, 30, 50, 75, 100, 125, 150, 200, 250, 300, 350, 400, 450, 500, 600, 700, 800, 900, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 5500, 6000, 6500, 7000, 7500, 8000
    ],
    submitData:{
      pcbWide:'',
      pcbLong:'',
      pcbNum:''
    },
    imgUrls:[]
  },
  showLayerBoard(){
    this.setData({
      ifShow:true
    })
  },
  chooseLayer(e){
    let layer = this.data.layerlist[e.detail.value[0]]
    console.log(layer)
    this.setData({
      layer:layer,
      index: e.detail.value
    })
  },
  sureChoose(){
    this.setData({
      ifShow:false
    })
  },
  openSelectBox(){
    this.setData({
      isShowSelect:true
    })
  },
  closeSelectBox(){
    this.setData({
      isShowSelect: false
    })
  },
  setValue(e){
    let name = e.currentTarget.dataset.name
    this.data.submitData[name] = e.detail.value
    this.setData({
      submitData: this.data.submitData
    })
  },
  radioChange(e){
    let index = Number(e.detail.value)
    console.log(index)
    this.data.submitData.pcbNum = index
    console.log(this.data.submitData)
    this.setData({
      submitData: this.data.submitData,
      isShowSelect:false
    })
  },
  getSwiper(){
    global.$ajax('/uac/auth/wxAdver/getAdverListByType',{type:'FA'}).then(res=>{
      this.setData({
        imgUrls:res.data.result
      })
    }).catch(res=>{

    })
  },
  goNext(){
    if (this.data.submitData.pcbWide.trim() == "") {
      wx.showToast({
        title: '请输入板子宽度',
        icon:'none'
      })
      return
    }
    if (this.data.submitData.pcbWide > 50) {
      wx.showToast({
        title: '您输入的尺寸是否单位有误？我司不接超过50厘米宽的板子',
        icon: 'none'
      })
      return
    }
    if (this.data.submitData.pcbLong.trim() == "") {
      wx.showToast({
        title: '请输入板子长度',
        icon: 'none'
      })
      return
    }
    if (this.data.submitData.pcbLong > 50) {
      wx.showToast({
        title: '您输入的尺寸是否单位有误？我司不接超过50厘米长的板子',
        icon: 'none'
      })
      return
    }
    if (this.data.submitData.pcbNum == "") {
      wx.showToast({
        title: '请选择板子数量',
        icon: 'none'
      })
      return
    }
    if (isNaN(Number(this.data.submitData.pcbWide)) || isNaN(Number(this.data.submitData.pcbLong)) ){
      //非数字
      wx.showToast({
        title:'板子参数需为数值',
        icon:"none"
      })
      return
    }
    let temObj = Object.assign({ ...this.data.submitData }, { layerNum: this.data.layer})
    wx.setStorageSync('submitData1', JSON.stringify(temObj))
    // this.$router.push({ path: "/playingAllegro/secondPlayingAllegro", query: { submitData: this.data.submitData } });
    wx.navigateTo({
      url: '/pages/playAllegro/playSecond/playSecond'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSwiper()
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