// pages/service/component/vote/voterDetail/voteDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isReApply: false,//有数据了才显示界面
    status: '',
    isSignUp: '',
    id: '',
    voteAdverInfo: [],
    userInfos: {},
    param: {
      id: "",
      actionId: ""
    },
  },
  getReApply(id) {
    global.$ajax(`/uac/auth/vote/checkUserApply/${id}`, {}, { type: 'POST' }).then(res => {
      if (res.data.code == 200) {
        // console.log(res);
        this.setData({
          isReApply: true,
          status: res.data.result.status,
        })
        if (res.data.result.reApply == false) {
          this.setData({
            isSignUp: true
          })
        } else {
          this.setData({
            isSignUp: false
          })
        }
      }
    });
  },
  goToApply() {
    //去报名
    wx.navigateTo({
      url: `/pages/service/component/vote/voteSignUp/voteSignUp?id=${this.data.voteId}`
    })
  },
  onGoBack(){
    wx.navigateBack({
      
    })
  },
  onVote() {
    if (this.data.userInfos.limitCountStatus == 1) {
      wx.showToast({
        title: this.data.userInfos.limitMsg,
        icon: 'none'
      })
    } else {
      wx.showLoading({
        title: '投票中...'
      })
      global.$ajax("/uac/auth/vote/voteThemeToUser", {
        id: this.data.voteId,
        actionId: this.data.actionId
      }, { type: 'POST' }).then(res => {
        if (res.data.code == 200) {
          wx.hideLoading()
          wx.showToast({
            title: '投票成功'
          })
         wx.navigateBack({
           success: function (e) {
             var page = getCurrentPages().pop();
             if (page == undefined || page == null) return;
             page.onLoad2();
           }
         })
        }
      });
    }
  },
  onVoteAdverInfo(e) {
    let data = e.currentTarget.dataset.item
    if (data.supplierId !== null) {
      //原来的操作
      // this.$router.push({
      //   path: "/supplyCircleDetail",
      //   query: { id: data.supplierId }
      // })
      //去详情
      wx.navigateTo({
        url: '/pages/supply/component/supplyDetail/supplyDetail?id=' + data.supplierId
      })
    } else {
      wx.showToast({
        title: '数据异常，请联系管理员',
        icon: 'none'
      })
    }
    //
  },
  //详情
  getFindVoteThemeDeatil() {
    global.$ajax("/uac/auth/vote/findVoteThemeDeatil", this.data.param, { type: 'POST' }).then(res => {
      // console.log(res);
      console.log(res)
      if (res.data.code == 200) {
        this.setData({
          userInfos: res.data.result
        })
      }
    });
  },
  //供应商广告
  getFindRandomVoteAdvertisingInfo() {
    global.$ajax("/uac/auth/vote/findVoteAdvertisingInfoList", {}, { type: 'GET' }).then(res => {
      if (res.data.code == 200) {
        // console.log(res)
        this.setData({
          voteAdverInfo: res.data.result
        })
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.data.param.id = options.voteId
    this.data.param.actionId = options.actionId
    this.setData({
      voteId: options.voteId,
      actionId: options.actionId,
      param: this.data.param
    })
    this.getReApply(this.data.actionId);
    this.getFindRandomVoteAdvertisingInfo();
    this.getFindVoteThemeDeatil()
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