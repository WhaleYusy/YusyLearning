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
    payBi: 0,
    payMoney: 0,
    userInfo:{},
    orderList:[],
    pageNum1:1,
    judgeList1:[],
    showNoMore1:false,
    showCatchLayer:false,
    active:'',
    noData:false,//当数组为空的时候
    userInfoC:undefined,
    password:'',
    showPswBoard:false,
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
        orderList: []
      })
      this.getOrder()
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
      this.setData({
        showCatchLayer:false
      })
    },
    getOrder() {
      global.$ajax('/uac/auth/pcb/findPcbOrder', {
        pageNum: this.data.pageNum1,
        pageSize: this.data.pageSize,
        userOrSupplierId: tt.getStorageSync('userInfo222').id,
        orderStatus: 0
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
    toPay(e) {
      // preBi  应该在这里设置
      //去支付
      let orderid = e.currentTarget.dataset.orderid
      let item = e.currentTarget.dataset.item
      this.setData({
        orderId: orderid,
        payBi: Math.ceil(item.totalPrice),
        payMoney: item.totalPrice
      })
      let that = this
      global.$ajax("/uac/auth/wx/common/findUserInfo", {}, { type: 'POST' }).then(res => {
        // console.log(res);
        that.setData({
          userInfo: res.data.result
        })
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
        } else {
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
          global.getPay("/uac/auth/pcb/pcbPay", { id: res.data.result.orderId },
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
        console.log(this.data.orderId)
        global.$ajax("/uac/auth/pcb/pcbPay", { id: this.data.orderId, payPassword: setEncode64(this.data.password) })
          .then(res => {
            /////在这里判断
            console.log(res)
            if (res.data.code == 200 && res.data.result == '支付成功') {
              this.setData({
                enterPassword: ''
              })
              tt.showToast({
                // title: '支付成功，请尽快前往订单详情页面上传生产稿件',
                title: '支付成功',
                icon: 'none'
              })
              this.setData({
                showPswBoard: false
              })
              setTimeout(()=>{
                tt.navigateTo({
                  url: '/pages/playAllegro/AllegroOrder/indexOrder/indexOrder?ordeType=0',
                })
              },1000)
            } else if (res.data.result.code) {
              tt.showToast({
                title: res.data.result.msg,
                icon: 'none'
              })
              this.setData({
                enterPassword: ''
              })
            }  
            else {
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
  },
  attached(){
    this.getOrder()
    if (tt.getStorageSync("userInfo") !== null) {
      this.setData({
        userInfoC:tt.getStorageSync("userInfo222").id
      })
    } else {
      this.setData({
        userInfoC: undefined
      })
    }
  }
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

function formatTime(date) {
  let str = new Date(date)
  let year = str.getFullYear()
  let month = str.getMonth() + 1 > 9 ? str.getMonth() + 1 : '0' + (str.getMonth() + 1)
  let day = str.getDate() + 1 > 9 ? str.getDate() + 1 : '0' + (str.getDate() + 1)

  return year + '-' + month + '-' + month + ' ' + '00:00:00'
}
