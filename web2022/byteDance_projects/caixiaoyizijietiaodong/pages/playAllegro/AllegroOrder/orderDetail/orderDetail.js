// pages/playAllegro/AllegroOrder/orderDetail/orderDetail.js
const qiniuUploader = require("../../../../utils/qiniuUploader.js");
import { upload } from '../../../../utils/qiniuUploader.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageObject:'',
    payPoint:0,
    payMoney:0,//金额
    OrderStatus:'',
    showPswBoard:false,
    password:'',
    showCatchLayer:false,
    dataList:[],
    showLayer:false,
    showApplyDispute:false,
    images:[],
    enterDesc:'',
    userInfo:undefined,
    isSupply: false,
    OrderDetail: {},
    disputeDetail: {},
    contactDetail: {},
    addrDetail: {},
    payInfoDetail: {}
  },
  toAplly(){
    this.setData({
      showApplyDispute:true,
      isSupply:true
    })
  },
  toCancelDisplute() {
    this.setData({
      showLayer:false,
      showApplyDispute:false,
      images:[],
      enterDesc:''
    })
  },
  toComplaint(){
    //投诉
    this.setData({
      showLayer:true
    })
  },
  uploadImg(){
    //进行上传
    let _this = this
    let user_token = global.state.token;
    tt.chooseImage({
      success: function (res) {
        console.log(res)
        if ((res.tempFilePaths.length + _this.data.images.length) > 5) {
          tt.showToast({
            title: '最多上传5张图片',
            icon: 'none'
          })
          return
        }
        res.tempFilePaths.forEach((el) => {
          tt.uploadFile({
            url: global.state.baseUrl + '/uac/auth/uploadImageFile',
            filePath: el,
            name: 'file',
            header: {
              "token": user_token
            },
            success: function (res) {
              if (res.statusCode == 200) {
                console.log(JSON.parse(res.data));
                let data = JSON.parse(res.data);
                let images = _this.data.images;
                images.push(data.result.attachmentUrl)
                _this.setData({
                  images: images
                })
              }
            }
          })
        })

      },
    })
  },
  //删除上传的图片
  delete_img(e) {
    let ind = e.currentTarget.dataset.index
    this.data.images.splice(ind, 1);
    this.setData({
      images:this.data.images
    })
  },
  //取消上传
  toCancelUpload() {
    this.setData({
      showLayer:false,
      showApplyDispute :false,
      images : [],
      enterDesc : ''
    })
  },
  toEnsureUpload(){
    //确认上传
    if (this.data.images.length > 0 && this.data.enterDesc.trim().length >= 20 && this.data.enterDesc.trim().length <= 130) {
      if (this.data.isSupply) {
        console.log("供应商回复")
        tt.showModal({
          title: '提示',
          content: '确定回复此投诉？',
          succeess:(res)=>{
            if(res.confirm){
              let data = {
                orderId: this.data.orderId,
                // supplierId:Number(this.contactDetail.supplierId),
                supplierId: this.data.contactDetail.supplierId,
                supplierDesc: this.data.enterDesc,
                supplierProof: JSON.stringify(this.data.images)
              }
              global.$ajax("/uac/auth/pcb/serviceResponseDispute", data)
                .then((res) => {
                  if (res.code == 200) {
                    console.log(res)
                    this.setData({
                      showLayer:false,
                      showApplyDispute:false,
                      images : [],
                    })
                    this.getDetail()//申诉之后也刷新一遍数据，更新状态
                  } else if (res.code == 500) {
                    console.log(res.data.message)
                  } else {
                    this.getDetail();
                    // this.$toast(res.data.message)
                  }
                })
            }
          }
        })
      } else {
        console.log("用户投诉")
        tt.showModal({
          title: '提示',
          content: '确定投诉此订单？',
          success:(res)=>{
            if(res.confirm){
              let data = {
                orderId: this.data.orderId,
                // userId:Number(this.addrDetail.uid),
                userId: this.data.addrDetail.uid,
                userDesc: this.data.enterDesc,
                userProof: JSON.stringify(this.data.images)
              }
              global.$ajax('/uac/auth/pcb/markOrderIsDispute', data).then((res) => {
                if (res.code == 200) {
                  console.log(res)
                  this.setData({
                    showLayer:false,
                    images:[]
                  })
                  this.getDetail();//申诉之后也刷新一遍数据，更新状态
                } else if (res.code == 500) {
                  console.log(res.data.message)
                } else {
                  this.getDetail();
                  // this.$toast(res.data.message)
                }
                this.setData({
                  showLayer: false,
                  images: []
                })
              })
            }
          }
        })
      }
    } else if (this.data.images.length == 0) {
      tt.showToast({
        title: '请至少上传一张图片',
        icon:'none'
      })
    } else if (this.data.enterDesc.trim().length < 20) {
      tt.showToast({
        title: '输入不能少于20字',
        icon: 'none'
      })
    } else if (this.data.enterDesc.trim().length > 130) {
      tt.showToast({
        title: '输入不能超过于130字',
        icon: 'none'
      })
    } else {
      console.log("其他错误")
    }
  },
  saveEnterDesc(e){
    let value = e.detail.value
    this.setData({
      enterDesc:value
    })
  },
  toCancel22(){
    this.setData({
      showCatchLayer:false
    })
  },
  topUpload(e){
    tt.showToast({
      title: '上传文件功能暂未开放', // 内容
      icon: 'none'
    });
    return;
    //以上提示功能暂未开放 2020.01.16
    
    //去上传上产稿件
    let that = this
    let orderid = e.currentTarget.dataset.orderid
    // 保持屏幕常亮
    tt.setKeepScreenOn({
      keepScreenOn: true
    })
    global.$ajax('/uac/auth/getQiNiuToken',{},{type:'GET'})
    .then((res) => {
      console.log(res)
      this.setData({
        upToken: res.data.result.upToken
      })
      // this.token = res.data.result.upToken
      // console.log(this.token)

      tt.chooseMessageFile({
        count: 1,
        success: function (res) {
          console.log(res)
          var filePath = res.tempFiles[0];
          console.log(upload)
          upload({
            filePath: filePath.path,
            options: {
              key: filePath.name ,          // 可选
              region: 'ECN',       // 可选(默认为'ECN')
              domain: 'http://qiniuoss.822644.com/',
              uptoken: that.data.upToken,      // 以下三选一
              uptokenURL: '',
              uptokenFunc: () => {
                console.log(that.data.upToken)
                return that.data.upToken;
              },
              shouldUseQiniuFileName: true // 默认false
            },
            before: () => {
              // 上传前
              console.log('before upload');
            },
            success: (res) => {
              console.log(res)
              that.setData({
                'imageURL': res.imageURL,
              });
              console.log('file url is: ' + res.imageURL);
              global.$ajax('/uac/auth/pcb/updateMaterialUrl', { orderId: that.data.orderId, materialUrl: res.imageURL, id: that.data.OrderDetail.id }).then((res) => {
                console.log(res);
                if(res.data.code == 200){
                  tt.showToast({
                    title: res.data.result
                  })
                }else{
                  tt.showToast({
                    title: res.data.result,
                    icon:'none'
                  })
                }
                that.getDetail()
              }).catch(err=>{

              })
            },
            fail: (err) => {
              console.log('error:' + err);
            },
            progress: (res) => {
              console.log('上传进度', res.progress)
              console.log('已经上传的数据长度', res.totalBytesSent)
              console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend)
            },
            complete: (err) => {
              // 上传结束
              console.log('upload complete');
            }
          });
        }
      });
    })
  },
  downloadMsg(e){
    let url = e.currentTarget.dataset.url
    //下载文件
    let _this = this
    console.log(url)
    const downloadTask = tt.downloadFile({
      url: url, //仅为示例，并非真实的资源
      success: function (res) {
        // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
        console.log(res)
        if (res.statusCode === 200) {
          _this.setData({
            filePath: res.tempFilePath //将下载的图片临时路径赋值给img_l,用于预览图片
          })
          let type = res.tempFilePath.substring(res.tempFilePath.lastIndexOf('.') + 1)
          console.log(type)
          tt.showLoading({
            title: '加载中...'
          })
          tt.openDocument({
            filePath: _this.data.filePath,
            success: function (res) {
              console.log(res)
              tt.hideLoading()
            },
            fail: function (res) {
              console.log("fail");
              console.log(res)
              tt.showToast({
                title: '该文件类型不支持',
                icon:'none'
              })
              tt.hideLoading()
            },
            complete: function (res) {
              console.log("complete");
              console.log(res)
            }
          })

          // tt.saveFile({
          //   tempFilePath: res.tempFilePath,
          //   success: function (res) {
          //     console.log(res)
          //     var savedFilePath = res.savedFilePath
          //   },
          //   fail: function (res) {
          //     console.log("fail");
          //     console.log(res)
          //   },
          //   complete: function (res) {
          //     console.log("complete");
          //     console.log(res)
          //   }
          // })
        }
      }
    })
    downloadTask.onProgressUpdate((res) => {
      console.log('下载进度', res.progress)
      console.log('已经下载的数据长度', res.totalBytesWritten)
      console.log('预期需要下载的数据总长度', res.totalBytesExpectedToWrite)
    })
  },
  getSuplierList() {
    global.$ajax('/uac/auth/wx/common/findPageInfoToSupplier',
      { type: 2, facilitatorTypeId: 9 }
    ).then((res) => {
      this.setData({
        dataList: res.data.result.list
      })
      console.log("接口测试的结果")
      console.log(this.dataList)
    })
  },
  catchOrder(e) {
    this.setData({
      showCatchLayer: true,
      userId: e.currentTarget.dataset.userid,
    })
  },
  //选择
  chooseService(e) {
    let serveid = e.currentTarget.dataset.serveid
    let suppliername = e.currentTarget.dataset.suppliername
    this.setData({
      supplierId: serveid,
      supplierName: suppliername,
      active: index
    })
  },
  ///选择供应商确认
  toEnsureChoose(e) {
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
              active: '',
              supplierId: 0,
              supplierName: '',
              showCatchLayer: false
            })
          }
        }
      })
    }
  },
  //点击支付按钮
  toPay(e) {
    // preBi  应该在这里设置
    //去支付
    let orderid = e.currentTarget.dataset.orderid
    this.setData({
      orderId: orderid
    })
    let that = this
    global.$ajax("/uac/auth/wx/common/findUserInfo", {}, { type: 'POST' }).then(res => {
      // console.log(res);
      that.setData({
        userInfo: res.data.result
      })
      if (that.data.userInfo.bi > 0) {
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
              url: '/pages/purchase/component/xyAssistant/travelBill/travelBill?ordeType=1',
            })
          })
      }
    });


  },
  cancelOrder() {
    global.$ajax('/uac/auth/pcb/orderCancel', { id: this.data.OrderDetail.orderId })
      .then((res) => {
        tt.showToast({
          title: '取消成功'
        })
        this.getDetail()
      })
  },
  //点击发货按钮
  toPost(e) {
    console.log(e)
    this.setData({
      userId: e.currentTarget.dataset.userid,
      showPostLayer: true
    })
  },
  toCancelPost() {
    this.setData({
      showPostLayer: false,
      enteringNumber: ''
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
              { id: that.data.orderId, expressNo: that.data.enteringNumber, }
            ).then((res) => {
              tt.showToast({
                title: res.data.result.msg,
                icon: 'none'
              })
              that.setDta({
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
          if (res.data.code == 200 && res.data.message == '操作成功') {
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
          } else {
            this.setData({
              enterPassword: ''
            })
            tt.showToast({
              title: res.data.message,
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
  toCancel() {
    this.setData({
      showCatchLayer: false
    })
  },
  confirmReceive(e) {
    let orderid = e.currentTarget.dataset.orderid
    //确认收货
    tt.showModal({
      title: '提示',
      content: '确认收货？',
      success: (res) => {
        if (res.confirm) {
          global.$ajax('/uac/auth/pcb/confirmGoods', { id: orderid })
            .then((res) => {
              console.log(res);
              this.getAllOrder();
            })
        }
      }
    })
  },
  getDetail(){
    //获取订单详情  
    let id = this.data.orderId;
    console.log(id)
    global.$ajax("/uac/auth/pcb/findPcbOrderDetail/" + id,{})
      .then(res => {
        console.log(res)
        this.setData({
          OrderDetail: res.data.result.mdcPcbOrderBViEn,
          disputeDetail:res.data.result.mdcPcbOrderDisputeViEn,
          contactDetail : res.data.result.mdcPcbOrderViEn,
          addrDetail : res.data.result.omcDeliveryAddressViEn,
          payInfoDetail : res.data.result.mdcPcbOrderPayInfoViEn
        })
        let str = ''
        if (this.data.contactDetail.orderStatus === 1) {
          str = '抢单中'
        } else if (this.data.contactDetail.orderStatus === 0) {
          str = '待支付'
        } else if (this.data.contactDetail.orderStatus === 2) {
          str = '生产中'
        } else if (this.data.contactDetail.orderStatus === 10) {
          str = '已完成'
        } else if (this.data.contactDetail.orderStatus === 3) {
          str = '已发货'
        } else if (this.data.contactDetail.orderStatus === 5) {
          str =  '申诉中'
        } else if (this.data.contactDetail.orderStatus === -1) {
          str = '已取消'
        } else if (this.data.contactDetail.orderStatus === 6) {
          str =  '争议已处理'
        }
        this.setData({
          OrderStatus:str,
          payPoint: Math.ceil(this.data.contactDetail.totalPrice),
          payMoney: this.data.contactDetail.totalPrice
        })
        console.log("喜欢")
      })
      .catch(res => { });
  },
  initQiniu() {
    var options = {
      region: 'NCN', // 华北区
      uptokenURL: global.state.baseUrl +'/uac/auth/getQiNiuToken',
      // uptoken: 'xxxx',
      domain: 'http://qiniuoss.822644.com'
    };
    qiniuUploader.init(options);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let orderId = options.orderId
    this.setData({
      orderId: orderId
    })
    if (tt.getStorageSync("userInfo") !== null) {
      this.setData({
        userInfo: tt.getStorageSync("userInfo222").id
      })
    } else {
      this.setData({
        userInfo: undefined
      })
    }
    this.getDetail()
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

// function initQiniu() {
//   var options = {
//     region: 'NCN', // 华北区
//     uptokenURL: 'https://yourserver.com/api/uptoken',
//     // uptoken: 'xxxx',
//     domain: 'http://qiniuoss.822644.com'
//   };
//   qiniuUploader.init(options);
// }