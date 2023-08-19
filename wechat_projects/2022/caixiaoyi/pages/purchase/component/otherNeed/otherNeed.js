// pages/purchase/component/otherNeed/otherNeed.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShowBtn: false,
    showNoMore:false,
    total:0,
    loginUserId: '',
    requestData: {
      pageSize: 10,
      pageNum: 1,
    },
    purchaseProductlist:[
      // {title:'招聘文员',comName:'深圳市鑫铭五金有限公司',num:12,salary:'6k-7k',imgUrl:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1774420118,989846740&fm=26&gp=0.jpg',address:'深圳市坪山区坑新街道新桥路78679790790',product:'非标螺丝、螺旋、垫片798798769798698698'}
  ],
  },
  goPage(e){
    let id = e.currentTarget.dataset.id
    //去详情
    wx.navigateTo({
      url: '/pages/purchase/component/otherNeed/otherNeddDetail/otherNeedDetail?id=' + id
    })
  },
  goChat(e){
    var item = e.currentTarget.dataset.item;
    console.log(item);
    wx.navigateTo({
      url: '/pages/chatDetails/chatDetails?userId=' + item.uid + '&shopLogo=' + item.userPic + '&sendName=' + item.nickName
    })
  },
  // 查询用户是否入驻供应商
  getCheckUserEnterSupplier() {
    global.$ajax("/uac/auth/wx/common/checkUserEnterSupplier", {}, { type: 'POST' })
      .then(res => {
        this.setData({
          isShowBtn: res.data.result
        })
      });
  },
  getDataType() {
    // 获取发布类型
    let that = this
    global.$ajax("/uac/auth/wx/common/demandTypeList", {}, { type: 'GET' })
      .then(res => {
        // console.log(res);
        if (res.data.code == 200) {
          let arr = res.data.result;
          for (let i = 0; i < arr.length; i++) {
            if (arr[i].demandTypeName == "物料需求") {
              this.data.requestData.demandTypeId = arr[i].id
              this.setData({
                requestData: this.data.requestData
              })
              console.log("在这")
              this.getOtherNeedList();//获取列表
            }
          }
        }
      })
      .catch(res => {
        // wx.showToast({
        //   title: res.data.message,
        //   icon: 'none'
        // })
        console.log(res)
      });
  },
  getOtherNeedList() {
    wx.showLoading({
      title: '加载中...',
      mask:false
    })
    //其他需求列表
    global.$ajax('/uac/auth/wx/demand/findOtherDemandList', this.data.requestData, { type: 'POST' }).then(res => {
      console.log(res)
      let arr = JSON.parse(JSON.stringify(this.data.purchaseProductlist))
      if (res.data.code == 200) {
        if (res.data.result.list.length > 0) {
          arr = arr.concat(res.data.result.list)
          this.setData({
            purchaseProductlist:arr,
            total: Number(res.data.result.total)
          })
          if(this.data.total == this.data.purchaseProductlist.length){
            this.setData({
              showNoMore: true
            })
          }
        } else {
          //没有更多
          this.setData({
            showNoMore:true
          })
        }
        wx.hideLoading()
      }
    }).catch(err => {
      console.log(err)
    })
  },
  toPublishNeed(){
    //是供应商，就显示发布按钮
  },
  //
  addCircleFriend(e) {
    let data = e.currentTarget.dataset.item
    // console.log(data);
    //去聊天页面
    // this.$router.push({
    //   path: "/chat",
    //   query: {
    //     nickName: data.nickName,
    //     chatId: data.uid,
    //     headurl: data.userPic
    //   }
    // });
  },
  getAdList() {
    global.$ajax('/uac/auth/wxAdver/getAdverListByType', { type: 1 }, { type: 'POST' }).then(res => {
      this.setData({
        imgUrls: res.data.result
      })
    }).catch(res => {

    })
  },
  setUserId(){
    // console.log(global.state.userInfo)
    this.setData({
      loginUserId: global.state.userInfo.userId
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCheckUserEnterSupplier();//是否供应商
    this.getDataType();
    this.getAdList();
    this.setUserId();
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
    
    if(!this.data.showNoMore){
      this.data.requestData.pageNum += 1
      this.setData({
        requestData: this.data.requestData
      })
      this.getOtherNeedList();
    }else{
      console.log("已经没有更多了")
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})