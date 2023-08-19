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
    orderList1:[ ],
    dataList:[],
    pageNum1:1,
    judgeList1:[],
    showNoMore1:false,
    showCatchLayer:false,
    active:'',
    noData:false,//当数组为空的时候
    pageSize:10,
    showNoMore:false,
    total:0
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
        orderList1: []
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
    getOrder(){
      global.$ajax('/uac/auth/pcb/findPcbOrder', {
        pageNum: this.data.pageNum1,
        pageSize: this.data.pageSize,
        userOrSupplierId: wx.getStorageSync('userInfo222').id,
        isDispute: 1
      }).then((res) => {
        let arr = JSON.parse(JSON.stringify(this.data.orderList1))
        if (res.data.code == 200) {
          arr = arr.concat(res.data.result.list)
        }
        this.setData({
          judgeList1: arr,
          orderList1: arr,
          total: Number(res.data.result.total)
        })
        if (this.data.total == this.data.orderList1.length || res.data.result.list.length > this.data.pageSize) {
          this.setData({
            showNoMore: true
          })
        }

        console.log(res)
        console.log("此时的judgeList1")
        console.log(this.data.judgeList1)
      }).catch((res) => {

      });
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
    }
  },
  attached(){
    console.log("嘿嘿")
    this.getOrder()
  },
})
