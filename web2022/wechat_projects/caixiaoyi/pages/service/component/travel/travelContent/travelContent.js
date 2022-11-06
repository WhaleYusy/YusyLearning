// pages/service/travelContent/travelContent.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // plType:1,
    // swiperData: [{
    //   imgUrl: "/img/gzhImg/bt1.jpg",
    //   areaUrl: "www.qq.com"
    // }, {
    //   imgUrl: "/img/gzhImg/bt2.jpg",
    //   areaUrl: "www.baidu.com"
    // }, {
    //   imgUrl: "/img/gzhImg/bt3.jpg",
    //   areaUrl: "www.sohu.com"
    // }],
    // travelContent: {
    //   imgUrl: "/img/gzhImg/fj1.jpg",
    //   title: "曼谷芭提雅5日玩法清迈拜县曼谷芭提雅10日玩法",
    //   watch: "135",
    //   collect: "999",
    //   newMoney: 6500,
    //   oldMoney: 7500,
    //   type: "出境玩"
    // },
    // travelIntroduce:[{
    //   content:"曼谷芭提雅5日",
    //   timeString:"8:00 - 9:00 am",
    //   status:1
    // }, {
    //     content: "曼谷芭提雅6日",
    //     timeString: "9:00 - 9:30 am",
    //     status: 0
    //   }, {
    //     content: "曼谷芭提雅7日",
    //     timeString: "10:00 - 11:00 am",
    //     status: 0
    //   }, {
    //     content: "曼谷芭提雅吃饭",
    //     timeString: "11:00 - 12:00 am",
    //     status: 0
    //   }],
    // tficIsshow: false,
    tripDetail:{

    },
  },
  //点赞
  onFabulous() {
    if (!this.data.tripDetail.isClick) {
      wx.showToast({
        title: '您已经点过赞了',
        icon:'none'
      })
      return;
    }
    global.$ajax(`/uac/auth/tour/payAttentionProject/${this.data.id}`)
      .then(res => {
        if (res.data.code == 200) {
          wx.showToast({
            title: '点赞成功',
            icon: 'none'
          })
          var tripDetail = this.data.tripDetail;
          tripDetail.isClick = false;
          tripDetail.zanNum = tripDetail.zanNum + 1;
          this.setData({
            tripDetail: tripDetail
          })
        }
      });
  },
  getDetail(){
    //旅游详情
    wx.showLoading({
      title: '加载中...',
      icon:'none'
    })
    global.$ajax(`/uac/auth/tour/findTourProjectDetail/${this.data.id}`,{},{type:'POST'})
      .then(res => {
        if (res.data.code == 200) {
          // console.log(res);
          this.setData({
            tripDetail: res.data.result
          })
          let ond = this.data.tripDetail;
          if (ond.tourDetDesc != null && ond.tourDetDesc != "") {
            if (ond.tourDetDesc.indexOf("<img") > -1) {
              ond.tourDetDesc = ond.tourDetDesc.replace(/<img/g, '<img style="width:100%;height:auto" ') //防止富文本图片过大
            }
            if (ond.tourDetDesc.indexOf("<p") > -1) {
              ond.tourDetDesc = ond.tourDetDesc.replace(/<p/g, '<p style="word-break: break-all; " ') //防止不换行
            }
          }
          console.log(ond.tourDetDesc)
          this.setData({
            tripDetail: ond
          })

          let imgArr = []
          JSON.parse(res.data.result.images).map(item => {
            imgArr.push({
              picUrl: item
            });
          });
          wx.hideLoading()
          this.setData({
            imgArr: imgArr,
            traitDesc: JSON.parse(res.data.result.traitDesc),
            tourDesc: JSON.parse(res.data.result.tourDesc)
          })
        }
      });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id:options.id
    })
    this.getDetail()
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

  },
  // 三大模块滚动位置
  onplTab: function (event) {
    let type = event.currentTarget.dataset.type;
    if (type == this.data.plType) {
      return;
    }
    this.setData({
      plType: type
    })
    var className = ".pcl"+type;
    const query = wx.createSelectorQuery();
    query.select(className).boundingClientRect();
    query.selectViewport().scrollOffset();
    query.exec((res) => {
      if(res[0]&&res[1]){
        wx.pageScrollTo({
          scrollTop: res[0].top+res[1].scrollTop,
          duration: 300
        })
      }
    })
  },
  // 邀约同行显示
  ontcfInvite: function(){
    this.setData({
      tficIsshow: true
    })
  },
  // 邀约同行隐藏
  onClose:function(){
    this.setData({
      tficIsshow: false
    })
  },
  oncloseMask:function(){
    this.setData({
      tficIsshow: false
    })
  },
  //开始预约跳转页面
  ontcfOrder:function(e){
    var tId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `../travelOrder/travelOrder?id=${tId}`
    })
  },
  //弹出框禁止下层滑动
  preventTouchMove:function(){

  },
  //跳转咨询页面
  ontcfQuestion:function(){
    var item = this.data.tripDetail;
    console.log(item);
    wx.navigateTo({
      url: '/pages/chatDetails/chatDetails?userId=' + item.uid + '&shopLogo=' + item.userPic + '&sendName=' + item.nickName
    })
  }
})