// pages/purchase/component/xyAssistant/xyAssistant.js
Page({

  /**
   * 页面的初始数据 pages/chatDetails/chatDetails
   */
  data: {
    userCon:{//个人信息
      name:"小包子",
      isVip: true,
      userPoints: 320,
      travelPoints: 160,
      searchValue:"",
      searchValueRecord:"",
      userImg: "/img/gzhImg/bt1.jpg"
    },
    xyaType : 1,
    xxList:[],
    quziList: [{//圈子模块信息
      name: '我的企业',
      imgUrl: 'http://qiniuoss.822644.com/wxPic/20191127/768624738418331648.png',
      areaUrl: '/pages/purchase/component/xyAssistant/myBusiness/myBusiness'
      },{
        name: '我的需求',
        imgUrl: 'http://qiniuoss.822644.com/wxPic/20191127/768624949702201344.png',
        areaUrl: '/pages/purchase/component/xyAssistant/myNeed/myNeed'
      },{
        name: '我的打赏',
        imgUrl: 'http://qiniuoss.822644.com/wxPic/20191127/768625390498385920.png',
        areaUrl: '/pages/purchase/component/xyAssistant/myReword/myReword'
      },{
        name: '消息设置',
        imgUrl: 'http://qiniuoss.822644.com/wxPic/20191127/768625540729966592.png',
        areaUrl: '/pages/purchase/component/xyAssistant/newsSettle/newsSettle'
      },{
        name: '充值/提现',
        imgUrl: 'http://qiniuoss.822644.com/wxPic/20191127/768626106415747072.png',
        areaUrl: '/pages/purchase/component/xyAssistant/investCashout/investCashout'
      }, {
        name: '我的账单',
        imgUrl: 'http://qiniuoss.822644.com/wxPic/20191127/768626231179513856.png',
        areaUrl: '/pages/purchase/component/xyAssistant/myBill/myBill'
      },{
        name: '快板订单',
        imgUrl: 'http://qiniuoss.822644.com/wxPic/20191127/768626706863919104.png',
        areaUrl: '/pages/playAllegro/AllegroOrder/indexOrder/indexOrder'
      },{
        name: '旅游订单',
        imgUrl: 'http://qiniuoss.822644.com/wxPic/20191127/768626850242007040.png',
        areaUrl: '/pages/purchase/component/xyAssistant/travelBill/travelBill'
      },{
        name: '我的钱包',
        imgUrl: 'http://qiniuoss.822644.com/wxPic/20191127/768627134976528384.png',
        areaUrl: '/pages/purchase/component/xyAssistant/myWallet/myWallet'
      }],
    rmList: [
      { name: '关注', level: '1', children: [], sum: 0, loadMore:false},
      { name: '粉丝', level: '2', children: [], sum: 0, loadMore: true },
      { name: '客户', level: '3', children: [], sum: 0, loadMore: false },
      { name: '供应商', level: '4', children: [], sum: 0, loadMore: false },
      { name: '圈友', level: '5', children: [], sum: 0, loadMore: false }
    ],
    rmListMore:[
      false, false, false, false, false
    ],
    rmListMorePn:[
      1,1,1,1,1
    ],
    activeCodes:[],//人脉展开active列表
    unreadNum:0,
    total:null,
    noMore:false,
    // 下拉框插件初始化
    selectShow: false,//控制下拉列表的显示隐藏，false隐藏、true显示
    selectShow1: false,//控制下拉列表的显示隐藏，false隐藏、true显示
    selectData: ['会员名称', '供应产品','公司名称'],//下拉列表的数据
    selectIndex: '1', //选择的下拉列表下标
    pageNum:1,
    selectedFlag: [ ],
  },
  //手风琴菜单
   changeToggle: function(e) {
    var index = e.currentTarget.dataset.index;
     
    if (this.data.selectedFlag[index]) {
      this.data.selectedFlag[index] = false;
    } else {
      this.data.selectedFlag[index] = true;
    }
    this.setData({
      selectedFlag: this.data.selectedFlag
    })
  },
  // 点击下拉显示框
  selectTap() {
    this.setData({
      selectShow: !this.data.selectShow
    });
  },
  // 点击下拉列表
  optionTap(e) {
    console.log(e)
    let Index = e.currentTarget.dataset.index;//获取点击的下拉列表的下标
    this.setData({
      selectIndex:String(Index+1),
      selectShow: !this.data.selectShow
    });
    if (Index == 0){
      console.log("嘿嘿额黑")
    }
  },
  // 返回采购易页面
  rPurchaseIndex: function(){
    tt.switchTab({
      url: "/pages/purchase/purchaseIndex"
    })
  },
  // 前往聊天
  goChatDetail(ev){
    let item = ev.currentTarget.dataset.item;
    console.log(item)
    tt.navigateTo({
      url: '/pages/chatDetails/chatDetails?userId=' + item.sendUserId + '&shopLogo=' + item.sendHeadImg + '&sendName=' + item.sendUserName
    })
  },
  // 前往聊天
  goChatDetail2(ev){
    let item = ev.currentTarget.dataset.item;
    console.log(item)
    tt.navigateTo({
      url: '/pages/chatDetails/chatDetails?userId=' + item.chatId + '&shopLogo=' + item.headurl + '&sendName=' + item.nickname
    })
  },
  //跳转修改个人信息页面
  changeUserInfo: function(){
    tt.navigateTo({
      url:"userInfo/userInfo"
    })
  },
  //切换小易助手模块
  onxyaTab: function(event){
    let type = event.currentTarget.dataset.type;
    if (type == this.data.xyaType) {return;}
    this.setData({
      xyaType: type,
      rmList: [
        { name: '关注', level: '1', children: [], sum: 0, loadMore: false },
        { name: '粉丝', level: '2', children: [], sum: 0, loadMore: true },
        { name: '客户', level: '3', children: [], sum: 0, loadMore: false },
        { name: '供应商', level: '4', children: [], sum: 0, loadMore: false },
        { name: '圈友', level: '5', children: [], sum: 0, loadMore: false }
      ],
      pageNum:1,
      xxList:[],
      total:null,
      search: '',
      searchType: '1'
    })
    if (this.data.xyaType == 1){
      this.getChatData();
      this.getFindUnApplyCount();
    } else if (this.data.xyaType == 2){
      this.getPeopleCounting();
      this.getFans();     // 获取粉丝列表
      this.getCustomer(); // 获取客户列表
      this.getSupplier(); // 获取供应商
      this.getFriend(); // 获取圈友
      this.getFollow(); // 我的关注
    }
  },
  //跳转页面
  gotoList: function (event) {
    let url = event.currentTarget.dataset.url;
    tt.navigateTo({
      url: url,
    })
  },
  // 人脉列表伸缩操作
  onchangeCode: function(event){
    let detail = event.detail;
    this.setData({
      activeCodes: detail
    });
  },  
  //监听搜索框，修改data
  onSearchChange: function(event){
    this.setData({
      searchValueRecord:event.detail.value
    })
  },
  //点击搜索对data操作
  onSearch2: function(){
    this.setData({
      rmList: [
        { name: '关注', level: '1', children: [], sum: 0, loadMore: false },
        { name: '粉丝', level: '2', children: [], sum: 0, loadMore: true },
        { name: '客户', level: '3', children: [], sum: 0, loadMore: false },
        { name: '供应商', level: '4', children: [], sum: 0, loadMore: false },
        { name: '圈友', level: '5', children: [], sum: 0, loadMore: false }
      ]      
    })
    this.getPeopleCounting();
    this.getFans();     // 获取粉丝列表
    this.getCustomer(); // 获取客户列表
    this.getSupplier(); // 获取供应商
    this.getFriend(); // 获取圈友
    this.getFollow(); // 我的关注
  },
  //进入我的名片
  onMyCard: function(){
    tt.navigateTo({
      url: 'myCard/myCard',
    })
  },
  //进入我的企业列表
  onMyCompany: function () {
    tt.navigateTo({
      url: 'myBusinessList/myBusinessList',
    })
  },
  // 获取用户信息
  getUserInfo() {
    global.$ajax("/uac/auth/wx/common/findUserInfo").then(res => {
      if (res.data.code == 200) {
        this.setData({
          userCon: res.data.result
        })
      }
    })
    .catch(res => {
      tt.showToast({
        title: res.data.message,
        icon:'none'
      })
    });
  },
  // 获取消息列表
  getChatData() {
    let _this = this;
    let param = {
      pageNum: this.data.pageNum,
      pageSize:10
    }
    global.$ajax("/uac/auth/wxApp/im/listChatUser", param).then(res => {
        if (res.data.code == 200) {
          this.setData({
            xxList: this.data.xxList.concat(res.data.result.list),
            total: res.data.result.total
          })
          if(this.data.total == this.data.xxList.length){
            this.setData({
              noMore:true
            })
          }
        }
      });
  },
  // 查询未验证的用户数量
  getFindUnApplyCount() {
    global.$ajax("/uac/auth/user/findUnReadMsgCount").then(res => {
      if (res.data.code == 200) {
        this.setData({
          unreadNum: res.data.result >= 100 ? "99+" : res.data.result
        })
      }
    });
  },
  // 人数统计
  getPeopleCounting() {
    let params = {
      search: this.data.searchValueRecord,
      searchType: this.data.selectIndex
    }
    global.$ajax("/uac/auth/wxfans/myCircleFirendCount", params).then(res => {
        if (res.data.code == 200) {
          let rmList = this.data.rmList;
          rmList[1].sum = res.data.result.fansCount
          rmList[2].sum = res.data.result.partnerUserCount
          rmList[3].sum = res.data.result.supplierUserCount
          rmList[4].sum = res.data.result.circleUserCount
          this.setData({
            rmList: rmList
          })
        }
      });
  },
  loadMoreNew(event){
    switch (event.currentTarget.dataset.index) {
      case 1: this.getFans(true); break;
      case 2: this.getCustomer(true); break;
      case 3: this.getSupplier(true); break;
      case 4: this.getFriend(true); break;
      default:break;
    }
  },
  // 1.我的粉丝
  getFans(loadMore) {
    let page = this.data.rmListMorePn;
    if (loadMore) {
      page[1] = page[1] +1;
    }else{
      page[1] = 1;
    }     
    this.setData({
      rmListMorePn : page
    })
    let fansParam = {
      pageNum: page[1],
      pageSize: 20,
      search: this.data.searchValueRecord,
      searchType: this.data.selectIndex
    }
    global.$ajax("/uac/auth/wxfans/findFansList2User", fansParam)
      .then(res => {
        if (res.data.code == 200) {       
          let rmList = this.data.rmList;
          let more = this.data.rmListMore;
          rmList[1].children = rmList[1].children.concat(res.data.result.list);
          if (rmList[1].children.length ==0 || rmList[1].children.length == Number(res.data.result.total)) {
            more[1] = false
          }else{
            more[1] = true
          }
          this.setData({
            rmList: rmList,
            rmListMore: more
          })        
        }
      });
  },
  // 2.我的客户
  getCustomer(loadMore) {
    let page = this.data.rmListMorePn;
    if (loadMore) {
      page[2] = page[2] + 1;
    } else {
      page[2] = 1;
    }   
    this.setData({
      rmListMorePn: page
    })
    // 2.我的客户
    let customerParam = {
      pageNum: page[2],
      pageSize: 20,
      search: this.data.searchValueRecord,
      searchType: this.data.selectIndex
    }
    global.$ajax("/uac/auth/wxfans/queryPartnerUserList", customerParam)
      .then(res => {
        if (res.data.code == 200) {
          let rmList = this.data.rmList;
          let more = this.data.rmListMore;
          rmList[2].children = rmList[2].children.concat(res.data.result.list);
          if (rmList[2].children.length == 0 || rmList[2].children.length == Number(res.data.result.total)) {
            more[2] = false
          } else {
            more[2] = true
          }
          this.setData({
            rmList: rmList,
            rmListMore: more
          })
        }
      });
  },
  // 3.我的供应商
  getSupplier(loadMore) {
    let page = this.data.rmListMorePn;
    if (loadMore) {
      page[3] = page[3] + 1;
    } else {
      page[3] = 1;
    }   
    this.setData({
      rmListMorePn: page
    })
    let supplierParam = {
      pageNum: page[3],
      pageSize: 20,
      search: this.data.searchValueRecord,
      searchType: this.data.selectIndex
    }
    global.$ajax("/uac/auth/wxfans/querySupplierUserList", supplierParam).then(res => {
      if (res.data.code == 200) {
        let rmList = this.data.rmList;
        let more = this.data.rmListMore;
        rmList[3].children = rmList[3].children.concat(res.data.result.list);
        if (rmList[3].children.length == 0 || rmList[3].children.length == Number(res.data.result.total)) {
          more[3] = false
        } else {
          more[3] = true
        }
        this.setData({
          rmList: rmList,
          rmListMore: more
        })
      }
    });
  },
  // 4.我的关注
  getFollow() {
    let params = {
      osearch: this.data.searchValueRecord,
      searchType: this.data.selectIndex
    }
    global.$ajax("/uac/auth/wxfans/findSuperInfo", params ).then(res => {
      // console.log(res);
      if (res.data.code == 200) {
        let rmList = this.data.rmList;
        rmList[0].children = rmList[0].children.concat(res.data.result);
        rmList[0].sum = rmList[0].children.length;
        this.setData({
          rmList: rmList
        })
      }
    });
  },
  // 5.我的圈友
  getFriend(loadMore) {
    let page = this.data.rmListMorePn;
    if (loadMore) {
      page[4] = page[4] + 1;
    } else {
      page[4] = 1;
    }   
    this.setData({
      rmListMorePn: page
    })
    let friendParam = {
      pageNum: page[4],
      pageSize: 20,
      search: this.data.searchValueRecord,
      searchType: this.data.selectIndex
    }
    global.$ajax("/uac/auth/wxfans/findCircleFirendList", friendParam).then(res => {
        // console.log(res);
      if (res.data.code == 200) {
        let rmList = this.data.rmList;
        let more = this.data.rmListMore;
        rmList[4].children = rmList[4].children.concat(res.data.result.list);
        if (rmList[4].children.length == 0 || rmList[4].children.length == Number(res.data.result.total)) {
          more[4] = false
        } else {
          more[4] = true
        }
        this.setData({
          rmList: rmList,
          rmListMore: more
        })
      }
    });
  },
  toSystemAss(){
    tt.navigateTo({
      url: '/pages/purchase/component/xyAssistant/systemAssitant/systemAssitant'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserInfo();
    this.getChatData();
    this.getFindUnApplyCount();    
  },
  beVip(){
    tt.navigateTo({
      url: '/pages/purchase/component/xyAssistant/becomeMember/becomeMember?nickName=' + this.data.userCon.nickName + '&userLevelId=' + this.data.userCon.userLevelId
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
    if (this.data.xyaType == 1 && (this.data.total != this.data.xxList.length)){
      this.setData({
        pageNum: this.data.pageNum + 1
      })
      this.getChatData();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})