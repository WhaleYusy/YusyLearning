// componentS/pcbOrder/catchOrder/catchOrder.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    userInfo:{},
    orderList:[],
    dataList:[],
    pageNum1:1,
    judgeList1:[],
    showNoMore1:false,
    showCatchLayer:false,
    active:'',
    noData:false,//当数组为空的时候
    showNoMore: false,
    total: 0,
    userInfoCom:''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getListMore() {
      //触底加载
      this.setData({
        pageNum1: this.data.pageNum1 + 1,
      })
      this.getOrder();//
      console.log("嘿嘿")
    },
    refresh() {
      //上拉刷新

      this.setData({
        pageNum1: 1,
        orderList: []
      })
      this.getOrder()
    },
    toOrderInfo(e) {
      console.log(e)
      let orderid = e.currentTarget.dataset.orderid
      wx.navigateTo({
        url: '/pages/playAllegro/AllegroOrder/orderDetail/orderDetail?orderId=' + orderid
      })
    },
    catchOrder(){
      this.setData({
        showCatchLayer:true
      })
    },
    toCancel(){
      this.setData({
        showCatchLayer:false
      })
    },
    getOrder(){
      global.$ajax('/uac/auth/pcb/findPcbOrder', {
        pageNum: this.data.pageNum1,
        pageSize: this.data.pageSize,
        userOrSupplierId: wx.getStorageSync('userInfo222').id,
        orderStatus: 3
      }).then((res) => {
        let arr = JSON.parse(JSON.stringify(this.data.orderList))
        if (res.data.code == 200) {
          arr = arr.concat(res.data.result.list)
        }
        this.setData({
          judgeList: arr,
          orderList: arr,
          total: Number(res.data.result.total)
        })
        if (this.data.total == this.data.orderList.length || res.data.result.list.length > this.data.pageSize) {
          this.setData({
            showNoMore: true
          })
        }
      }).catch((res) => {

      });
    },
    confirmReceive(e) {
      let that = this
      let orderid = e.currentTarget.dataset.orderid
      //确认收货
      wx.showModal({
        title: '提示',
        content: '确认收货？',
        success: (res) => {
          if (res.confirm) {
            global.$ajax('/uac/auth/pcb/confirmGoods', { id: orderid })
              .then((res) => {
                if(res.data.code == 200){
                  wx.showToast({
                    title: '收货成功'
                  })
                }
                that.getOrder();
              })
          }
        }
      })
    },
  },
  attached(){
    this.getOrder()
    this.setData({
      userInfoCom: wx.getStorageSync("userInfo222").id
    })
  },
})