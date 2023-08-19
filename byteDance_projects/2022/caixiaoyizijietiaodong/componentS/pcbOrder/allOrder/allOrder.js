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
    payBi:0,
    payMoney:0,
    userInfo:{},
    orderList:[
      {pcbLong:33,pcbWide:33,pcbNum:33,layerNum:3,depth:33,area:'深圳市宝安区',detailArea:"详细地址"}
    ],
    dataList:[],
    pageNum1:1,
    judgeList1:[],
    showNoMore1:false,
    showCatchLayer:false,
    active:'',
    noData:false,//当数组为空的时候
    showPswBoard:false,
    password:'',
    preBi:0,//支付的积分
    pageNum:1,
    pageSize:10,
    judgeList:[],
    orderList:[],
    enteringNumber:[],//输入的物流单号
    showPostLayer:false,//单号的弹窗
    supplierId:undefined,
    supplierName:'',
    active:'',
    userInfoC:'',
    showNoMore:false,
    total:0,
    orderid:''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    loadMore(){
      this.getListMore()
    },
    getListMore() {
      //触底加载
      this.setData({
        pageNum:this.data.pageNum + 1,
      })
      this.getAllOrder();//
      console.log("嘿嘿")
    },
    refresh(){
      //上拉刷新
      
      this.setData({
        pageNum:1,
        orderList:[]
      })
      this.getAllOrder()
    },
    //去订单详情
    toOrderInfo(e){
      console.log(e)
      let orderid = e.currentTarget.dataset.orderid
      tt.navigateTo({
        url: '/pages/playAllegro/AllegroOrder/orderDetail/orderDetail?orderId=' + orderid
      })
    },
    //供应商列表
    getSuplierList(){
      global.$ajax('/uac/auth/wx/common/findPageInfoToSupplier',
        { type: 2, facilitatorTypeId: 9 }
      ).then((res) => {
        this.setData({
          dataList:res.data.result.list
        })
        console.log("接口测试的结果")
        console.log(this.dataList)
      })
    },
    catchOrder(e) {
      this.setData({
        showCatchLayer: true,
        orderid: e.currentTarget.dataset.orderid,
      })
      this.triggerEvent('check', this.data.showCatchLayer);  
    },
    //选择
    chooseService(e){
      let serveid = e.currentTarget.dataset.serveid
      let suppliername = e.currentTarget.dataset.suppliername
      let index = e.currentTarget.dataset.index
      this.setData({
        supplierId: serveid,
        supplierName: suppliername,
        active:index
      })
    },
    ///选择供应商确认
    toEnsureChoose(e) {
      let that = this
      if (this.data.supplierId == 0 || this.data.supplierId === undefined) {
        tt.showToast({
          title: '请先选择一家服务商',
          icon:'none'
        })
      } else {
        console.log('this.supplierId：' + that.data.supplierId)
        console.log('this.orderId：' + that.data.orderid)
        tt.showModal({
          title: '提示',
          content: '确认抢单?',
          success:(res)=>{
            if(res.confirm){
              console.log("确认")
              ///在这里调用抢单的接口
              global.$ajax('/uac/auth/pcb/robPcbOrder', {
                supplierId: that.data.supplierId,//服务商id
                supplierName: that.data.supplierName,//服务商名称
                id: that.data.orderid//订单id
              }).then((res) => {
                tt.showToast({
                  title: res.data.result.msg,
                  icon:'none'
                })
                that.getAllOrder()
              })
              // .cancel((res)=>{

              // })
              .catch((res) => {
                // console.log(res.data.result.msg)
              })
              this.setData({
                active :'',
                supplierId :0,
                supplierName : '',
                showCatchLayer : false
              })
              this.triggerEvent('check', this.data.showCatchLayer);  
            }
          }
        })
      }
    },
  //点击支付按钮
    toPay(e){
      // preBi  应该在这里设置
      //去支付
      let orderid = e.currentTarget.dataset.orderid
      let item = e.currentTarget.dataset.item
      this.setData({
        orderid: orderid,
        payBi: Math.ceil(item.totalPrice),
        payMoney: item.totalPrice
      })
      let that = this
      global.$ajax("/uac/auth/wx/common/findUserInfo", {}, { type: 'POST' }).then(res => {
        // console.log(res);
        that.setData({
          userInfo: res.data.result
        })
        //debugger
        // if (that.data.storeData.amount == '') {
        console.log(that.data.userInfo.bi )
        if (that.data.userInfo.bi >= item.totalPrice * 2) {
          //积分支付
          if (that.data.userInfo.payPassword != null) {
            //有支付密码
            // this.payContinute(params);//先输入密码，再继续积分支付
            tt.showModal({
              title: '提示',
              content: '确认支付(优先以积分支付)?',
              success: (res) => {
                if (res.confirm) {
                  that.setData({
                    showPswBoard: true
                  })
                }
              }
            })
          } else {
            //去设置支付密码
            tt.navigateTo({
              url: `/pages/purchase/component/xyAssistant/setPassword/setPasssword?setType=pcbOrder`
            })
          }
        }else{
          //微信支付
          tt.showToast({
            title: '积分不足，将使用微信支付',
            icon: 'none'
          })
          // .post("/uac/auth/pcb/pcbPay", { id: res.data.result.orderId })
          tt.showLoading({
            title: '支付中...',
            icon: 'none'
          })
          global.getPay("/uac/auth/pcb/pcbPay", { id: this.data.orderid },
            () => {
              //成功
              tt.hideLoading()
              tt.showToast({
                title: '支付成功',
                icon: 'none'
              })
              // var pages = getCurrentPages();
              // var prevPage = pages[pages.length - 2]; //上一个页面
              // //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
              // prevPage.setData({
              //   type: 1
              // })
              tt.navigateTo({
                url: '/pages/playAllegro/AllegroOrder/indexOrder/indexOrder?ordeType=0',
              })
            }, () => {
              //失败
              tt.hideLoading()
              tt.showToast({
                title: '您已取消支付',
                icon: 'none'
              })
              // var pages = getCurrentPages();
              // var prevPage = pages[pages.length - 2]; //上一个页面
              // //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
              // prevPage.setData({
              //   type: 2
              // })
              tt.navigateTo({
                url: '/pages/playAllegro/AllegroOrder/indexOrder/indexOrder?ordeType=1',
              })
            })
        }
      });


    },
    //获取订单列表
    getAllOrder(e) {
      //
      console.log(tt.getStorageSync('userInfo222'))
      global.$ajax('/uac/auth/pcb/findPcbOrder', {
        pageNum: this.data.pageNum,
        pageSize: this.data.pageSize,
        userOrSupplierId: tt.getStorageSync('userInfo222').id,
      }).then((res) => {
        let arr = JSON.parse(JSON.stringify(this.data.orderList))
        if(res.data.code == 200){
          arr = arr.concat(res.data.result.list)
        }
        this.setData({
          judgeList: arr,
          orderList: arr,
          total: Number(res.data.result.total)
        })
        if (this.data.total == this.data.orderList.length || res.data.result.list.length > this.data.pageSize ){
          this.setData({
            showNoMore1:true
          })
        }
        console.log(res)
        console.log("此时的judgeList")
        console.log(this.data.judgeList)
      }).catch((res) => {

      });
    },
    //点击发货按钮
    toPost(e){
      console.log(e)
      this.setData({
        orderid: e.currentTarget.dataset.orderid,
        showPostLayer:true
      })
    },
    toCancelPost() {
      this.setData({
        showPostLayer:false,
        enteringNumber:''
      })
    },
    saveEnteringnum(e){
      //保存单号
      let value = e.detail.value
      this.setData({
        enteringNumber:value
      })
    },
    toEnsurePost() {
      ///发货
      let that = this
      if (this.data.enteringNumber.trim().length < 10) {
        tt.showToast({
          title: '订单填写有误，位数不能少于十位',
          icon:'none'
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
          success:(res)=>{
            if(res.confirm){
              global.$ajax('/uac/auth/pcb/sendGoods',
                { id: that.data.orderid, expressNo: that.data.enteringNumber, }
              ).then((res) => {
                tt.showToast({
                  title: res.data.result.msg,
                  icon:'none'
                })
                that.setData({
                  enteringNumber:'',
                  showPostLayer:false,
                })
                that.getAllOrder();
              })
            }
          }
        })
      }
    },
    //
    checkpswd(e) {
      console.log("嘿嘿")
      console.log(e.detail)
      this.setData({
        password: e.detail,
        showPswBoard: false
      })
      this.payContinute(this.data.params)
      // tt.showLoading({
      //   title:'校验中'
      // })
    },
    close() {
      //关闭键盘
      this.setData({
        showPswBoard: false
      })
    },
    //输入完了密码之后的操作
    payContinute(e) {
      console.log("继续")
      tt.showLoading({
        title: '支付中...'
      })
      if (this.data.password.trim() == '') {
        tt.showToast({
          title: '支付密码不能为空',
          icon: 'none'
        })
      } else {
        console.log(this.data.orderid)
        global.$ajax("/uac/auth/pcb/pcbPay", { id: this.data.orderid, payPassword: setEncode64(this.data.password) })
          .then(res => {
            /////在这里判断
            if (res.data.code == 200 && res.data.result == '支付成功') {
              this.setData({
                enterPassword: ''
              })
              tt.showToast({
                title: '请前往订单详情页面上传生产稿件',
                icon: 'none'
              })
              tt.navigateTo({
                url: '/pages/playAllegro/AllegroOrder/indexOrder/indexOrder?ordeType=0',
              })
              this.setData({
                showPswBoard: false
              })
            } else if (res.data.result.code) {
              tt.showToast({
                title: res.data.result.msg,
                icon: 'none'
              })
              this.setData({
                enterPassword: ''
              })
            }else {
              this.setData({
                enterPassword: ''
              })
              tt.showToast({
                title: res.data.result,
                icon: 'none'
              })
            }
            this.setData({
              showPswBoard: false
            })
            ///如果成功
          })
      }
      // this.isPassword = false
    },
    toCancel(){
      this.setData({
        showCatchLayer:false
      })
      this.triggerEvent('check', this.data.showCatchLayer);  
    },
    confirmReceive(e){
      let orderid = e.currentTarget.dataset.orderid
      //确认收货
      tt.showModal({
        title: '提示',
        content: '确认收货？',
        success:(res)=>{
          if(res.confirm){
            global.$ajax('/uac/auth/pcb/confirmGoods', { id: orderid })
              .then((res) => {
                console.log(res);
                this.getAllOrder();
              })
          }
        }
      })
    },
  },
  attached (){
    //小程序组件的生命周期
    console.log('werewr')
    this.getAllOrder()
    this.getSuplierList()
    console.log(tt.getStorageSync("userInfo222"))
    if (tt.getStorageSync("userInfo") !== null) {
      this.setData({
        userInfoC: tt.getStorageSync("userInfo222").id
      })
    } else {
      this.setData({
        userInfoC:undefined
      })
    }
    console.log(this.data.userInfoC)
  },

})
function setEncode64(input) {
  var keyStr = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=`;
  let output = "";
  let chr1,
    chr2,
    chr3 = "";
  let enc1,
    enc2,
    enc3,
    enc4 = "";
  let i = 0;
  do {
    chr1 = input.charCodeAt(i++);
    chr2 = input.charCodeAt(i++);
    chr3 = input.charCodeAt(i++);
    enc1 = chr1 >> 2;
    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
    enc4 = chr3 & 63;
    if (isNaN(chr2)) {
      enc3 = enc4 = 64;
    } else if (isNaN(chr3)) {
      enc4 = 64;
    }
    output =
      output +
      keyStr.charAt(enc1) +
      keyStr.charAt(enc2) +
      keyStr.charAt(enc3) +
      keyStr.charAt(enc4);
    chr1 = chr2 = chr3 = "";
    enc1 = enc2 = enc3 = enc4 = "";
  } while (i < input.length);
  return output;
}
