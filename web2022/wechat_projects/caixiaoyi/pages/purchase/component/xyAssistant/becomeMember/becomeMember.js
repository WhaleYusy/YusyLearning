// pages/purchase/component/xyAssistant/becomeMember/becomeMember.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls:[],
    indicatorDots: true,//导航点
    autoplay: true,
    circular: true, //衔接滑动
    interval: 5000,
    duration: 1000,
    swiperCurrent: 0,//当前轮播图的位置
    currentInfo:{},
    nickName:'',
    userLevelId:'',
    vipList: [{ title: "黄金会员", type: 3 }, { title: "钻石会员", type: 5 }],
    monthList: [{ title: 1 }, { title: 6 }, { title: 12 }],
    carouselVip: "普通会员",
    numMoney:0,
    vipIndex:0,
    monthIndex: 0,
    vipType:3,
    chargeLayer:false,
    //
    loading:false
    
  },
  updateLevel(){
    //
    this.setData({
      chargeLayer:true
    })
  },
  closeChargeLayer(){
    this.setData({
      chargeLayer:false
    })
  },
  //点击会员种类
  onVipClick(e){
    let level = e.currentTarget.dataset.level
    let index = e.currentTarget.dataset.index
    this.setData({
      vipIndex: index,
      vipType: level,
      isOpening:true
    })
    // this.vipType = data.type
    this.setPrice(index, this.data.monthIndex);
  },
  // 月份列表点击
  onMonthClick(e) {
    let index  = e.currentTarget.dataset.index
    this.setData({
      monthIndex:index,
    })
    this.setPrice(this.data.vipIndex, index);
  },
  setPrice(vIndex, mIndex){
    //根据种类和月份计算价格
      // 黄金会员
    if (vIndex == 0 && mIndex == 0) {
      this.setData({
        numMoney:60
      })
    } else if (vIndex == 0 && mIndex == 1) {
      this.setData({
        numMoney: 60 * 6 * 0.8
      })
    } else if (vIndex == 0 && mIndex == 2) {
      this.setData({
        numMoney: 60 * 12 * 0.5
      })
    }
    // 钻石会员
    if (vIndex == 1 && mIndex == 0) {
      this.setData({
        numMoney: 200
      })
    } else if (vIndex == 1 && mIndex == 1) {
      this.setData({
        numMoney: 200 * 6 * 0.8
      })
    } else if (vIndex == 1 && mIndex == 2) {
      this.setData({
        numMoney: 200 * 12 * 0.5
      })
    }
  },
  setTimeType(index) {
    let type = "";
    switch (index) {
      case 0:
        type = 1;
        break;
      case 1:
        type = 6;
        break;
      case 2:
        type = 12;
        break;
    }
    return type;
  },
  onOpeningClick(){
    //立即升级会员
    console.log("参数")
    console.log(this.data.vipType)
    if (this.data.loading) {
      return;
    }
    this.setData({
      loading:true
    })
    global.$ajax("/uac/auth/wx/common/userUpgrade", {
      userLevelId: this.data.vipType,
        timeType: this.setTimeType(this.data.monthIndex),
        biCount: this.data.numMoney
      })
      .then(res => {
        // console.log(res)
        if (res.data.code == 200) {
          this.setData({
            chargeLayer:false
          })
          wx.showToast({
            title: res.data.result,
            icon:'none'
          })
         setTimeout(()=>{
           wx.redirectTo({
             url: '/pages/purchase/component/xyAssistant/xyAssistant'
           })
         },1000)
          // this.$router.push({ path: "/smallTool" });
        }else{

        }
        this.setData({
          loading: false
        })
      }).catch(res=>{
        this.setData({
          loading: false
        })
      })
  },
  swiperChange(ev){
    let current = ev.detail.current;
    this.setData({
      currentInfo: this.data.imgUrls[current]
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let nickName = options.nickName
    let userLevelId = options.userLevelId
    this.setData({
      nickName: nickName,
      userLevelId: userLevelId
    })
    this.getList();
    this.setPrice(this.data.vipIndex, this.data.monthIndex);
  },
  getList(){
    global.$ajax('/uac/auth/wx/common/findUserLevelList', {} ,{type:'get'}).then((res)=>{
      if(res.data.code == 200){
        this.setData({
          imgUrls: res.data.result,
          currentInfo: res.data.result[0]
        })
      }
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
  // updateLevel(){
  //   wx.showToast({
  //     title: '此功能在维护中',
  //     icon:'none'
  //   })
  // },
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