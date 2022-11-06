// pages/shoppingMall/component/my/index/myIndex.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1573223889692&di=fb69c563d3f753d2848dace0aff868d5&imgtype=0&src=http%3A%2F%2Fpic139.nipic.com%2Ffile%2F20170901%2F22554547_112402928000_2.jpg
    // icon: require('../../../assets/shoppingMall/mySvg/01.png'),
    icon: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1573223889692&di=fb69c563d3f753d2848dace0aff868d5&imgtype=0&src=http%3A%2F%2Fpic139.nipic.com%2Ffile%2F20170901%2F22554547_112402928000_2.jpg',
    navList: [
      // { icon: require('../../../assets/shoppingMall/mySvg/01.png'), label: '待付款' },
      { icon: 'http://qiniuoss.822644.com/wxPic/20191123/765846366059532288.png', label: '待付款',index:2 },
      // { icon: require('../../../assets/shoppingMall/mySvg/02.png'), label: '待发货' },
      { icon: 'http://qiniuoss.822644.com/wxPic/20191123/765847071222697984.png', label: '待发货',index: 3 },
      // { icon: require('../../../assets/shoppingMall/mySvg/03.png'), label: '待收货' },
      { icon: 'http://qiniuoss.822644.com/wxPic/20191123/765847499410804736.png', label: '待收货', index: 4},
      // { icon: require('../../../assets/shoppingMall/mySvg/04.png'), label: '已完成' }
      { icon: 'http://qiniuoss.822644.com/wxPic/20191123/765847673348591616.png', label: '已完成', index: 5  }
    ],
    menuList: [
      // { label: '收货地址', path: '/mall/address', isBottomBorder: true },
      { label: '收货地址', path: '/mall/address', isBottomBorder: true, path:'/pages/shoppingMall/component/my/address/addressList/addressList' },
      // { label: '我的收藏', path: '/mall/collection', isBottomBorder: true },
      { label: '我的收藏', path: '/mall/collection', isBottomBorder: true, path:'/pages/shoppingMall/component/my/collect/collect'},
      // { label: '我的优惠券', path: '/mall/coupon', isBottomBorder: true },
      { label: '我的优惠券', path: '/mall/coupon', isBottomBorder: true, path:'/pages/shoppingMall/component/my/Coupon/Coupon' },
      // { label: '我的购物车', path: '/mall/cart', isBottomBorder: false }
      { label: '我的购物车', path: '/mall/cart', isBottomBorder: false, path:'/pages/shoppingMall/component/my/cart/cart'}
    ],
    userInfo: {
      // userPic: require('../../../img/s2.jpg')
      userPic:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1573223889692&di=fb69c563d3f753d2848dace0aff868d5&imgtype=0&src=http%3A%2F%2Fpic139.nipic.com%2Ffile%2F20170901%2F22554547_112402928000_2.jpg'
    }
  },
  onHandlerMenuClick(e){
    let path = e.currentTarget.dataset.path
    tt.navigateTo({
      url: path
    })
  },
  onHandlerGoPage(e){
    console.log(e)
    let index = e.currentTarget.dataset.index
    console.log(index)
    tt.navigateTo({
      url: `/pages/shoppingMall/component/my/order/orderList/orderList?index=${index}`
    })
  },
  getUSEInfo(){
    global.$ajax("/uac/auth/wx/common/findUserInfo", {}).then(res => {
      if (res.data.code === 200) {
        this.setData({
          userInfo:res.data.result
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载 
   */
  onLoad: function (options) {
    this.getUSEInfo()
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