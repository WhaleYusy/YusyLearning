// pages/purchase/component/xyAssistant/systemAssitant/systemAssitant.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeCodes: [],//人脉展开active列表
    image1:"",
    image2: "",
    rmList: [
      { name: '1.【采销易】是做什么的？', level: '1',  children: [{ name:'【采销易】为了解决采购的盲区和缺货，找供应商的痛点，也为了解决业务找客户的痛点而创建的一个供应需求平台。'}], loadMore: false },
      { name: '2.【采销易】不是免费吗？为什么还要打赏？ ', level: '2', children: [{ name: '【采销易】为了防止发布需求的采购受到不必要的骚扰，特地设定的门槛。我们设定了免费找客户的方式，只要您有足够多的粉丝，或者给【采销易】做宣传/转发需求都能免费找客户。即使土豪不缺钱，他顶多花费30元，即可以认识一个采购，这个采购不仅负责这一块材料，而且正在找供应商。如果觉得需求不满意，可又评价不满意，系统全额退还积分。' }], loadMore: true },
      {
        name: '3. 如果我对需求不满意怎么办？ ', level: '3',  children: [{
        name:'如果您对【采销易】里的需求不满意，对需求公司不满意或者发布者不满意。只要您评价不满意，我们马上退还您的积分。不问原因，即时/全额退还积分。'
      }],  loadMore: false },
      {
        name: '4. 怎样得到买脉积分？', level: '4',  children: [{
        name:'1：圈到一个粉丝，赠送积分\n'},
        {name:'2：您的粉丝发布采购需求得到满意评价，赠送积分'},
        {name:'3：您自己发布采购需求得到满意评价，赠送积分\n'},
        {name:'4：您的粉丝购买采购需，赠送积分\n'},
        {name:'5：您的粉丝缴纳会员费，赠送积分'},
      ],  loadMore: false },
      {
        name: '5. 怎么圈粉，发展粉丝？', level: '5',  children: [{
        name:'1： 扫二维码，加管理员的微信，问管理员方法。'
      }, {
          name: '2：把采购需求或者您认为好的文章，推荐出去，您的朋友或者微信群友，进入您转发的链接，都将成为您的粉丝。'
        }],loadMore: false },
    ],
    param: {
      pageNum: 1,
      pageSize: 10
    },
    friendList:[],
    isShowMore:false,
    unreadNum:0,
    unreadNumMsg:0
  },
  // 人脉列表伸缩操作
  onchangeCode: function (event) {
    let detail = event.detail;
    this.setData({
      activeCodes: detail
    });
  },
  loadImage(){

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    global.$ajax('/uac/auth/wx/demand/queryQrcode2Info/2', {}, { type: 'GET' }).then(res => {
      this.setData({
        image1: res.data.result.qrcodeUrl
      })
    }).catch(res => {

    })
    global.$ajax('/uac/auth/wx/demand/queryQrcode2Info/3', {}, { type: 'GET' }).then(res => {
      this.setData({
        image2: res.data.result.qrcodeUrl
      })
    }).catch(res => {

    })
    // this.getFindCircleFirdenApplyList();
    this.getFindUnApplyCount();
    this.getFindUnReadSysMsg();
  },
  // 查询未验证的用户数量（圈友）
  getFindUnApplyCount() {
      global.$ajax('/uac/auth/wxfans/findUnApplyCount',{},{type: 'GET'}).then(res => {
      if (res.data.code == 200) {
         if(res.data.result >= 100){
           this.setData({
             unreadNum : "99+"
           })
         } else {
           this.setData({
             unreadNum: res.data.result
           })
         }
      }
    });
  },
  // 查询未验证的用户数量（系统消息）
  getFindUnReadSysMsg() {
    global.$ajax('/uac/auth/user/findUnReadSysMsg', { type: 'POST' }).then(res => {
      if (res.data.code == 200) {
        if (res.data.result >= 100) {
          this.setData({
            unreadNumMsg: "99+"
          })
        } else {
          this.setData({
            unreadNumMsg: res.data.result
          })
        }
      }
    });
  },
  // 获取新圈友列表
  getFindCircleFirdenApplyList:function() {
    global.$ajax('/uac/auth/wxfans/findCircleFirdenApplyList', this.data.param, { type: 'POST' }).then(res => {
        if (res.data.code == 200) {
          // console.log(res);
          if (res.data.result.list.length > 0) {
            var fList = this.data.friendList;
            fList = fList.concat(res.data.result.list);
            this.setData({
              friendList: fList
            })
            this.setData({
              isShowMore:false
            })
          } else {
            this.setData({
              isShowMore: true
            })
          }
        }
      });
  },
  gotoSx: function(){
    console.log("tiaozhuan");
    this.setData({
      unreadNumMsg : 0
    })
    wx.navigateTo({
      url: '/pages/purchase/component/xyAssistant/systemDetail/systemDetail'
    })
  },
  gotoGf:function(){
    console.log("tiaozhuan");
    this.setData({
      unreadNum: 0
    })
    wx.navigateTo({
      url: '/pages/purchase/component/xyAssistant/goodFriend/goodFriend'
    })
  },
  onMoreClick: function () {
    var p = this.data.param;
    p.pageNum = p.pageNum + 1;
    this.setData({
      param : p
    })
    this.getFindCircleFirdenApplyList();
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