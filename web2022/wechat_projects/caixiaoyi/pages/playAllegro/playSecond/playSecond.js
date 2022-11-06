// pages/playAllegro/playSecond/playSecond.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showBoardLayer:false,
    select:1,
    submitDataPage2:{
      pcbNum:0,
      layerNum:0,
      pcbWide:0,
      pcbLong:0,
      //一下的字段是自己命名的
      panelization:1,
      depth:0.4,
      soldermaskColor:'红色',
      charColor:'白色',
      copperThickness:'1盎司',
      soldermaskCover:'过孔盖油',
      padSpraying:'有铅喷锡',
      test:'全部抽测',
      delivery:'12H',
    },
    banNum:[1,2,3],//拼板个数
    banThick:[1.6,0.4,0.6,0.8],
    banColor:['红色','黄色','蓝色','绿色','黑色','白色'],
    banCodeColor:['白色'],
    banTonghou:['1盎司','2盎司'],
    banCover:['过孔盖油','过孔开窗'],
    banPendu:['有铅喷锡','无铅喷锡','沉金'],
    banTest:['全部抽测','抽测','不用测试'],
    banPostTime:['12H','24H','48H','3-4天','5-6天'],
    index2:['1']
  },
  
  showBoard(e){
    let select = e.currentTarget.dataset.select;
    let index = e.currentTarget.dataset.index
    console.log(select)
    console.log(index)
    this.setData({
      showBoardLayer:true,
      select:select,
    })
  },
  //赋值还没有对应上
  chooseLayer1(e){
    console.log(e.detail.value[0])
    this.data.submitDataPage2.panelization = this.data.banNum[e.detail.value[0]]
    this.setData({
      submitDataPage2: this.data.submitDataPage2,
      index1: e.detail.value
    })
  },
  chooseLayer2(e){
    console.log(e.detail.value)
    this.data.submitDataPage2.depth = this.data.banThick[e.detail.value[0]]
    this.setData({
      submitDataPage2: this.data.submitDataPage2,
      index2: e.detail.value
    })
  },
  chooseLayer3(e){
    this.data.submitDataPage2.soldermaskColor = this.data.banColor[e.detail.value[0]]
    this.setData({
      submitDataPage2: this.data.submitDataPage2,
      index3: e.detail.value
    })
  },
  chooseLayer4(e){
    this.data.submitDataPage2.charColor = this.data.banCodeColor[e.detail.value[0]]
    this.setData({
      submitDataPage2: this.data.submitDataPage2,
      index4: e.detail.value
    })
  },
  chooseLayer5(e){
    this.data.submitDataPage2.copperThickness = this.data.banTonghou[e.detail.value[0]]
    this.setData({
      submitDataPage2: this.data.submitDataPage2,
      index5: e.detail.value
    })
  },
  chooseLayer6(e){
    this.data.submitDataPage2.soldermaskCover = this.data.banCover[e.detail.value[0]]
    this.setData({
      submitDataPage2: this.data.submitDataPage2,
      index6: e.detail.value
    })
  },
  chooseLayer7(e){
    this.data.submitDataPage2.padSpraying = this.data.banPendu[e.detail.value[0]]
    this.setData({
      submitDataPage2: this.data.submitDataPage2,
      index7: e.detail.value
    })
  },
  chooseLayer8(e){
    this.data.submitDataPage2.test = this.data.banTest[e.detail.value[0]]
    this.setData({
      submitDataPage2: this.data.submitDataPage2,
      index8: e.detail.value
    })
  },
  chooseLayer9(e){
    this.data.submitDataPage2.delivery = this.data.banPostTime[e.detail.value[0]]
    this.setData({
      submitDataPage2: this.data.submitDataPage2,
      index9: e.detail.value
    })
  },

  sureChoose(){
    this.setData({
      showBoardLayer: false
    })
  },
  goNext(){
    if (this.data.submitDataPage2.layerNum !== '' && this.data.submitDataPage2.pcbWide !== null
      && this.data.submitDataPage2.pcbNum !== '' && this.data.submitDataPage2.pcbLong !== null
      && this.data.submitDataPage2.panelization !== '' && this.data.submitDataPage2.depth !== ''
      && this.data.submitDataPage2.soldermaskColor !== '' && this.data.submitDataPage2.charColor !== ''
      && this.data.submitDataPage2.copperThickness !== '' && this.data.submitDataPage2.soldermaskCover !== ''
      && this.data.submitDataPage2.padSpraying !== '' && this.data.submitDataPage2.test !== ''
      && this.data.submitDataPage2.delivery !== ''
    ) {
      let data = {
        layerNum: this.data.submitDataPage2.layerNum, pcbWide: Number(this.data.submitDataPage2.pcbWide),
        pcbNum: this.data.submitDataPage2.pcbNum, pcbLong: Number(this.data.submitDataPage2.pcbLong), panelization: Number(this.data.submitDataPage2.panelization), depth: this.data.submitDataPage2.depth,
        soldermaskColor: this.data.submitDataPage2.soldermaskColor, charColor: this.data.submitDataPage2.charColor,
        copperThickness: this.data.submitDataPage2.copperThickness, soldermaskCover: this.data.submitDataPage2.soldermaskCover,
        padSpraying: this.data.submitDataPage2.padSpraying, test: this.data.submitDataPage2.test, delivery: this.data.submitDataPage2.delivery
      }

      wx.setStorageSync('submitDataPage2', JSON.stringify(this.submitDataPage2));
      global.$ajax('/uac/auth/pcb/preGenPcbInformation', data).then((res) => {
        console.log(res)
        if (res.data.message !== '操作成功') {
          wx.showToast({
            title: res.data.message,
            icon:'none'
          })
        } else {
          wx.setStorageSync('res', JSON.stringify(res.data.result))
          wx.setStorageSync('msg', JSON.stringify(res.data.message))
          wx.navigateTo({
            url:'/pages/playAllegro/playThird/playThird'
          })
        }
      })

    } else {
      wx.showToast({
        title: '请填写完整',
        icon:'none'
      })
    }

    // wx.navigateTo({
    //   url:'/pages/playAllegro/playThird/playThird'
    // })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.data.submitData = JSON.parse(localStorage.getItem('submitData1'))
    let item = wx.getStorageSync('submitData1') !== '' ? JSON.parse(wx.getStorageSync('submitData1')) : '' ;
    this.data.submitDataPage2.layerNum = item.layerNum//层数
    this.data.submitDataPage2.pcbWide = item.pcbWide//宽度
    this.data.submitDataPage2.pcbNum = item.pcbNum//板子数量
    this.data.submitDataPage2.pcbLong = item.pcbLong//板子长度
    this.setData({
      submitDataPage2: this.data.submitDataPage2
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