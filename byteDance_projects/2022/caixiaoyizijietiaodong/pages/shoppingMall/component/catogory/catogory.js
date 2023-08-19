// pages/shoppingMall/component/catogory/catogory.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    adRandomImg:'',//广告位
    leftNavList:[
      // { name: '电子元器件' },
    ],
    classifyList:[
     
    ],
    newRecommendList:[],
    index:0,
    initSelId:'',
    pageSize:10,
    pageNum:1,
    total:0
  },

  toSearchPage(){
    //去到搜索页面
    tt.navigateTo({
      url: '/pages/shoppingMall/component/search/search'
    })
  },
  onHandlerClick(e){
    let index = e.currentTarget.dataset.activeindex
    let id = e.currentTarget.dataset.id
    this.setData({
      classifyList:[],
      activeIndex:index,
      initSelId:id
    })
    this.getCatoDetail()
    this.findGoodsInfoList(id)
  },
  getCatoList(){
    global.$ajax('/uac/auth/goods/findCategoryList',{},{type:'GET'}).then(res=>{
      console.log('cato')
      this.setData({
        activeIndex:0,
        leftNavList: res.data.result,
        initSelId: res.data.result[0].id
      })
      this.getCatoDetail()
    })
  },
  //获取分类的详情
  getCatoDetail(){
    global.$ajax('/uac/auth/goods/getRecommendGoods/'+this.data.initSelId,{},{type:'GET'}).then(res=>{
      console.log('cad')
      let old = this.data.classifyList
      let arr = res.data.result.list
      arr = old.concat(arr)
      this.setData({
        newRecommendList:arr
      })
    })
  },
  findGoodsInfoList(id){
    global.$ajax("/uac/auth/goods/findGoodsInfoList", { pageSize: this.data.pageSize, pageNum: this.data.pageNum, categoryId:id},{type:'POST'}).then(res => {
      if (res.data.code === 200) {
        console.log("chenggo")
        console.log(res.data.result.list)
        this.setData({
          classifyList: res.data.result.list,
          total: Number.parseInt(res.data.result.total)
        })
      }
    })
  },
  getADbG(){
    //获取分类的广告图
    global.$ajax('/uac/auth/goods/getRandomShopAdv',{},{type:'GET'}).then(res=>{
      console.log(res.data.result.adv.adUrl)
      this.setData({
        adRandomImg: res.data.result.adv
      })
    })
  },
  setGotoGoodDetails(e){
    let id = e.currentTarget.dataset.id
    console.log(e)
    tt.navigateTo({
      url: `/pages/shoppingMall/component/pageDetail/pageDetail?id=${id}`
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getADbG()
    this.getCatoList();//获取分类
    this.findGoodsInfoList(options.id)
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