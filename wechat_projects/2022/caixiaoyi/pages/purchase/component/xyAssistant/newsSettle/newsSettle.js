// pages/purchase/component/xyAssistant/newsSettle/newsSettle.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newsList: [],
    snName:"",
    snId:"",
    inputDt:false,
    readyAddId:"",
    noMore: false,
    loadMore: false,
    pageNum: 1,
    pageSize: 20,
    total: 0,
    showNoMore: false,
    showChild: false,//一开始不显示
    showCato: false,//是否显示菜单
    menuList: [],
    className: '',
    active: 0
  },

  //点击出现左侧分类
  goCatogory() {
    var b = this.data.inputDt;
    global.$ajax('/uac/auth/wx/common/demandClassList', {}, { type: 'GET' }).then((res) => {
      if (res.data.code == 200) {
        this.setData({
          inputDt: !b,//禁用input弹出输入法
          menuList: res.data.result,
          showCato: true
        })
      }
    }).catch(err => {

    })
  },
  clickLayer() {
    //
    this.setData({
      showChild: false,
      showCato: false
    })
  },
  expandFir(e) {
    // 默认没children选中 有则展开
    let index = e.currentTarget.dataset.index, item = this.data.menuList[index];
    if (item.children) {
      this.setData({
        active: index,
        showChild: true
      })
    } else {
      this.setData({
        showChild: false,
        showCato: false,
        readyAddId: item.id,
        snId: item.id,
        snName: item.className
      })
    }
  },
  //点击菜单进行请求
  chooseAndClose(e) {
    let datas = e.currentTarget.dataset.item
    this.setData({
      showChild: false,
      showCato: false,
      snId: datas.id,
      readyAddId:datas.id,
      snName: datas.className
    })
  },

  queryUserAttentionClassList() {
    //消息列表
    global.$ajax('/uac/auth/wx/common/queryUserAttentionClassList', { pageNum: this.data.pageNum, pageSize: this.data.pageSize }, { type: 'POST' }).then(res => {
      if (res.data.code == 200) {
        let arr = JSON.parse(JSON.stringify(this.data.newsList))
        arr = arr.concat(res.data.result.list)
        this.setData({
          newsList: arr,
          total: Number(res.data.result.total),
          snId: res.data.result.classId,
          snName: res.data.result.className
        })
        if (this.data.newsList.length == res.data.result.total || res.data.result.total == 0) {
          //
          this.setData({
            showNoMore: true
          })
        }
      }
    }).catch(res => {
      console.log(res)
    })
  },
  // 返回小易助手主页
  rLastPage: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  //点击弹出选择类型
  // changeInput: function(){
  //   var b = this.data.inputDt;
  //   this.setData({
  //     inputDt: !b//禁用input弹出输入法
  //   })
  // },
  //把选择好的类型添加
  addInput: function(){
    var that = this;
    var id = this.data.readyAddId;
    console.log(id);
    if (id === '') {
      wx.showToast({
        title: '类型不能为空',
        icon: 'none'
      })
      return
    }
    global.$ajax(`/uac/auth/wx/common/saveDemandClassAttention/${id}`).then(res => {
      // console.log(res);
      if(res.data.code == 200){
        wx.showToast({
          title: res.data.result,
        })
        this.setData({
          snName: ''
        })
      }
      setTimeout(function () {
        that.setData({
          newsList: [],
          noMore: false,
          loadMore: false,
          pageNum: 1
        })
        that.queryUserAttentionClassList()
      },1000);
    });
  },
  delNews: function(event){
    var id = event.currentTarget.dataset.id;
    // console.log(id);
    if (id) {
      global.$ajax(`/uac/auth/wx/common/deleteUserAttentionClassById/${id}`).then(res => {
        // console.log(res);
        if (res.data.code == 200) {
          wx.showToast({
            title: res.data.result,
          })
        }
      });
    }
    this.setData({
      newsList: [],
      noMore: false,
      loadMore: false,
      pageNum: 1
    })
    this.queryUserAttentionClassList()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.queryUserAttentionClassList()
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
    this.setData({
      newsList: [],
      noMore: false,
      loadMore: false,
      pageNum: 1
    })
    this.queryUserAttentionClassList();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.total !== this.data.newsList && !this.data.noMore) {
      this.setData({
        pageNum: this.data.pageNum + 1
      })
      this.queryUserAttentionClassList();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})