// pages/shoppingMall/component/my/collect/collect.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isSupervise:false,
    pageSize:10,
    pageNum:1,
    showNoMore:false,
    total:0,
    idArr:[],//被选中的id集合
    collectionList:[],
    isAllChecked:false,
    admin:false,//管理按钮
  },
  getCollectList(){
    wx.showLoading({
      title: '加载中...'
    })
    let params = {
      pageSize: this.data.pageSize,
      pageNum: this.data.pageNum
    }
    global.$ajax('/uac/auth/goods/findGoodsListToCollect',params,{type:'POST'}).then(res=>{
      let arr = JSON.parse(JSON.stringify(this.data.collectionList))
      if(res.data.code == 200){
        arr = arr.concat(res.data.result.list)
        this.setData({
          collectionList:arr,
          total: Number(res.data.result.total)
        })
        wx.hideLoading()
        if (this.data.collectionList.length == this.data.total || res.data.result.list.length == 0){
          this.setData({
            showNoMore:true
          })
        }
      }
    }).catch(res=>{
      wx.hideLoading()
    })
  },
  onHandlerClick(e) {
      let data = e.currentTarget.dataset.item
      if (data.status === 1) {
        wx.navigateTo({
          url: `/pages/shoppingMall/component/pageDetail/pageDetail?id=${data.goodId}`
        })
      } else {
        wx.showToast({
          title: '商品已失效',
          icon: 'none'
        })
      }

  },
  onHandlerClick2(e) {
    //点击当前的
    let index = e.currentTarget.dataset.index
    let data = e.currentTarget.dataset.item
    this.data.collectionList[index].isChecked = !this.data.collectionList[index].isChecked
    this.setData({
      collectionList: this.data.collectionList
    })
    let idIndex = this.data.idArr.indexOf(data.collectId);
    if (idIndex === -1) {
      this.data.idArr.push(data.collectId)
    } else {
      this.data.idArr.splice(idIndex, 1)
    }
    this.setData({
      idArr: this.data.idArr
    })
    if (this.data.idArr.length == this.data.collectionList.length) {
      this.setData({
        isAllChecked: true
      })
    } else {
      this.setData({
        isAllChecked: false
      })
    }
    console.log(this.data.idArr)
  },
  changeChecked() {
    this.data.idArr = []
    // debugger
    console.log(1)
    let flag = null
    if (this.data.isAllChecked){
      flag = false
    }else{
      flag = true
    }
    this.setData({
      isAllChecked: flag
    })
    if (this.data.isAllChecked){
      this.data.collectionList.forEach(item=>{
        item.isChecked = true
        this.data.idArr.push(item.collectId)
      })
      
    }else{
      this.data.collectionList.forEach(item => {
        item.isChecked = false
      })
      this.data.idArr = []
    }
    this.setData({
      collectionList: this.data.collectionList,
      idArr: this.data.idArr
    })
    console.log(this.data.idArr)
  },
  onHandlerDel(){
    if(this.data.idArr.length == 0){
      wx.showToast({
        title: '您还没有选中任何商品',
        icon:'none'
      })
      return
    }
    wx.showModal({
      title: '提示',
      content: '确认删除选中的商品？',
      success: (res) => {
        if (res.confirm)  {
          let arrs = this.data.idArr.join(',')
          wx.showLoading({
            title: '删除中...'
          })
          global.$ajax(`/uac/auth/goods/deleteCollectInfoById/${arrs}`, {}).then(res => {
            if (res.data.code === 200) {
              if (res.data.result.code === 1) {
                wx.showToast({
                  title: '删除成功'
                })
                this.setData({
                  collectionList: [],
                  idArr:[]
                })
                this.getCollectList()
              } else {
                wx.showToast({
                  title: '删除失败',
                  icon: 'none'
                })
              }
            }
          }).catch(res => {
            wx.hideLoading()
            console.log(res)
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  toAdmin(){
    this.setData({
      isSupervise: !this.data.isSupervise
    })
  },
  onLoad: function (options) {
    this.getCollectList()
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
      this.setData({
        pageNum:this.data.pageNum + 1
      })
      this.getCollectList()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})