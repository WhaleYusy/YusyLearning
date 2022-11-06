// pages/shoppingMall/component/pageDetail/pageDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    show:false,//属性弹窗口
    isCollection:false,//是否收藏
    isAttrClick: false, // 是否属性选择点击
    attrSelData: {},
    goodsSpec: [], // 商品规格属性 `json`
    goodsSpecData: [], // 商品属性点击显示对应的价格
    initGoods: {}, // 弹窗数据
    attrStepperNum:1,
    goods: {
      swiperImgUrlsEight: [],
      info: {},
    },
    noAddr:false,
    pageDetail:{

    },
  },
  ontcfQuestion(){
    console.log(123)
    // global.$ajax("/uac/auth/goods/findGoodsDetail/"+id,{},{type:'POST'}).then(res=>{
       
    // })
    // tt.navigateTo({
    //   url: '/pages/chatDetails/chatDetails?sendName='+item.nickName
    // })
  },
  isEndClose(){
     this.setData({
      show:false
    })
  },
  returnNone(){

  },
  onAttrPopupOpen(){
    if (this.data.goodsSpec.length <= 0) {
      tt.showToast({
        title: '暂无规格属性',
        icon: 'none'
      })
      return
    }
    //显示规格属性
    this.setData({
      show:true
    })
  },
  change(e){
    this.setData({
      attrStepperNum: e.detail
    })
  },
  changeMinus(){
    if(this.data.attrStepperNum <= 1){
      this.setData({
        attrStepperNum: 1
      })
    }else{
      this.setData({
        attrStepperNum: this.data.attrStepperNum - 1
      })
    }
  },
  changePlus(){
    if(this.data.attrStepperNum >= 100){
      this.setData({
        attrStepperNum: 100
      })
    }else{
      this.setData({
        attrStepperNum: this.data.attrStepperNum + 1
      })
    }
  },
  changeNum(e){
    let num = e.detail.value;
    if(num == null || num == ""){
      num = "1";
    }else if(parseInt(num) <= 1){
      num = "1";
    }else if(parseInt(num) >= 100){
      num = "100";
    }
    this.setData({
      attrStepperNum : parseInt(num)
    })
  },
  //关闭弹窗
  onClose(){
    this.setData({
      show:false,
      isAttrClick:false,

    })
  },
  onPayClick(){
    //立即购买
    if (Object.keys(this.data.attrSelData).length <= 0) {
      tt.showToast({
        title: '规格属性未选择或规格属性不支持购买',
        icon:'none'
      })
    } else if (this.data.attrStepperNum > Number.parseInt(this.data.attrSelData.invNumber)) {
      tt.showToast({
        title: '购买数量大于库存量',
        icon:'none'
      })
    } else {
      let goods = [
        {
          goodsName: this.data.goods.info.goodsName,
          goodsNum: this.data.attrStepperNum,
          goodsPrice: this.data.attrSelData.invPrice,
          goodsSpec: this.data.attrSelData.indexs,
          mainImage: this.data.goods.info.mainImage,
          points: this.data.goods.info.points,
          goodId: this.data.goods.info.id,
          status: this.data.goods.info.status
        }
      ]
      tt.setStorageSync('goodsPayInfo', JSON.stringify(goods)) // 点击购买时，存储商品信息，订单提交完成，清除信息
      // this.$router.push({
      //   path: '/mall/confirmOrder',
      //   query: {}
      // })

      //去到生成订单页面
      tt.navigateTo({
        url: `/pages/shoppingMall/component/fillOrder/fillOrder?id=${this.data.id}`
      })
    }
  },
  getDetail(id){
    let that = this
    global.$ajax("/uac/auth/goods/findGoodsDetail/"+id,{},{type:'POST'}).then(res=>{
      console.log("detail")
      if (res.data.code === 200) {
        let arr = []
        arr.push(res.data.result.mainImage)
        this.data.goods.swiperImgUrlsEight = res.data.result.swiperImage !== null ? JSON.parse(res.data.result.swiperImage) : arr;
        this.data.goods.info = res.data.result
        let ond = this.data.goods.info;
          if (ond.detail != null && ond.detail != "") {
            if (ond.detail.indexOf("<img") > -1) {
              ond.detail = ond.detail.replace(/<img/g, '<img style="width:100%;height:auto" ') //防止富文本图片过大
            } 
            if (ond.detail.indexOf("<p") > -1) {
              ond.detail = ond.detail.replace(/<p/g, '<p style="word-break: break-all; " ') //防止不换行
            }
          }
          console.log(ond.detail)
        // this.swiperInit()
        // this.getCheckCollect() // 是否收藏
        // this.closeLoading()
        if (res.data.result.inventory <= 0) {
          tt.showToast({
            title: '商品库存不足',icon:'none'
          })
        } else if (res.data.result.goodsSpec === null) {
          tt.showToast({
            title: '商品未设置规格', icon: 'none'
          })
          this.setData({
            noAddr:true
          })
        } else {
          this.data.goodsSpec = JSON.parse(res.data.result.goodsSpec) // 商品规格属性 `json`
          this.data.goodsSpecData = JSON.parse(res.data.result.goodsSpecData) // 商品属性点击显示对应的价格
          this.getGoodsPopupData(id) // 有规格时，请求弹窗数据
        }
      }
      this.setData({
        goods: this.data.goods,
        goodsSpec: this.data.goodsSpec,
        goodsSpecData: this.data.goodsSpecData,
      })
      console.log(this.data.goods.swiperImgUrlsEight)
    }).catch(err=>{
      console.log(err)
    })
  },
  getGoodsPopupData(id) {
    global.$ajax(`/uac/auth/goods/findGoodsDetail/${id}`,{},{type:'POST'}).then(res => {
      if (res.data.code === 200) {
        this.data.initGoods = res.data.result
      }
      this.setData({
        initGoods:this.data.initGoods
      })
    })
  },
  // 属性选择点击
  onHandlerClick(e) {
    let val = e.currentTarget.dataset.val
    let key = e.currentTarget.dataset.key
    let v = e.currentTarget.dataset.v
    let k = e.currentTarget.dataset.k
    //先置空，在重新选择
    this.data.goodsSpec[key].attrList.map(item => item.selected = false)
    this.data.goodsSpec[key].attrList[k].selected = !this.data.goodsSpec[key].attrList[k].selected
    this.setData({
      goodsSpec: this.data.goodsSpec
    })
    let arr = []
    this.data.goodsSpec.map(item => {
      console.log("？？")
      console.log(item)
      item.attrList.filter(val => {
        if (val.selected === true) {
          arr.push(val.attrName)
        }
      })
    })
    let obj = this.setAttrSelectionFn(arr) // 选中的数据

    if (obj.isSelection === true) {
      this.data.attrSelData = obj.selArr
      this.data.initGoods.price = obj.selArr.invPrice // 价格
      this.data.initGoods.inventory = obj.selArr.invNumber // 库存
      this.data.initGoods.points = Math.ceil(obj.selArr.invPrice * 2) // 积分
    } else {
      this.data.attrSelData = {} // 清空选中数据，防止规格属性不可用时，提交上一次的选中记录
    }
    this.setData({
      attrSelData: this.data.attrSelData,
      initGoods: this.data.initGoods
    })
  },

  // 判断规格属性是否相同
  setAttrSelectionFn(arr) {
    let isSelection = false
    let selArr = {}
    this.data.goodsSpecData.map(item => {
      if (item.indexs === arr.join(',')) {
        isSelection = true
        selArr = item
      }
    })
    return { isSelection, selArr }
  },

  // 获取是否收藏
  getCheckCollect() {
    global.$ajax('/uac/auth/goods/checkCollect', { goodsId: this.data.id }).then(res => {
      if (res.data.code === 200) {
        res.data.result.collect === true ? this.data.isCollection = true : this.data.isCollection = false
        this.setData({
          isCollection: this.data.isCollection
        })
      }
    }).catch(err=>{
      console.log(err)
    })
  },
  collectionClick(){
    //点击进行收藏
    if(this.data.isCollection){
      //取消收藏
      global.$ajax('/uac/auth/goods/cancelCollect', { goodsId: this.data.id }).then(res => {
        if (res.data.result.code === 1) {
          tt.showToast({
            title: res.data.result.msg
          })
          this.getCheckCollect()
        }
      }).catch(res => {

      })
    }else{
      //确认收藏
      global.$ajax('/uac/auth/goods/saveCollectInfo',{goodsId:this.data.id}).then(res=>{
        if (res.data.result.code === 1){
          tt.showToast({
            title: res.data.result.msg
          })
          this.getCheckCollect()
        }
      }).catch(res=>{

      })
    }
  },
  //点击加入购物车的按钮
  onGoToCart() {
    if (Object.keys(this.data.attrSelData).length <= 0) {
      // this.isShowArrtPopup = true
      // this.isAttrClick = true
      this.setData({
        show:true,
        isAttrClick:true
      })
    } else if (this.data.attrStepperNum > Number.parseInt(this.data.attrSelData.invNumber)) {
      tt.showToast({
        title: '购买数量大于库存量',
        icon:'none'
      })
    } else {
      this.onAttrPopupOpen()
    }
  },
  onAddToCart(){
    //弹窗的加购按钮
    if (Object.keys(this.data.attrSelData).length <= 0) {
      tt.showToast({
        title: '规格属性未选择或规格属性不支持购买',
        icon:'none'
      })
    } else if (this.data.attrStepperNum > Number.parseInt(this.data.attrSelData.invNumber)) {
      tt.showToast({
        title: '购买数量大于库存量',
        icon: 'none'
      })
    } else {
      this.setData({
        show: true
      })
      this.setAddToCart()
    }
  },
  //加入购物车
  setAddToCart() {
    let param = {
      goodsId: this.data.id, // 商品id
      goodsNum: this.data.attrStepperNum, // 购买商品数量
      goodsPrice: this.data.attrSelData.invPrice, // 商品价格
      goodsSpec: this.data.attrSelData.indexs // 购买规格
    }
    global.$ajax("/uac/auth/goodsCart/joinToShopCar", param).then(res => {
      console.log(res)
      if (res.data.code === 200) {
        console.log(res)
        tt.showToast({
          title: res.data.result.msg
        })
        this.setData({
          show: false
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      id: options.id || '743414578880195584'
    })
    let id = options.id || '743414578880195584'
    this.getDetail(id)
    this.getCheckCollect()
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
    let title = this.data.goods.info.goodsName;
    var url = '/pages/service/component/travel/travelContent/travelContent?id='+ this.data.id +'&pid='+userId;
    let message = global.shareConfig(title, url , '')
    console.log(message)
    return message;
  }
})