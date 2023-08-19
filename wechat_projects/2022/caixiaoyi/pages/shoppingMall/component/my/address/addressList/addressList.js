// pages/shoppingMall/component/my/address/addressList/addressList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:undefined,
    addressList:[],
    showNoMore:false,
    pageSize:10,
    pageNum:1,
    total:0

  },
  addAddress(){
    wx.navigateTo({
      url: '/pages/shoppingMall/component/my/address/addressDetail/addressDetail'
    })
  },
  getAddressList(){
    wx.showLoading({
      title: '加载中...'
    })
    let params = {
      pageSize:this.data.pageSize,
      pageNum:this.data.pageNum
    }
    global.$ajax('/uac/auth/goods/findAddressList',params,{type:'POST'}).then(res=>{
      let arr = JSON.parse(JSON.stringify(this.data.addressList))
      if(res.data.code == 200){
        arr = arr.concat(res.data.result.list)
        this.setData({
          addressList: arr,
          total: Number(res.data.result.total)
        })
        if (this.data.addressList.length == this.data.total || res.data.result.list.length == 0){
          this.setData({
            showNoMore:true
          })
        }
        wx.hideLoading()
      }
    }).catch(res=>{

    })
  },
  onEditClick(e){
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/shoppingMall/component/my/address/addressDetail/addressDetail?id='+id
    })
  },
  onDelClick(e){
    let that = this
    let id = e.currentTarget.dataset.id
    console.log(id)
    wx.showModal({
      title: '删除提示',
      content: '确认删除该条数据？',
      cancelText: '取消',
      confirmText: '确认',
      success(res) {
        if (res.confirm) {
          // 用户点击了确定属性的按钮，对应选择了'男'
          // that.setData({
          //   userSex: 1
          // })
          global.$ajax(`/uac/auth/goods/deleteDeliveryAddress/${id}`,{},{type:'GET'}).then(res => {
            if (res.data.code === 200) {
              wx.showToast({
                title: '删除成功'
              })
              that.setData({
                addressList:[]
              })
              that.getAddressList()
            }
          })
        }
      }
    })
  },
  onSetDefaultAddress(e){
    let v = e.currentTarget.dataset.item
    console.log(v.id)
    global.$ajax('/uac/auth/goods/updateDefaultAddress',{id:v.id},{type:"POST"}).then(res=>{
      if (res.data.code === 200) {
        wx.showToast({
          title: '设为默认地址成功'
        })
      } else {
        wx.showToast({
          title: '设为默认地址失败',
          icon:'none'
        })
      }
      this.setData({
        addressList:[]
      })
      this.getAddressList()
    }).catch(err=>{
      console.log(err)
      console.log("里面的")
    })
  },
  onAddressUse(e){
    let item = e.currentTarget.dataset.item
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2]; //上一个页面
    //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
    prevPage.setData({
      addressId:item.id
    })
    //用了之后，回去
    wx.navigateBack()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.getAddressList()
    this.setData({
      type:options.type
    })
  },
onLoad2:function(){
  this.setData({
    pageNum:1,
    addressList: []
  })
  this.getAddressList()
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
    if (!this.data.showNoMore){
      this.setData({
        pageNum: this.data.pageNum + 1
      })
      this.getAddressList()
    }else{
      console.log("没有")
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})

