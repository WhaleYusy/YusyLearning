// pages/supply/supplyIndex.js
import Dialog from '../../miniprogram_npm/vant-weapp/dialog/dialog';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    noMore:false,
    loadMore:false,
    isShowCir:false,
    isShowSq:false,
    dataList:[],
    classId: "",
    keyWords: "",
    pageNum: 1,
    pageSize: 10,
    total:null,
    showChild: false,//一开始不显示
    active: 0,
    showCato: false,//是否显示菜单
    scrollSet:"",
    menuList: [],
    latitude:null,
    longitude:null
  },
  onAddPrivateLetter(e){
    //加了圈友之后可以进行私信
    let item = e.currentTarget.dataset.item
    console.log(item)
    if (item.applyStatus == 1){
      //进行私信
      wx.navigateTo({
        url: '/pages/chatDetails/chatDetails?userId=' + item.uid + '&shopLogo=' + item.logo + '&sendName=' + item.nickName
      })
    }else{
      return
    }
  },
  goToDetail(ev){
    //去供应详情
    let item = ev.currentTarget.dataset.item;
    wx.navigateTo({
      url: '/pages/supply/component/supplyDetail/supplyDetail?id=' + item.id
    })
  },
  // 获取列表
  getList(){
    let pageRequest = {
      pageNum: this.data.pageNum,
      pageSize: this.data.pageSize,
      classId: this.data.classId,
      keyWords: this.data.keyWords,
      latitude: this.data.latitude,
      longitude: this.data.longitude
    }
    this.setData({
      loadMore:true
    })
    global.$ajax('/uac/auth/wx/common/findSupplierInfoList2', pageRequest).then((res)=>{
      if (res.data.code == 200) {
        let dataList = this.data.dataList.concat(res.data.result.list)
        this.setData({
          dataList: dataList,
          total: Number(res.data.result.count),
          loadMore:false
        })
        if (this.data.total == this.data.dataList.length ){
          this.setData({
            noMore:true
          })
        }
      }
    })
  },
  // 搜索
  serach(){
    this.setData({
      dataList:[],
      noMore: false,
      loadMore: false,
      pageNum: 1,
      classId: ''
    })
    this.getList();
  },
  onCatoClose() {
    this.setData({
      showChild: false,
      showCato: false,
      scrollSet:"",
      active: ''
    })
  },
  // 输入赋值
  inputKey(ev){
    this.setData({
      keyWords:ev.detail.value
    })
  },
  // 加圈友
  onAddCircleFriend(ev){
    let item = ev.currentTarget.dataset.item;
    let index = ev.currentTarget.dataset.index;
    wx.showModal({
      title: '提示',
      content: '添加圈友需要支付一个积分，是否继续？',
      success:(res)=>{
        if(res.confirm){
          global.$ajax(`/uac/auth/wxfans/addCircleFirendApply2/${item.uid}`)
            .then(res => {
              if (res.data.result.code == 1) {
                let data = this.data.dataList;
                data[index].applyStatus = 0;
                this.setData({
                  dataList: data
                })
              }
              wx.showToast({
                title: res.data.result.msg,
                icon: 'none',
                duration:3000
              })
            });
        }
      }
    })
  },
  clickLayer() {
    //
    this.setData({
      showChild: false,
      showCato: false,
      scrollSet:""
    })
  },
  goToEntry(){
    let that = this;
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userLocation']) {
          Dialog.confirm({
            title: '授权信息确认',
            message: '免费入驻需获取位置信息，确认修改授权？'
          }).then(() => {  //弹窗询问授权，确认
            wx.openSetting({
              success(res) {
                if (!res.authSetting['scope.userLocation']) {
                  wx.showToast({
                    title: '位置信息授权失败，无法进入免费入驻。',
                    duration: 3000,
                    icon: 'none'
                  })
                } else {  //确认授权跳转页面
                  wx.navigateTo({
                    url: '/pages/purchase/component/xyAssistant/myBusinessEdit/myBusinessEdit'
                  })
                }
              }
            })
            // on confirm
          }).catch(() => {  //再次弹窗授权，取消
            // on cancel
            wx.showToast({
              title: '位置信息授权失败，请下次进行设置。',
              duration: 3000,
              icon: 'none'
            })
          });
        } else {  //有定位授权
          wx.navigateTo({
            url: '/pages/purchase/component/xyAssistant/myBusinessEdit/myBusinessEdit'
          })
        }
      }
    })
  },
  //点击出现左侧分类
  goCatogory() {
    global.$ajax('/uac/auth/wx/common/demandClassList', {}, { type: 'GET' }).then((res) => {
      if (res.data.code == 200) {
        this.setData({
          menuList: res.data.result,
          showCato: true,
          scrollSet: 'overflow-y:hidden;height:91vh'
        })
      }
    }).catch(err => {

    })
  },
  // 禁止上层滑动影响到下层页面
  stopPageScroll() {
    return;
  },
  expandFir(e) {
    //
    let index = e.currentTarget.dataset.index
    this.setData({
      active: index,
      showChild: true
    })
  },
  //点击菜单进行请求
  chooseAndClose(e) {
    let datas = e.currentTarget.dataset.item
    this.setData({
      classId: datas.id,
      showChild: false,
      showCato: false,
      scrollSet:"",
      dataList: [],
      noMore: false,
      loadMore: false,
      pageNum: 1
    })
    this.getList();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getLocation({
      type: 'gcj02',
      success(res) {
        console.log(res)
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude
        })
      },
      complete() {
        that.getList();
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
    this.setData({  //翻页时回到该页，搜索栏清空
      keyWords:""
    })
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
    let that = this
    this.setData({
      dataList: [],
      noMore: false,
      loadMore: false,
      keyWords: this.data.keyWords,
      classId: this.data.classId,
      pageNum: 1
    })

    wx.getLocation({
      type: 'gcj02',
      success(res) {
        console.log(res)
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude
        })
      },
      complete() {
        that.getList();
      }
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.total !== this.data.dataList && !this.data.noMore){
      this.setData({
        pageNum: this.data.pageNum + 1
      })
      this.getList();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})