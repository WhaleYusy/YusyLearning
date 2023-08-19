// pages/purchase/component/mertialNeed/metialNeddDetail/metialNeddDetail.js
var ctx = "" // 用于获取canvas
var canvasWidth1 = ""
var canvasHeight1 = "" 
var ratio = 1  //字体大小跟分辨率比例
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isEnd:false,//判断需求是否过期，后续补上弹窗
    qrCodeImg:'',
    qrcodeUrl:"", //小程序码
    commonTotal:0,
    leavingParam: {
      pageNum: 1,
      pageSize: 100,
      demandId: ''
    },
    isCall:false,
    companyInfo:{},
    //获取留言的参数
    commitWord:'',
    commentList:{
      pageNum: 0, //页数
      pageSize: 999, //条数
      materialDemandId: ""
    },
    loading:false,//控制留言多次提交
    fileList:[],
    callList:[],
    isMy:false,//是否是自己的
    pictureAddressImg:[],
    swiperList1:[],
    swiperList2:[],
    swiperList3:[],
    appriseList:[],
    commentListData:[],
    total:0,//总数
    isSword:false,  //未打赏隐藏头像mtId
    mtId:'',
    fileAddressList:[],//文件列表
    riShow:false, //扫码进页面则显示返回首页按钮
    dataLists:[], //需求推荐

    //分享参数 
    canvasShow:false, //显示canvas和按钮
    canvasWidth: '', // canvas宽度
    canvasHeight: '', // canvas高度
    imagePath:"",//保存的图片路径
    imageSavePath: '', // 分享的图片路径
    pid:"",  //分享人

  },
  returnIndex() {
    wx.switchTab({
      url: '/pages/purchase/purchaseIndex'
    })
  },
  imgView(e){
    var img = [];
    img.push(e.currentTarget.dataset.img)
    wx.previewImage({
      urls : img
    })
  },
  makePhoneCall(e){
    let number = e.currentTarget.dataset.number
    wx.makePhoneCall({
      phoneNumber: number
    })
  },
  getContactMsg(){
    //去到联系方式的弹窗页
    wx.navigateTo({
      url: '/pages/purchase/component/mertialNeed/getContactDetail/getContactDetail'
    })
  },
  //广告
  getAdInfoMany1() {
    global.$ajax(`/uac/auth/wxAdver/getAdverListByType`, { type:2 },{type:"POST"}).then(res => {
      console.log("轮播图")
      console.log(res)
      if (res.data.code === 200) {
        this.setData({
          swiperList1:res.data.result
        })
      } 
    })
  },
  getAdInfoMany2(){
    global.$ajax(`/uac/auth/wxAdver/getAdverListByType`, { type: 3 }, { type: "POST" }).then(res => {
      console.log("轮播图")
      console.log(res)
      if (res.data.code === 200) {
        this.setData({
          swiperList2: res.data.result
        })
      }
    })
  },
  getAdInfoMany3() {
    setTimeout(()=>{
      global.$ajax(`/uac/auth/wxAdver/getAdverListByType`, { type: 8 }, { type: "POST" }).then(res => {
        console.log("轮播图")
        console.log(res)
        if (res.data.code === 200) {
          this.setData({
            swiperList3: res.data.result
          })
        }
      })
    },1500)
  },
  downLoad(e){
    let _this = this
    let index = e.currentTarget.dataset.index
    //下载文件
    let file = this.data.fileAddressList[index]
    const downloadTask = wx.downloadFile({
      url: file.url, //仅为示例，并非真实的资源
      success: function (res) {
        // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
        console.log(res)
        if (res.statusCode === 200) {
          _this.setData({
            filePath: res.tempFilePath //将下载的图片临时路径赋值给img_l,用于预览图片
          })
          let type = res.tempFilePath.substring(res.tempFilePath.lastIndexOf('.') + 1)
          console.log(type)
          wx.showLoading({
            title: '加载中...'
          })
          wx.openDocument({
            filePath: _this.data.filePath,
            success: function (res) {
              console.log(res)
              wx.hideLoading()
            },
            fail: function (res) {
              console.log("fail");
              console.log(res)
            },
            complete: function (res) {
              console.log("complete");
              console.log(res)
            }
          })

          // wx.saveFile({
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
  getDetail(id){
    wx.showLoading({
      title: '加载中...',
      mask:false
    })
    setTimeout(() => {
      wx.hideLoading()
    }, 300);
    global.$ajax(`/uac/auth/wx/common/findMaterialDemandInfo/${id}`,{},{type:'POST'})
      .then(res => {
        console.log(res.data);
        if (res.data.code == 200) {
          let temArr = JSON.parse(res.data.result.fileAddress)
          console.log(temArr)
          this.setData({
            companyInfo: res.data.result,
            fileAddressList: temArr
          })
          this.initQrCode(this.data.companyInfo.id);
          //需求推荐
          this.recommend(res.data.result.classId);//函数
          if (res.data.result.fileAddress == "" || res.data.result.fileAddress == null) {
            this.setData({
              fileList:[]
            })
          } else {
            this.setData({
              fileList: JSON.parse(res.data.result.fileAddress)
            })
          }
          // res.data.result.code 1是自己， 无字段不是自己
          res.data.result.code == 1 ? (this.data.isMy = false) : (this.data.isMy = true);
          res.data.result.pictureAddress == ""
            ? (this.data.pictureAddressImg = [])
            : (this.data.pictureAddressImg = JSON.parse(
              res.data.result.pictureAddress
            ).splice(0, 5));
          this.setData({
            isMy: this.data.isMy,
            pictureAddressImg: this.data.pictureAddressImg,
          })
          let resData = res.data.result;
          let arr = [
            resData.phone,
            resData.qqNumber,
            resData.wxNumber,
            resData.email
          ];
          let strArr = ['手机号','QQ号','微信号','邮箱']
          let temArr2 = []
          arr.map((item, key) => {
            // console.log(key)
            // console.log(strArr[key])
            temArr2.push({
              key:strArr[key],
              value: item
            });
          });
          this.setData({
            callList: temArr2
          })
        }
      })
  },
  recommend(classId) {
    global.$ajax("/uac/auth/wx/common/findRecommendMaterialDemandList", {
        classId: classId,
        id: this.data.leavingParam.demandId
      })              
      .then(res => {
        // console.log(res);
        if (res.data.code == 200) {
          // this.dataLists = res.data.result;
          this.setData({
            dataLists: res.data.result
          })
        }
      });
  },
  goPage(e) {
    //去到求购页的详情
    let item = e.currentTarget.dataset.item
    wx.navigateTo({
      url: '/pages/purchase/component/mertialNeed/metialNeddDetail/metialNeddDetail?id=' + item.id
    })
  },
  //获取评价内容
  getList() {
   global.$ajax("/uac/auth/wx/common/findDemandEvaluate", this.data.commentList,{type:'POST'})
      .then(res => {
        if (res.data.code === 200) {
          // console.log(res);
          res.data.result.list.map(item => {
            item.userLogo == null
              ? (item.userLogo =
                "http://img2.imgtn.bdimg.com/it/u=4051585461,2134518753&fm=26&gp=0.jpg")
              : (item.userLogo = item.userLogo);
            item.nickName == null
              ? (item.nickName = "未知用户")
              : (item.nickName = item.nickName);
          });
          this.setData({
            appriseList: res.data.result.list,
            total: parseInt(res.data.result.total),
          })
        }
      });
  },
  //留言内容
  getFindDemandMessageList() {
    global.$ajax("/uac/auth/wx/demand/findDemandMessageList", this.data.leavingParam)
      .then(res => {
        let old = JSON.parse(JSON.stringify(this.data.commentListData))
        if (res.data.code == 200) {
          let arr = old.concat(res.data.result.list)
          this.setData({
            commentListData: arr,
            commonTotal: res.data.result.total
          })
          // this.isShowLeavingHtml = true;
          // this.isShowLeavingBtn = false;
          // if (res.data.result.list.length > 0) {
          //   res.data.result.list.map(item => {
          //     this.leavingList.push(item);
          //   });
          // } else {
          //   this.isShowLeavingBtn = true;
          // }
        }
      });
  },
  setCommitWord(e){
    if (e.detail.value){
      console.log(e)
      let str = e.detail.value.replace(/\s+/g, "")
      this.setData({
        commitWord:str
      })
    }
  },
  //提交留言的内容
  toComment() {
    // console.log("wrwerwe")
    // console.log(this.data.loading)
    if(this.data.loading){
      return 
    }
    if (this.data.commitWord.trim() == "") {
      wx.showToast({
        title: '请输入留言内容',
        icon:'none'
      })
    } else {
      this.setData({
        loading:true
      })
      global.$ajax(`/uac/auth/wx/demand/saveDemandMessageInfo`, {
        demandId: this.data.leavingParam.demandId,
        content: this.data.commitWord
        })
        .then(res => {
          if (res.data.code == 200) {
            wx.showToast({
              title: res.data.result,
              icon:'none'
            });
          }
          this.setData({
            commentListData:[]
          })
          this.getFindDemandMessageList()
          this.setData({
            loading: false,
            commitWord:''
          })
        }).catch(err=>{
          console.log(err)
          this.setData({
            loading: false
          })
        })
    }
  },
  toShare(){
    //点击分享的时候
    //把banner图转为base64并存储本地路径
    let img = this.data.pictureAddressImg[0] || "https://qiniuoss.822644.com/wxPic/20191226/789844078442324992.jpg";

    // this.image_to_base64(img,'banner64');
    console.log(wx.getStorageSync('banner64'))
    //绘制产品图
    // this.drawBanner('banner64')
    // this.drawCode('code64')
    this.addImage()
    wx.showLoading({
      title: '图片生成中。。。',
    })
  },
  toShare2() {
    return new Promise(resolve => {
      //把banner图转为base64并存储本地路径
      let img = this.data.pictureAddressImg[0] || "https://qiniuoss.822644.com/wxPic/20191226/789844078442324992.jpg";
      this.addCode(2)
    });
  },
  getQrCode(){
    global.$ajax(`/uac/auth/wx/demand/queryQrcode2Info/2`, {}, { type: 'GET' }).then(res => {
      if (res.data.code == 200) {
        this.setData({
          qrCodeImg: res.data.result.qrcodeUrl
        })
      }
    });
  },
  goToReward(){
    //
    if (Number.parseInt(this.data.companyInfo.status) == 0) {
      this.setData({
        isEnd:true
      });
      // wx.showToast({
      //   title: '该需求已经过期啦~',
      //   icon:'none'
      // })
      //需求已经结束 -- 弹窗提示后续补充
      console.log(111)
    } else {
      // this.GiveRewardPopup = true;
      // this.$router.push({
      //   path: '/pageGiveReward',
      //   query: {
      //     id: this.$route.query.id,
      //     classId: this.companyInfo.classId
      //   }
      // });
      wx.navigateTo({
        url: `/pages/purchase/component/mertialNeed/getContactDetail/getContactDetail?id=${this.data.leavingParam.demandId}&classId=${this.data.companyInfo.classId}`
      })
    }
  },
  checkRelate(){
    //打赏之后直接获取联系方式
    // wx.showToast({
    //   title: '已经打赏'
    // })
    // this.setData({
    //   isCall:true
    // })
    //与ui图同步
    wx.navigateTo({
      url: `/pages/purchase/component/mertialNeed/getContactDetail/getContactDetail?id=${this.data.leavingParam.demandId}&classId=${this.data.companyInfo.classId}`
    })
  },
  onIsCallClose(){
    //关闭显示联系人的弹窗
    this.setData({
      isCall:false
    })
  },
  onGo(){
    wx.navigateTo({
      url: '/pages/purchase/component/xyAssistant/newsSettle/newsSettle'
    })
  },
  isEndClose(){
    this.setData({
      isEnd:false
    })
  },
  getXcxCode(mId){
    global.$ajax(`/uac/auth/wx/getMaterialDemandShare`, { id: mId}, { type: 'GET' }).then(res => {
      if (res.data.code == 200) {
        this.setData({
          imageSavePath: res.data.result.attachmentUrl
        })
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    ctx = wx.createCanvasContext('myCanvas');
    ctx.fillStyle = "#FFFFFF";
    // 扫码进入
    const scene = decodeURIComponent(options.scene) === "undefined" ? null : decodeURIComponent(options.scene);
    console.log("进入店铺携带参数：");
    if(scene != null){
      this.setData({
        riShow: true
      })
    }
    let id = options.id
    this.setData({
      mtId: id || scene
    })
    console.log(id)
    this.data.leavingParam.demandId = id
    this.data.commentList.materialDemandId = id
    this.setData({
      leavingParam:this.data.leavingParam,
      commentList: this.data.commentList
    })
    //广告
    this.getAdInfoMany1()
    // this.getAdInfoMany2()
    //
    this.getDetail(this.data.mtId);
    this.getXcxCode(this.data.mtId);
    // 获取二维码
    this.getQrCode()
    //获取留言
    this.getFindDemandMessageList()
    //获取评价
    this.getList()
    this.getAdInfoMany3()

    //分享初始化数据
    var that = this
    var sysInfo = wx.getSystemInfo({
      success: function (res) {
        canvasWidth1 = res.windowWidth * 0.9
        canvasHeight1 = res.windowHeight * 0.85
        ratio = res.windowWidth / 375
        that.setData({
          canvasWidth: canvasWidth1,
          canvasHeight: canvasHeight1
        })
      },
    })

    // 清理分享图片的缓存
    wx.removeStorageSync('storageKeyUrl');
    wx.removeStorageSync('storageKeyUrlCode');
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
    // if (this.data.mtId != "") {
    //   this.getDetail(this.data.mtId)
    // }
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
    let that = this
    let sharePath = "pages/purchase/component/mertialNeed/metialNeddDetail/metialNeddDetail?id=" + that.data.mtId
    let userId = wx.getStorageSync('userInfo') != '' ? JSON.parse(wx.getStorageSync('userInfo')).userId : ''
    sharePath = sharePath + "&pid=" + userId;
    console.log(sharePath)
    return {
      title: that.data.companyInfo.title,
      path: sharePath,
      imageUrl: that.data.imageSavePath
    };
    // })
    
  },
  //保存图片
  savePicture:function(){
    let that = this;
    wx.canvasToTempFilePath({
      canvasId: 'myCanvas',
      success: function success(res) {
        console.log(res)
        wx.saveFile({
          tempFilePath: res.tempFilePath,
          success: function success(res) {
            console.log(res)
            that.setData({
              // pView:true,
              imagePath: res.savedFilePath
            });

            // 保存图片到本地
            console.log(that.data.imagePath)
            wx.saveImageToPhotosAlbum({
              filePath: that.data.imagePath,
              success(res) {
                console.log(res)
                wx.showModal({
                  content: '图片已保存到相册，赶紧晒一下吧~',
                  showCancel: false,
                  confirmText: '好的',
                  confirmColor: '#333',
                  success: function (res) {
                    /* 该隐藏的隐藏 */
                    that.setData({
                      canvasShow: true
                    })
                  }
                })
              }, fail(res) {
                console.log(res)
                wx.showToast({
                  title: '图片保存失败~',
                  icon: 'none'
                })
              }
            })
          }
        });
      },
      fail(res) {
        console.log(res)
      }
    });
  },
  closeCanvas: function () {
    wx.removeStorage({
      key: 'storageKeyUrlCode'
    })
    wx.removeStorage({
      key: 'storageKeyUrl'
    })
    this.setData({
      canvasShow: false
    })
  },
  /**
* 初始化二维码
*/
  initQrCode(mtId) {
    let data = {
      page: 'pages/purchase/component/mertialNeed/metialNeddDetail/metialNeddDetail',
      // page:null,
      scene: mtId
    }
    global.$ajax('/uac/auth/wx/gen_qr_code', data, { type: 'POST' }).then((res) => {
      if (res.data.code == 200) {
        //存储二维码base64
        // wx.setStorageSync('code64', res.data.result.body)
        this.setData({
          qrcodeUrl: res.data.result.attachmentUrl
        })
        
        // 生成二维码后，数据完毕，开始画图
        // this.addImage()
      }
    }).catch(err => {
    })
  },
  addImage: function () {
    // this.addPicture();
    this.addCode()
    // this.addTitleLeftBg();
    // this.addTitleLeft();
    // this.addTitle();
    // this.addDescn();
    // this.addConAndCode1();
    // this.addConAndCode2();
    // this.addConAndCode3();
    // ctx.draw();
  },
  //draw绘制
  drawBanner(storageKey){
    storageKey = 'banner64'
      let that = this
      let promise = new Promise((resolve, reject) => {
      let filePath = `${wx.env.USER_DATA_PATH}/656`;
      wx.getFileSystemManager().writeFile({
        filePath: filePath,
        // this.getBase64Data()
        data: wx.base64ToArrayBuffer(wx.getStorageSync(storageKey)),
        encoding: 'binary',
        success: () => {
          console.log('写入成功, 路径: ', filePath);
          resolve(filePath);
        },
        fail: err => {
          reject('写入失败：', err);
        },
      });
    })
      return new Promise((resolve, reject) => {
        promise.then((filePath) => {
         console.log(filePath)
          console.log(that)
        var cotent = wx.createCanvasContext('myCanvas');
        //这里的 drawImage 是要干嘛
        cotent.drawImage(filePath, 10,10, 315, 130);
        cotent.draw(false, () => {
          wx.canvasToTempFilePath({
            canvasId: 'myCanvas',
            success: res => {
              let saveFilePath = res.tempFilePath;
              console.log(saveFilePath)
              //小程序码的临时路径
              that.setData({
                bannerTemPath: saveFilePath,
              })
              //开始绘制二维码
              this.addImage()
              //saveFilePath 拿到的小程序码
              // this.crateImg(saveFilePath)
              //开始保存
              // that.startSaveImage()
              /// 删除写入的数据
              wx.getFileSystemManager().unlink({
                filePath: filePath,
                success: res => {
                  console.log('删除成功, 路径: ', filePath);
                  resolve(saveFilePath);
                },
                fail: err => {
                  reject('删除失败：', err);
                }
              })
            },
            fail: err => {
              reject('保存图片到本地失败：', err);
            }
          })
        })
      }, err => {
        reject(err);
      })
    })
    //保存图片
    // this.startSaveImage()
  },
  drawCode(storageKey){
      let that = this
      console.log(this)
      let promise = new Promise((resolve, reject) => {
      let filePath = `${wx.env.USER_DATA_PATH}/5645`;
      wx.getFileSystemManager().writeFile({
        filePath: filePath,
        // this.getBase64Data()
        data: wx.base64ToArrayBuffer(wx.getStorageSync(storageKey)),
        encoding: 'binary',
        success: () => {
          console.log('写入成功, 路径: ', filePath);
          console.log(that)
          resolve(filePath);
          this.addCode()
        },
        fail: err => {
          reject('写入失败：', err);
        },
      });
    })
      return new Promise((resolve, reject) => {
        promise.then((filePath) => {
        console.log(filePath)
        console.log(that)
          var cotent = wx.createCanvasContext('myCanvas');
        //这里的 drawImage 是要干嘛
        cotent.drawImage(filePath, 185,280, 100, 100);
        cotent.draw(false, () => {
          wx.canvasToTempFilePath({
            canvasId: 'myCanvas',
            success: res => {
              let saveFilePath = res.tempFilePath;
              console.log(saveFilePath)
              //小程序码的临时路径
              that.setData({
                codeTemPath: saveFilePath,
              })
              //开始绘制文字
              this.addImage()

              //saveFilePath 拿到的小程序码
              // this.crateImg(saveFilePath)
              //开始保存
              // that.startSaveImage()
              /// 删除写入的数据
              wx.getFileSystemManager().unlink({
                filePath: filePath,
                success: res => {
                  console.log('删除成功, 路径: ', filePath);
                  resolve(saveFilePath);
                },
                fail: err => {
                  reject('删除失败：', err);
                }
              })
            },
            fail: err => {
              reject('保存图片到本地失败：', err);
            }
          })
        })
      }, err => {
        reject(err);
      })
    })
    //保存图片
    // this.startSaveImage()
  },
  addTitleLeftBg: function () {
    // ctx.drawImage(this.data.bannerTemPath, 10, 10, 315, 130)
    // 
    // 185, 280, 100, 100
    var grad = ctx.createLinearGradient(canvasWidth1 * 0.035, canvasHeight1 * 0.57, canvasWidth1 * 0.245, canvasHeight1 * 0.52);
    grad.addColorStop(0, "#fde37e");
    grad.addColorStop(1, "#fe6d00");
    ctx.setFillStyle(grad);
    ctx.beginPath();
    ctx.moveTo(canvasWidth1 * 0.035, canvasHeight1 * 0.57);
    ctx.lineTo(canvasWidth1 * 0.21, canvasHeight1 * 0.57);
    ctx.lineTo(canvasWidth1 * 0.245, canvasHeight1 * 0.52);
    ctx.lineTo(canvasWidth1 * 0.07, canvasHeight1 * 0.52);
    //codeTemPath
    ctx.fill();
  },
  addTitleLeft: function () {
    var str = "求 购";
    let fontSize = parseInt(14 * ratio) + 'px';
    ctx.font = 'normal normal '+fontSize +' sans-serif';
    ctx.setTextAlign('center'); // 文字居中
    ctx.setFillStyle("#fff");
    ctx.fillText(str, canvasWidth1 * 0.14, canvasHeight1 * 0.555);
  },
  addTitle: function () {
    var str = this.data.companyInfo.title;
    ctx.setFillStyle("#000");
    ctx.setTextAlign('left'); // 文字居中
    ctx.font = 'normal bold 14px sans-serif';
    this.dealWords({
      ctx: ctx,//画布上下文
      fontSize: parseInt(20 * ratio),//字体大小
      word: str,//需要处理的文字
      maxWidth: canvasWidth1 * 0.68,//一行文字最大宽度
      x: canvasWidth1 * 0.28,//文字在x轴要显示的位置
      y: canvasHeight1 * 0.515,//文字在y轴要显示的位置
      maxLine: 1//文字最多显示的行数
    })
  },
  addDescn: function () {
    var str = "要求描述：";
    str += this.data.companyInfo.description;
    ctx.font = 'normal normal 14px sans-serif';
    this.dealWords({
      ctx: ctx,//画布上下文
      fontSize: parseInt(15 * ratio),//字体大小
      word: str,//需要处理的文字
      maxWidth: canvasWidth1 * 0.93,//一行文字最大宽度
      x: canvasWidth1 * 0.035,//文字在x轴要显示的位置
      y: canvasHeight1 * 0.59,//文字在y轴要显示的位置
      maxLine: 2//文字最多显示的行数
    })
  },
  addConAndCode1: function () {
    var str = "需求数量：";
    str += this.data.companyInfo.demandCount;
    ctx.font = 'normal normal 14px sans-serif';
    ctx.setFillStyle("#222");
    this.dealWords({
      ctx: ctx,//画布上下文
      fontSize: parseInt(14 * ratio),//字体大小
      word: str,//需要处理的文字
      maxWidth: canvasWidth1 * 0.58,//一行文字最大宽度
      x: canvasWidth1 * 0.035,//文字在x轴要显示的位置
      y: canvasHeight1 * 0.69,//文字在y轴要显示的位置
      maxLine: 1//文字最多显示的行数
    })
  },
  addConAndCode2: function () {
    var str = "物料类别：";
    str += this.data.companyInfo.className;
    ctx.font = 'normal normal 14px sans-serif';
    ctx.setFillStyle("#222");
    this.dealWords({
      ctx: ctx,//画布上下文
      fontSize: parseInt(14 * ratio),//字体大小
      word: str,//需要处理的文字
      maxWidth: canvasWidth1 * 0.58,//一行文字最大宽度
      x: canvasWidth1 * 0.035,//文字在x轴要显示的位置
      y: canvasHeight1 * 0.76,//文字在y轴要显示的位置
      maxLine: 1//文字最多显示的行数
    })
    // let code 
    // ctx.drawImage(filePath, 185, 280, 100, 100)
  },
  addConAndCode3: function () {
    var str = "交货地点：";
    str += this.data.companyInfo.deliveryAddress;
    ctx.font = 'normal normal 14px sans-serif';
    ctx.setFillStyle("#222");
    this.dealWords({
      ctx: ctx,//画布上下文
      fontSize: parseInt(14 * ratio),//字体大小
      word: str,//需要处理的文字
      maxWidth: canvasWidth1 * 0.58,//一行文字最大宽度
      x: canvasWidth1 * 0.035,//文字在x轴要显示的位置
      y: canvasHeight1 * 0.83,//文字在y轴要显示的位置
      maxLine: 2//文字最多显示的行数
    })
    
  },
  addCode(typeNum) {
    let that = this
    let promise1 = new Promise(function (resolve, reject) {
      let saveStr = that.data.pictureAddressImg[0] || "https://qiniuoss.822644.com/wxPic/20191226/789844078442324992.jpg";
      wx.getImageInfo({
        src: saveStr,    //请求的网络图片路径
        success: function (res) {
          console.log(1)
          //请求成功后将会生成一个本地路径即res.path,然后将该路径缓存到storageKeyUrl关键字中
          wx.setStorageSync('storageKeyUrl',res.path);
          resolve(res)
        }
      })
    });
    let promise2 = new Promise(function (resolve, reject) {
      console.log(2)
      let saveStr2 = that.data.qrcodeUrl;
      console.log(saveStr2)
      wx.getImageInfo({
        src: saveStr2,    //请求的网络图片路径
        success: function (res) {
          console.log(3)
          //请求成功后将会生成一个本地路径即res.path,然后将该路径缓存到storageKeyUrl关键字中
          wx.setStorageSync('storageKeyUrlCode',res.path);
          resolve(res)
        }
      })
    });
    Promise.all([
      promise1,promise2
    ]).then(res => {
      console.log(res)
      //主要就是计算好各个图文的位置
      ctx.fillStyle ='#ffffff';//然后就可以赋给fillStyle了
      ctx.fillRect(0,0,this.data.canvasWidth,this.data.canvasHeight);
      //前两个参数表示矩形左上角的点的x,y坐标，w,h表示矩形的宽高。

      let img = wx.getStorageSync('storageKeyUrl')
      ctx.drawImage(img, canvasWidth1 * 0.035, canvasHeight1 * 0.025, canvasWidth1 * 0.93, canvasHeight1 * 0.45)
      this.addTitleLeftBg();
      this.addTitleLeft();
      this.addTitle();
      this.addDescn();
      this.addConAndCode1();
      this.addConAndCode2();
      this.addConAndCode3();
      let imgCode = wx.getStorageSync('storageKeyUrlCode')
      ctx.drawImage(imgCode, canvasWidth1 * 0.67, canvasHeight1 * 0.73, canvasWidth1 * 0.27, canvasWidth1 * 0.27)
      ctx.draw();
      // if(typeNum==2){
      //   wx.canvasToTempFilePath({
      //     canvasId: 'myCanvas',
      //     success: function success(res) {
      //       wx.saveFile({
      //         tempFilePath: res.tempFilePath,
      //         success: function success(res) {
      //           that.setData({
      //             imageSavePath: res.savedFilePath
      //           });
      //         }
      //       });
      //     }
      //   });
      // }else{
        this.setData({
          canvasShow: true
        })
        wx.hideLoading()
      // }
    })
    // let img = wx.getStorageSync('storageKeyUrl')
    // ctx.drawImage(img, 185, 280, 100, 100)

    // var img = this.data.codeTemPath;
    // ctx.drawImage(filePath, 185, 280, 100, 100)
  },
  image_to_base64: function (str,key) {
    //这个只是示例 ，后期要把 str 通过调用函数的时候传入
    // str = 'http://qiniuoss.822644.com/wxPic/20191226/789844078442324992.jpg'
    return new Promise(((resolve, reject) => {
      wx.downloadFile({
        url: str,
        success(res) {
          wx.getFileSystemManager().readFile({
            filePath: res.tempFilePath, //选择图片返回的相对路径
            encoding: 'base64', //编码格式
            success: res => { //成功的回调
              // console.log(res.data)
              wx.setStorageSync(key, res.data)
              resolve('data:image/png;base64,' + res.data)
            }
          })
        }
      })

    }))
  },
  //处理文字多出省略号显示
  dealWords: function (options) {
    options.ctx.setFontSize(options.fontSize);//设置字体大小
    var allRow = Math.ceil(options.ctx.measureText(options.word).width / options.maxWidth);//实际总共能分多少行
    var count = allRow >= options.maxLine ? options.maxLine : allRow;//实际能分多少行与设置的最大显示行数比，谁小就用谁做循环次数

    var endPos = 0;//当前字符串的截断点
    for (var j = 0; j < count; j++) {
      var nowStr = options.word.slice(endPos);//当前剩余的字符串
      var rowWid = 0;//每一行当前宽度
      if (options.ctx.measureText(nowStr).width > options.maxWidth) {//如果当前的字符串宽度大于最大宽度，然后开始截取
        for (var m = 0; m < nowStr.length; m++) {
          rowWid += options.ctx.measureText(nowStr[m]).width;//当前字符串总宽度
          if (rowWid > options.maxWidth) {
            if (j === options.maxLine - 1) { //如果是最后一行
              options.ctx.fillText(nowStr.slice(0, m - 1) + '...', options.x, options.y + (j + 1) * (options.fontSize + 2 * ratio));    //(j+1)*18这是每一行的高度
            } else {
              options.ctx.fillText(nowStr.slice(0, m), options.x, options.y + (j + 1) * (options.fontSize + 2 * ratio));
            }
            endPos += m;//下次截断点
            break;
          }
        }
      } else {//如果当前的字符串宽度小于最大宽度就直接输出
        options.ctx.fillText(nowStr.slice(0), options.x, options.y + (j + 1) * (options.fontSize + 2 * ratio));
      }
    }
  },
})