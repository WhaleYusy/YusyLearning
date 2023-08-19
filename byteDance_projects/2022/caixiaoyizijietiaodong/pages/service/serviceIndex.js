// pages/service/serviceIndex.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    swiperList4: [
      // 'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1573028547&di=54be00c4e87e04a27123f8cb771a53f2&src=http://img.juimg.com/tuku/yulantu/121103/235077-121103063Z138.jpg',
    ],
    swiperList5:[

    ],
    dataList:[
      { picUrl: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2908958715,587141356&fm=15&gp=0.jpg', facilitatorTypeName:'开发公众号'},
      { picUrl: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2908958715,587141356&fm=15&gp=0.jpg', facilitatorTypeName: '开发小程序' },
      { picUrl: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2908958715,587141356&fm=15&gp=0.jpg', facilitatorTypeName: '财务记账' },
      { picUrl: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2908958715,587141356&fm=15&gp=0.jpg', facilitatorTypeName: '旅游' },
      { picUrl: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2908958715,587141356&fm=15&gp=0.jpg', facilitatorTypeName: '调户口' },
      { picUrl: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2908958715,587141356&fm=15&gp=0.jpg', facilitatorTypeName: '团队拓展' },
      { picUrl: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2908958715,587141356&fm=15&gp=0.jpg', facilitatorTypeName: '高新认证'},
      { picUrl: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2908958715,587141356&fm=15&gp=0.jpg', facilitatorTypeName: '打快板' },
      { picUrl: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2908958715,587141356&fm=15&gp=0.jpg', facilitatorTypeName: '产品认证' },
      { picUrl: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2908958715,587141356&fm=15&gp=0.jpg', facilitatorTypeName: '库存处理' },
      { picUrl: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2908958715,587141356&fm=15&gp=0.jpg', facilitatorTypeName: '服务商' },
      { picUrl: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2908958715,587141356&fm=15&gp=0.jpg', facilitatorTypeName: '3D打印' },
      { picUrl: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2908958715,587141356&fm=15&gp=0.jpg', facilitatorTypeName: '机票酒店' },
      { picUrl: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2908958715,587141356&fm=15&gp=0.jpg', facilitatorTypeName: '商务法律'},
      { picUrl: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2908958715,587141356&fm=15&gp=0.jpg', facilitatorTypeName: '民事法律' },
    ],
    statistics:{
      dayCount:0,
      sumCount:0
    }
  },
  // 获取二维码
  getQrcode() {
    global.$ajax(`/uac/auth/wx/demand/queryQrcode2Info/2`, {}, { type: 'GET' }).then(res => {
      if (res.data.code == 200) {
        this.setData({
          qrCodeImg: res.data.result.qrcodeUrl
        })
      }
    });
  },
  //点击打开详图
  imgView(e) {
    var img = [];
    img.push(e.currentTarget.dataset.img)
    tt.previewImage({
      urls: img
    })
  },
  // 跳转官网
  onGoSoft() {
    // this.$router.push("/qzdSoft");
    window.location.href = "http://www.qzdsoft.com/";
  },

  // 获取统计数据
  getStatistics() {
    global.$ajax("/uac/auth/wxfans/findDayUserInterview",{},{type:'GET'}).then(res => {
      if (res.data.code == 200) {
        // this.statistics = {
        //   sumCount: res.data.result.sumCount,
        //   dayCount: res.data.result.dayCount
        // };
        this.data.statistics.dayCount = res.data.result.dayCount
        this.data.statistics.sumCount = res.data.result.sumCount
        this.setData({
          statistics: this.data.statistics
        })
      }
    });
  },
  gotoList(e){
    let index = e.currentTarget.dataset.index;
    let id = e.currentTarget.dataset.id;
    console.log(id)
    let path = ''
    // switch(index){
    //   case 0: path = `/pages/service/component/common/common?id=${id}`; break;
    //   case 1: path = `/pages/service/component/common/common?id=${id}`; break;
    //   case 2: path = `/pages/service/component/common/common?id=${id}`; break;
    //   case 3: path = `/pages/service/component/travel/travel?id=${id}`; break;
    //   case 4: path = `/pages/service/component/common/common?id=${id}`; break;
    //   case 5: path = `/pages/service/component/common/common?id=${id}`; break;
    //   case 6: path = `/pages/service/component/common/common?id=${id}`; break;
    //   case 7: path = `/pages/playAllegro/playFirst/playFirst?id=${id}`;break;
    //   case 8: path = `/pages/service/component/common/common?id=${id}`; break;
    //   case 9: path = `/pages/service/component/common/common?id=${id}`; break;
    //   case 10: path = `/pages/service/component/common/common?id=${id}`; break;
    //   case 11: path = `/pages/service/component/common/common?id=${id}`; break;
    //   case 12: path = `/pages/service/component/common/common?id=${id}`; break;
    //   case 13: path = `/pages/service/component/common/common?id=${id}`; break;
    //   case 14: path = `/pages/service/component/common/common?id=${id}`;break;
    // }
    if(id != '9' && id != '5'){
      path = `/pages/service/component/common/common?id=${id}`;
    } else if (id == '9'){
      path = `/pages/playAllegro/playFirst/playFirst?id=${id}`
    }else if(id == '5'){
      path = `/pages/service/component/travel/travel?id=${id}`
    }
    console.log(path)
    tt.navigateTo({
      url: path
    })
  },
  getAdInfoMany4() {
    global.$ajax(`/uac/auth/wxAdver/getAdverListByType`, { type: 4 }, { type: "POST" }).then(res => {
      console.log("轮播图")
      console.log(res)
      if (res.data.code === 200) {
        this.setData({
          swiperList4: res.data.result
        })
      }
    })
  },
  getAdInfoMany5() {
    global.$ajax(`/uac/auth/wxAdver/getAdverListByType`, { type: 5 }, { type: "POST" }).then(res => {
      console.log("轮播图")
      console.log(res)
      if (res.data.code === 200) {
        this.setData({
          swiperList5: res.data.result
        })
      }
    })
  },
  getMenuList(){
    global.$ajax(`/uac/auth/wx/common/findFacilitatorTypeList`,{},{type:'get'}).then((res)=>{
      console.log(res)
      if (res.data.code == 200){
        this.setData({
          dataList: res.data.result
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getStatistics();//总计
    this.getAdInfoMany4();//头部轮播图
    this.getAdInfoMany5();//底部轮播图
    this.getMenuList();//底部轮播图菜单
    this.getQrcode();//获取微信二维码
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
    let userId = wx.getStorageSync('userInfo') != '' ? JSON.parse(wx.getStorageSync('userInfo')).userId : ''
    //title path image
    let title = "服务易";
    var url = '/pages/service/serviceIndex?pid='+userId;
    let message = global.shareConfig(title, url , '')
    console.log(message)
    return message;
  }
})



// { picUrl: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2908958715,587141356&fm=15&gp=0.jpg', facilitatorTypeName: '开发公众号' },
// { picUrl: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2908958715,587141356&fm=15&gp=0.jpg', facilitatorTypeName: '开发小程序' },
// { picUrl: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2908958715,587141356&fm=15&gp=0.jpg', facilitatorTypeName: '财务记账' },
// { picUrl: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2908958715,587141356&fm=15&gp=0.jpg', facilitatorTypeName: '旅游' },
// { picUrl: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2908958715,587141356&fm=15&gp=0.jpg', facilitatorTypeName: '调户口' },
// { picUrl: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2908958715,587141356&fm=15&gp=0.jpg', facilitatorTypeName: '团队拓展' },
// { picUrl: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2908958715,587141356&fm=15&gp=0.jpg', facilitatorTypeName: '高新认证' },
// { picUrl: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2908958715,587141356&fm=15&gp=0.jpg', facilitatorTypeName: '打快板' },
// { picUrl: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2908958715,587141356&fm=15&gp=0.jpg', facilitatorTypeName: '产品认证' },
// { picUrl: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2908958715,587141356&fm=15&gp=0.jpg', facilitatorTypeName: '库存处理' },
// { picUrl: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2908958715,587141356&fm=15&gp=0.jpg', facilitatorTypeName: '服务商' },
// { picUrl: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2908958715,587141356&fm=15&gp=0.jpg', facilitatorTypeName: '3D打印' },
// { picUrl: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2908958715,587141356&fm=15&gp=0.jpg', facilitatorTypeName: '机票酒店' },
// { picUrl: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2908958715,587141356&fm=15&gp=0.jpg', facilitatorTypeName: '商务法律' },
// { picUrl: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2908958715,587141356&fm=15&gp=0.jpg', facilitatorTypeName: '民事法律' },
