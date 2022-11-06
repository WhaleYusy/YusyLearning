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
    orderList1:[
      // {pcbLong:33,pcbWide:33,pcbNum:33,layerNum:3,depth:33,area:'深圳市宝安区',detailArea:"详细地址"}
    ],
    dataList:[],
    pageNum1:1,
    pageSize:10,
    judgeList1:[],
    showNoMore1:false,
    showCatchLayer:false,
    active:null,
    supplierName:'',
    noData:false,//当数组为空的时候
    supplierId:undefined,
    showNoMore: false,
    total: 0
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
    getListMore(){
      //触底加载
      console.log("嘿嘿")
    },
    toOrderInfo(e) {
      console.log(e)
      let orderid = e.currentTarget.dataset.orderid
      tt.navigateTo({
        url: '/pages/playAllegro/AllegroOrder/orderDetail/orderDetail?orderId=' + orderid
      })
    },
    catchOrder(e){
      let orderid = e.currentTarget.dataset.orderid
      this.setData({
        showCatchLayer:true,
        orderId:orderid
      })
      this.triggerEvent('check', this.data.showCatchLayer);  
    },
    toCancel(){
      this.setData({
        showCatchLayer:false
      })
      this.triggerEvent('check', this.data.showCatchLayer);  
    },
    chooseService(e) {
      console.log(e)
      let serveid = e.currentTarget.dataset.serveid
      let suppliername = e.currentTarget.dataset.suppliername
      let index = e.currentTarget.dataset.index
      this.setData({
        supplierId: serveid,
        supplierName: suppliername,
        active: Number(index)
      })
    },
    ///选择供应商确认
    toEnsureChoose() {
      let that = this
      if (this.data.supplierId == 0 || this.data.supplierId === undefined) {
        tt.showToast({
          title: '请先选择一家服务商',
          icon: 'none'
        })
      } else {
        console.log('this.supplierId：' + that.data.supplierId)
        console.log('this.orderId：' + that.data.orderId)
        tt.showModal({
          title: '提示',
          content: '确认抢单?',
          success: (res) => {
            if (res.confirm) {
              console.log("确认")
              ///在这里调用抢单的接口
              global.$ajax('/uac/auth/pcb/robPcbOrder', {
                supplierId: that.data.supplierId,//服务商id
                supplierName: that.data.supplierName,//服务商名称
                id: that.data.orderId//订单id
              }).then((res) => {
                tt.showToast({
                  title: res.data.result.msg,
                  icon: 'none'
                })
                that.getAllOrder()
              })
                // .cancel((res)=>{

                // })
                .catch((res) => {
                  // console.log(res.data.result.msg)
                })
              this.setData({
                active: null,
                supplierId: 0,
                supplierName: '',
                showCatchLayer: false
              })
              this.triggerEvent('check', this.data.showCatchLayer);  
            }
          }
        })
      }
    },
    getSuplierList(){
      console.log(1)
      global.$ajax('/uac/auth/wx/common/findPageInfoToSupplier',
        { type: 2, facilitatorTypeId: 9 }
      ).then((res) => {
        console.log(res)
        this.setData({
          dataList: res.data.result.list
        })
        console.log("接口测试的结果")
        console.log(this.data.dataList)
      })
    },
    getOrderList(){
      global.$ajax('/uac/auth/pcb/findPcbOrder', {
        pageNum: this.data.pageNum1,
        pageSize: this.data.pageSize,
        orderStatus: 1,
        payStatus: 1,
        // userOrSupplierId: tt.getStorageSync('userInfo222').id,
      }).then((res) => {
        console.log(res)
        let arr = JSON.parse(JSON.stringify(this.data.orderList1))
        if (res.data.code == 200) {
          arr = arr.concat(res.data.result.list)
        }
        this.setData({
          judgeList: arr,
          orderList1: arr,
          total: Number(res.data.result.total)
        })
        if (this.data.total == this.data.orderList1.length || res.data.result.list.length > this.data.pageSize) {
          this.setData({
            showNoMore: true
          })
        }
      }).catch((res) => {

      });
    },
  },
  attached(){
    this.getSuplierList();
    this.getOrderList();
  },
})
