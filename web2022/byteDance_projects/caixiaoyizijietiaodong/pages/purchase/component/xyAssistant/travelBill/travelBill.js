// pages/purchase/component/xyAssistant/travelBill/travelBill.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPswBoard: false,//显示安全键盘
    type:"1",
    pageNum:1,
    pageSize:10,
    tbList:[],
    total:0,
    showNoMore:false,
    userInfo:{},
    allBi:0,
    password:"",
    param2:{}
  },
  // 返回小易助手主页
  rLastPage: function () {
    tt.navigateBack({
      delta: 1
    })
  },
  // 切换订单状态显示数据
  ontabType: function (event) {
    var type = event.currentTarget.dataset.type;
    // if (type == this.data.type) {
    //   return;
    // }
    this.setData({
      pageNum:1,
      type: type,
      showNoMore:false,
      tbList:[]
    })
    if(this.data.type == 1){
      this.getTourListPayed()
    }else{
      this.getTourListUnPay()
    }
  },
  // 删除订单
  ondelTravel: function(event){
    var id = event.currentTarget.dataset.id;
    console.log(id);
  },
  //分享订单
  onshareTravel: function (event) {
    var id = event.currentTarget.dataset.id;
    console.log(id);
    tt.navigateTo({
      url: "/pages/service/component/travel/travelContent/travelContent?id=" + id
    })
  },
  //再次预订
  onReOrder: function (event) {
    var id = event.currentTarget.dataset.id;
    console.log(id);
    tt.navigateTo({
      url: "/pages/service/component/travel/travelContent/travelContent?id=" + id
    })
  },
  //再次支付
  onRepay: function (event) {
    var that = this;
    tt.showModal({
      title: '支付提示',
      content: '是否继续支付？',
      success(res) {
        if (res.confirm) {
          var bi = that.data.userInfo.bi;
          var travelBi = that.data.userInfo.travelBi;
          var item = event.currentTarget.dataset.item;
          console.log(item)
          var needToPayBi = item.orderTotalAmount * 2;
          var param = {
            travelOrderIsRepay: true,
            repay: false,
            tourOrderId: item.orderId
          }
          that.setData({
            param2: {
              travelOrderIsRepay: true,
              repay: false,
              tourOrderId: item.orderId,
              newPassword: ""
            }
          })
          if (needToPayBi > (bi + travelBi)) {  //积分和旅游积分不够，微信支付
            global.getPay("/uac/auth/tour/saveTourOrder", param,
              () => {
                //成功
                tt.showToast({
                  title: '支付成功',
                  icon: 'none'
                })
                that.setData({  //完毕初始化信息
                  allBi: 0,
                  password: "",
                  param2: {}
                })
                this.onLoad2()
              }, () => {
                //失败
                tt.showToast({
                  title: '您已取消支付',
                  icon: 'none'
                })
                that.setData({  //完毕初始化信息
                  allBi: 0,
                  password: "",
                  param2: {}
                })
              })
          }else{  //积分支付 输入密码 后台处理积分抵扣
            that.setData({
              allBi: needToPayBi
            })
            if (that.data.userInfo.payPassword != null) {
              //有支付密码
              // this.payContinute(params);//先输入密码，再继续积分支付
              that.setData({
                showPswBoard: true
              })
            } else {
              //去设置支付密码
              tt.showToast({
                // title: '没有设置支付密码，正在跳转设置支付密码页面',
                title: '没有设置支付密码，正在跳转页面',
                icon: 'none'
              })
              setTimeout(function(){
                tt.navigateTo({
                  url: `/pages/purchase/component/xyAssistant/setPassword/setPasssword?setType=travelBill`
                })
              },1000)
          }
        }
      }
      }
    })
  },
  checkpswd(e) {
    console.log(e.detail)
    this.setData({
      password: e.detail,
      showPswBoard: false
    })
    this.payContinute()
  }, 
  close() {
    //关闭键盘
    this.setData({
      showPswBoard: false
    })
  }, 

  payContinute(e) {
    console.log("继续")
    //输入完了密码之后的操作
    tt.showLoading({
      title: '支付中...'
    })
    var param2 = this.data.param2;
    param2.newPassword = setEncode64(this.data.password);
    this.setData({
      param2: param2
    })
    // console.log(params);
    global.$ajax("/uac/auth/tour/saveTourOrder", this.data.param2, { type: 'POST' })
      .then(res => {
        console.log(res);
        if (res.data.code == 200) {
          if (res.data.result.code == 1) {
            tt.showToast({
              title: res.data.result.msg,
              icon: 'none',
            })
            tt.hideLoading()
            this.onLoad2()
          } else {
            tt.showToast({
              title: res.data.result.msg,
              icon: 'none',
            })
          }
          // setTimeout(function () {
          //   //跳转到订单列表
          //   tt.navigateTo({
          //     url: '/pages/purchase/component/xyAssistant/travelBill/travelBill'
          //   })
          // }, 1000)
          this.setData({  //完毕初始化信息
            allBi: 0,
            password: "",
            param2: {}
          })
        }
      });
  },
  getTourListPayed(){
    //已经支付的订单
    global.$ajax('/uac/auth/tour/findPayedTourOrderListByUser',{pageNum:this.data.pageNum,pageSize:this.data.pageSize},{type:'POST'}).then(res=>{
      let arr = JSON.parse(JSON.stringify(this.data.tbList))
      if(res.data.code == 200){
        arr = arr.concat(res.data.result.list)
        this.setData({
          tbList:arr,
          total: Number(res.data.result.total)
        })
        if (this.data.tbList.length == res.data.result.total || res.data.result.total == 0){
          //
          this.setData({
            showNoMore:true
          })
        }
      }
    }).catch(res=>{
      console.log(res)
    })
  },
  getTourListUnPay(){
    global.$ajax('/uac/auth/tour/findUnPayedTourOrderListByUser', { pageNum: this.data.pageNum, pageSize: this.data.pageSize }, { type: 'POST' }).then(res=>{
      let arr = JSON.parse(JSON.stringify(this.data.tbList))
      if (res.data.code == 200) {
        arr = arr.concat(res.data.result.list)
        this.setData({
          tbList: arr,
          total: Number(res.data.result.total)
        })
        if (this.data.tbList.length == res.data.result.total || res.data.result.total == 0) {
          //
          this.setData({
            showNoMore: true
          })
        }
      }
    }).catch(res => {
      console.log(res)
    })
  },
  toTourDetail(e){
    console.log(e)
    let id = e.currentTarget.dataset.id
    tt.navigateTo({
      url: '/pages/purchase/component/xyAssistant/travelBill/travelDetail/travelDetail?id='+id
    })
  },
  getUserInfo(){
    //获取当前用户个人信息的积分和旅游积分
    global.$ajax("/uac/auth/wx/common/findUserInfo").then(res => {
      console.log(res)
      if (res.data.code == 200) {
        this.setData({
          userInfo: res.data.result
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getTourListPayed()
    this.getUserInfo()
  },
  onLoad2(){
    this.setData({
      pageNum: 1,
      tbList: []
    })
    this.getTourListUnPay()
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
    if(!this.data.showNoMore){
      this.setData({
        pageNum: this.data.pageNum + 1
      })
      if(this.data.type == 1){
        this.getTourListPayed()
      }else{
        this.getTourListUnPay()
      }
    }else{
      console.log("暂无更多")
    }
  },  

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (event) {
    var id = event.target.dataset.id;
    var title = event.target.dataset.title;
    let userId = wx.getStorageSync('userInfo') != '' ? JSON.parse(wx.getStorageSync('userInfo')).userId : ''
    //title path image
    var url = '/pages/service/component/travel/travelContent/travelContent?id=' + id+'&pid='+userId;
    let message = global.shareConfig(title, url , '')
    console.log(message)
    return message;
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