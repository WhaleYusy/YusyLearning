// pages/shoppingMall/component/my/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageSize: 10,
    pageNum: 1,
    showNoMore: false,
    total: 0,
    cartList:[],
    dataArr:[],//存储数据
    idArr:[],//存储id
    isAllChecked:false,//购买的
    isAllCheckedDel:false,//删除的
    allPrice:0,
    allNumber:0,
    isSupervise:false,//true的时候是删除操作，false的时候是购买操作
     goodsNum:''
  },
  //购买数量增减
   changeMinus(e){
    let index = e.target.dataset.index;
    let cartList = this.data.cartList;
    console.log(cartList[index].goodsNum);
    console.log(cartList[index].inventory);
    // if(cartList[index].goodsNum<=1){
    //   cartList[index].goodsNum = 1;
    // }else if(cartList[index].goodsNum>cartList[index].inventory){
    //   cartList[index].goodsNum = cartList[index].inventory
    // }else{
    if(cartList[index].goodsNum > 1){
      cartList[index].goodsNum --;
    }
    if(cartList[index].isChecked){
      var total = 0,num = 0;
      cartList.forEach(item => {
        if(item.isChecked){
          total += Number(item.goodsNum) * Number(item.goodsPrice)
          num += item.goodsNum > item.inventory ? Number(item.inventory) : Number(item.goodsNum)
        }
      })
      this.setData({
        cartList: cartList,
        allPrice: total.toFixed(2),
        allNumber: num,
      })
    }else{
      this.setData({
        cartList: cartList
      })
    }
  },
  changePlus(e){
     let index = e.target.dataset.index;
     let cartList = this.data.cartList;
    console.log(cartList[index].goodsNum);
    console.log(cartList[index].inventory);
    // if(cartList[index].goodsNum<1){
    //   cartList[index].goodsNum = 1;
    // }else if(cartList[index].goodsNum >= cartList[index].inventory){
    //   cartList[index].goodsNum = cartList[index].inventory
    // }else{
    if(cartList[index].goodsNum < cartList[index].inventory){
      cartList[index].goodsNum ++;
    }
    if(cartList[index].isChecked){
      var total = 0,num = 0;
      cartList.forEach(item => {
        if(item.isChecked){
          total += Number(item.goodsNum) * Number(item.goodsPrice)
          num += item.goodsNum > item.inventory ? Number(item.inventory) : Number(item.goodsNum)
        }
      })
      this.setData({
        cartList: cartList,
        allPrice: total.toFixed(2),
        allNumber: num,
      })
    }else{
      this.setData({
        cartList: cartList
      })
    }
  },
  changeNum(e){
    console.log(e);
    let num = parseInt(e.detail.value);
    let index = e.target.dataset.index;
    let cartList = this.data.cartList;
    if(isNaN(e.detail.value)){
      cartList[index].goodsNum = 1;
    }else{
      if(num<1){
        cartList[index].goodsNum = 1;
      }else if(num>=cartList[index].inventory){
        cartList[index].goodsNum = cartList[index].inventory
      }else{
        cartList[index].goodsNum = parseInt(num);
      }
    }
    this.setData({
       cartList: cartList
    })
  },
    
  toDelete(){
    //去删除页面 
    this.setData({
      isSupervise:true,
      isAllChecked: false,
      isAllCheckedDel: false,
      idArr: [],
      dataArr: [],
      cartList: this.data.cartList
    })
  },
  toBuy(){
    this.setData({
      isSupervise: false,
      isAllChecked: false,
      isAllCheckedDel: false,
      idArr: [],
      dataArr: [],
      cartList: this.data.cartList
    })
  },
  getCartList(){
    console.log("111")
    tt.showLoading({
      title: '加载中...'
    })
    let params = {
      pageSize: this.data.pageSize,
      pageNum: this.data.pageNum
    }
    global.$ajax('/uac/auth/goodsCart/shopCarList', params, { type: 'POST' }).then(res => {
      console.log(res)
      let arr = JSON.parse(JSON.stringify(this.data.cartList))
      console.log(arr)
      console.log(res.data.code)
      console.log(res.data.result.list)
      if (res.data.code == 200) {
        arr = arr.concat(res.data.result.list)
        this.setData({
          cartList: arr,
          total: Number(res.data.result.total)
        })
        tt.hideLoading()
        if (this.data.cartList.length == this.data.total || res.data.result.list.length == 0) {
          this.setData({
            showNoMore: true
          })
        }
      }
    }).catch(res => {
      tt.hideLoading()
    })
  },
  // this.allPrice += item.goodsNum * item.goodsPrice
  // this.allNumber += item.goodsNum

  //购买全选(goodsNum ???????)
  changeCheckedBuy() {
    // debugger
    console.log(1)
    let flag = null
    if (this.data.isAllChecked) {
      flag = false

    } else {
      flag = true
    }
    this.setData({
      isAllChecked: flag
    })
    let total = this.data.allPrice
    let num = this.data.allNumber
    if (this.data.isAllChecked) {
      this.data.dataArr = []
      this.data.cartList.forEach(item => {
        item.isChecked = true
      })
      this.data.dataArr = JSON.parse(JSON.stringify(this.data.cartList))
      this.data.dataArr.forEach(item=>{
        total += Number(item.goodsNum) * Number(item.goodsPrice)
        num += item.goodsNum > item.inventory ? Number(item.inventory) : Number(item.goodsNum)
      })
      this.setData({
        allPrice:total.toFixed(2),
        allNumber:num
      })
    } else {
      this.data.cartList.forEach(item => {
        item.isChecked = false
      })
      this.data.dataArr = []
      this.setData({
        allNumber:0,
        allPrice:0
      })
    }
    this.setData({
      cartList: this.data.cartList,
      dataArr: this.data.dataArr
    })
    console.log(this.data.dataArr)
  },

  changeCheckedDelete(){
    console.log(1)
    let flag = null
    if (this.data.isAllCheckedDel) {
      flag = false
    } else {
      flag = true
    }
    this.setData({
      isAllCheckedDel: flag
    })
    if (this.data.isAllCheckedDel) {
      this.data.idArr = []
      this.data.cartList.forEach(item => {
        item.isCheckedDel = true
        this.data.idArr.push(item.shopCarId)
      })

    } else {
      this.data.cartList.forEach(item => {
        item.isCheckedDel = false
      })
      this.data.idArr = []
    }
    this.setData({
      cartList: this.data.cartList,
      idArr: this.data.idArr
    })
    console.log(this.data.idArr)
  },
  returnLast(){
    tt.navigateBack({
      
    })
  },
  onChangeBuy(e) {
    console.log(e.detail)
    let data = e.currentTarget.dataset.item
    let index = e.currentTarget.dataset.index
    this.data.cartList[index].goodsNum = e.detail;
    var total = 0, num = 0;
    this.data.dataArr.forEach(item => {
      total += Number(item.goodsNum) * Number(item.goodsPrice)
      num += item.goodsNum > item.inventory ? Number(item.inventory) : Number(item.goodsNum)
    })
    this.setData({
      allPrice: total.toFixed(2),
      allNumber: num,
      cartList: this.data.cartList,
      dataArr: this.data.dataArr,
    })
  },
  onHandlerClickBuy(e){
    let data = e.currentTarget.dataset.item
    let index = e.currentTarget.dataset.index
    //选中之后结算 ，结算数据是dataArr
      if (data.status === 1) {
        this.data.cartList[index].isChecked = !this.data.cartList[index].isChecked
        let arrTem = this.data.cartList.filter(item => item.status)
        console.log("这个临时数组")
        console.log(arrTem)
        this.data.dataArr = this.data.cartList.filter(item => item.isChecked)
        if (arrTem.length == this.data.dataArr.length) {
          ///可以购买的都全部选中了
          this.setData({
            isAllChecked: true
          })
        } else {
          this.setData({
            isAllChecked: false
          })
        }
      }
    var total = 0,num = 0;
    this.data.dataArr.forEach(item => {
      total += Number(item.goodsNum) * Number(item.goodsPrice)
      num += item.goodsNum > item.inventory ? Number(item.inventory) : Number(item.goodsNum)
    })
    this.setData({
      allPrice: total.toFixed(2),
      allNumber: num,
        cartList:this.data.cartList,
        dataArr: this.data.dataArr,
      })
  },
  onHandlerClickDelete(e){
    console.log("当前")
    let data = e.currentTarget.dataset.item
    let index = e.currentTarget.dataset.index
    //选中之后删除 ，结算数据是idArr
    this.data.cartList[index].isCheckedDel = !this.data.cartList[index].isCheckedDel
    this.setData({
      cartList: this.data.cartList
    })
    let idIndex = this.data.idArr.indexOf(data.shopCarId);
    if (idIndex === -1) {
      this.data.idArr.push(data.shopCarId)
    } else {
      this.data.idArr.splice(idIndex, 1)
    }
    
    if (this.data.idArr.length == this.data.cartList.length){
      this.setData({
        isAllCheckedDel:true
      })
    }else{
      this.setData({
        isAllCheckedDel: false
      })
    }
    // if (data.status === 1) {
    //   this.data.cartList[index].isChecked = !this.data.cartList[index].isChecked
    //   let arrTem = this.data.cartList.filter(item => item.status)
    //   console.log("这个临时数组")
    //   console.log(arrTem)
    //   this.data.dataArr = this.data.cartList.filter(item => item.isChecked)
    // }
    // if (arrTem.length == this.data.dataArr.length) {
    //   ///可以购买的都全部选中了
    //   this.setData({
    //     isAllChecked: true
    //   })
    // } else {
    //   this.setData({
    //     isAllChecked: false
    //   })
    // }
    // this.setData({
    //   cartList: this.data.cartList,
    //   dataArr: this.data.dataArr,
    // })
  },
  onHandlerSettlement(){
    //缓存数据，去到确认订单页面
    console.log("去结算")
    if (this.data.dataArr.length <= 0) {
      tt.showToast({
        title: '请选择要购买的商品',
        icon: 'none'
      })
    } else {
      tt.setStorageSync('goodsPayInfo', JSON.stringify(this.data.dataArr)) // 点击购买时，存储商品信息，订单提交完成，清除信息
      this.reset()
      tt.navigateTo({
        url: '/pages/shoppingMall/component/fillOrder/fillOrder'
      })
    }
  },
  onHandlerDel(){
    console.log(this.data.idArr)
    //删除
    //选中之后删除的
    if (this.data.idArr.length <= 0) {
      tt.showToast({
        title: '请选择要删除的商品',
        icon: 'none'
      })
    } else {
      tt.showModal({
        title: '提示',
        content: '确认删除选中的商品？',
        success:(res)=>{
          console.log(res)
          if (res.confirm) {
            tt.showLoading({
              title: '删除中'
            })
            let ids = this.data.idArr.join(',')
            global.$ajax('/uac/auth/goodsCart/deleteShopCarGoodsByIds', { ids: ids }, { type: 'POST' }).then(res => {
              if (res.data.code === 200) {
                if (res.data.result.code === 1) {
                  tt.showToast({
                    title: '删除成功',
                    icon: 'none'
                  })
                  this.setData({
                    idArr: [],
                    cartList: [],
                    isAllChecked: false,
                    isAllCheckedDel: false,
                    pageNum: 1
                  })
                  this.getCartList()
                } else {
                  tt.showToast({
                    title: '删除失败',
                    icon: 'none'
                  })
                }
                tt.hideLoading()
                // setTimeout(() => { this.isLoading = false }, 500)
              }
            }).catch(res => {
              tt.hideLoading()
            })
          }
        }
      })
      //调用删除购物车的接口
      
    }
  },

  toAdmin(e) {
    // let key = e.currentTarget.dataset.key
    // console.log(key)
    //管理按钮
    this.data.admin = !this.data.admin
    // this.data.cartList.forEach(item=>{
    //   item.isChecked = false
    //   item.isAllCheckedDel = false
    // })
    this.setData({
      isSupervise: !this.data.isSupervise,
      // isAllChecked:false,
      // isAllCheckedDel:false,
      // idArr:[],
      // dataArr:[],
      // cartList: this.data.cartList
    })
  },
  reset(){
    this.setData({
      pageSize: 10,
      pageNum: 1,
      showNoMore: false,
      total: 0,
      cartList: [],
      dataArr: [],//存储数据
      idArr: [],//存储id
      isAllChecked: false,//购买的
      isAllCheckedDel: false,//删除的
      allPrice: 0,
      allNumber: 0,
      isSupervise: false,
    })
  },
  toDetail(e){
    let item = e.currentTarget.dataset.item
    //未失效的可以进去详情
    if(item.status == 2){
      tt.showToast({
        title: '',
        icon:'商品已失效'
      })
    }else{
      this.reset()
      tt.navigateTo({
        url: `/pages/shoppingMall/component/pageDetail/pageDetail?id=${item.goodId}`
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getCartList()
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
    this.setData({
      pageNum: 1
    })
    this.getCartList()

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
    if (!this.data.showNoMore) {
      this.setData({
        pageNum: this.data.pageNum + 1
      })
      this.getCartList()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})