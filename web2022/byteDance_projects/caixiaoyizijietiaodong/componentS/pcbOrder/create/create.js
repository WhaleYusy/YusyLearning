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
    pageSize:10,
    judgeList1:[],
    showNoMore1:false,
    showCatchLayer:false,
    active:'',
    noData:false,//当数组为空的时候
    userId:'',
    showPostLayer:false,
    enteringNumber:'',
    userInfoC:undefined,
    showNoMore:false,
    total:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getSuplierList() {
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
    getListMore() {
      //触底加载
      this.setData({
        pageNum1: this.data.pageNum1 + 1,
      })
      this.getAllOrder();//
      console.log("嘿嘿")
    },
    refresh() {
      //上拉刷新

      this.setData({
        pageNum1: 1,
        orderList1: []
      })
      this.getAllOrder()
    },
    toOrderInfo(e) {
      console.log(e)
      let orderid = e.currentTarget.dataset.orderid
      tt.navigateTo({
        url: '/pages/playAllegro/AllegroOrder/orderDetail/orderDetail?orderId=' + orderid
      })
    },
    catchOrder(){
      this.setData({
        showCatchLayer:true
      })
    },
    toCancel(){
      console.log(1)
      this.setData({
        showPostLayer:false,
        enteringNumber:''
      })
    },
    //点击发货按钮
    toPost(e) {
      console.log(e)
      this.setData({
        orderid: e.currentTarget.dataset.orderid,
        showPostLayer: true,
      })
    },
    saveEnteringnum(e) {
      //保存单号
      let value = e.detail.value
      this.setData({
        enteringNumber: value
      })
    },
    toEnsurePost() {
      ///发货
      let that = this
      if (this.data.enteringNumber.trim().length < 10) {
        tt.showToast({
          title: '订单填写有误，位数不能少于十位',
          icon: 'none'
        })
      } else if (this.data.enteringNumber.trim().length > 20) {
        tt.showToast({
          title: '订单填写有误，位数不能超过二十位',
          icon: 'none'
        })
      } else {
        tt.showModal({
          title: '提示',
          content: '确定单号填写无误？',
          success: (res) => {
            if (res.confirm) {
              global.$ajax('/uac/auth/pcb/sendGoods',
                { id: that.data.orderid, expressNo: that.data.enteringNumber, }
              ).then((res) => {
                tt.showToast({
                  title: res.data.result.msg,
                  icon: 'none'
                })
                that.setData({
                  enteringNumber: '',
                  showPostLayer: false,
                })
                that.getAllOrder();
              })
            }
          }
        })
      }
    },
    getAllOrder(){
      console.log('create')
      //订单
      global.$ajax('/uac/auth/pcb/findPcbOrder', {
        pageNum: this.data.pageNum1,
        pageSize: this.data.pageSize,
        userOrSupplierId: tt.getStorageSync('userInfo222').id,
        orderStatus: 2
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
  },
  attached(){
    this.getAllOrder()
    this.getSuplierList()
    if (tt.getStorageSync("userInfo") !== null) {
      this.setData({
        userInfoC: tt.getStorageSync("userInfo222").id
      })
    } else {
      this.setData({
        userInfoC: undefined
      })
    }
  },
})
