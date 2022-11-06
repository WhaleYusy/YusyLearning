// pages/purchase/component/pushPurchase/pushPurchase.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    messageType: 1, // 信息类型 0本人 1他人
    purchaseId:'',
    title: "", // 标题
    classId: "", // 类型id
    description: "", // 需求描述
    expirationDateType: 0, // 截止日期类型 0 1 2 -> 3 7 11
    demandNumber: "", // 需求量
    deliveryAddress: "", // 交货地
    companyName: "", // 公司名
    // demandTypeId: "", // 需求类型id
    fileAddress: [], // 文件地址
    pictureAddress: [], // 图片地址
    contactPerson: "", // 联系人
    topReward: 3, // 打赏上限  1 2 3 -> 10 20 30
    phone: "", // 手机号
    wxNumber: "", // 微信号
    qqNumber: "", // qq号
    email: "", // 邮箱
    // demandTypeName: "", // 类型中文字段
    showChild: false,//一开始不显示
    active: 0,
    showCato: false,//是否显示菜单
    scrollSet:"",
    menuList: [],
    className:'',
    isDisabled:false,
    swiperList:[],
    passChecked:false,  //免骚扰
  },
  onPassChange(){
    this.setData({
      passChecked : !this.data.passChecked
    })
  },
  //点击出现左侧分类
  goCatogory() {
    global.$ajax('/uac/auth/wx/common/demandClassList', {}, { type: 'GET' }).then((res) => {
      if (res.data.code == 200) {
        this.setData({
          menuList: res.data.result,
          showCato: true,
          scrollSet: 'overflow-y:hidden;height:91vh'
        })
      }
    }).catch(err => {

    })
  },
  expandFir(e) {
    //
    let index = e.currentTarget.dataset.index
    this.setData({
      active: index,
      showChild: true
    })
  },
  //点击菜单进行请求
  chooseAndClose(e) {
    let datas = e.currentTarget.dataset.item
    this.setData({
      showChild: false,
      showCato: false,
      scrollSet:"",
      classId: datas.id,
      className: datas.className
    })
  },
  // 上传文件
  uploadFile() {
    tt.showToast({
      title: '上传文件功能暂未开放', // 内容
      icon: 'none'
    });
    return;
    //以上提示功能暂未开放 2020.01.16
  console.log("上传图片")
    let _this = this
    let user_token = global.state.token;
    console.log('aa')
    tt.chooseMessageFile({
      count: 10,
      // type: 'image',
      success(res) {
        console.log(res)
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFiles[0]
        if (tempFilePaths.size > 10*1024*1024){
          tt.showToast({
            title: '文件不能大于10m',
            icon: 'none'
          })
          return
        }
        if ((res.tempFiles.length + _this.data.fileAddress.length) > 10) {
          tt.showToast({
            title: '最多上传10个文件',
            icon: 'none'
          })
          return
        }
        console.log("这里")
        res.tempFiles.forEach((el) => {
          console.log(el)
          tt.uploadFile({
            url: global.state.baseUrl + '/uac/auth/uploadImageFile',
            filePath: el.path,
            name: 'file',
            header: {
              "token": user_token
            },
            success: function (res) {
              console.log("嘿嘿")
              if (res.statusCode == 200) {
                console.log(JSON.parse(res.data));
                let data = JSON.parse(res.data);
                let fileAddress = _this.data.fileAddress;
                fileAddress.push({
                  url: data.result.attachmentUrl,
                  name: data.result.attachmentName
                })
                let arr = []
                _this.setData({
                  fileAddress: fileAddress
                })
              }
            },
            fail: (res) => {
              console.log(res)
              console.log("f")
            },
            complete: () => {
              console.log('c')
            }
          })
        })
      },
    })
  },
  // 上传照片
  uploadLegalIdCardImg() {
    let _this = this
    let user_token = global.state.token;
    tt.chooseImage({
      success: function (res) {
        console.log(res)
        if ((res.tempFilePaths.length + _this.data.pictureAddress.length) > 5){
          tt.showToast({
            title: '最多上传5张图片',
            icon:'none'
          })
          return
        }
        res.tempFilePaths.forEach((el)=>{
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
                let pictureAddress = _this.data.pictureAddress;
                pictureAddress.push(data.result.attachmentUrl)
                _this.setData({
                  pictureAddress: pictureAddress
                })
              }
            }
          })
        })

      },
    })
  },
  // 删除图片
  deletImg(ev){
    let index = ev.currentTarget.dataset.index
    let data = this.data.pictureAddress;
    data.splice(index, 1);
    this.setData({
      pictureAddress: data
    })
  },
  // 删除文件
  deletFile(ev){
    let index = ev.currentTarget.dataset.index;
    let data = this.data.fileAddress;
    data.splice(index, 1);
    this.setData({
      fileAddress: data
    })
  },
  clickLayer() {
    //
    this.setData({
      showChild: false,
      scrollSet:"",
      showCato: false
    })
  },
  // 点击发布
  formSubmit(formE){
    console.log(formE.detail.value)
    let form = formE.detail.value
    if (form.title.trim() === ''){
      tt.showToast({
        title: '标题不能为空',
        icon:'none'
      })
      return
    }
    if (this.data.classId === ''){
      tt.showToast({
        title: '类别不能为空',
        icon:'none'
      })
      return
    }
    if (form.description.trim() === ''){
      tt.showToast({
        title: '需求描述不能为空',
        icon:'none'
      })
      return
    }
    if (form.phone.trim() === ''){
      tt.showToast({
        title: '手机号码不能为空',
        icon:'none'
      })
      return
    }
    if (!(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(form.phone))){
      tt.showToast({
        title: '手机号码格式不正确',
        icon:'none'
      })
      return
    }
    let arr = [];
    if (form.wxNumber.trim() !== ''){
      arr.push(form.wxNumber)
    }
    if (form.qqNumber.trim() !== ''){
      arr.push(form.qqNumber)
    }
    if (form.email.trim() !== ''){
      arr.push(form.email)
    }
    if(arr.length < 2){
      tt.showToast({
        title: '微信、QQ、邮箱至少填两个',
        icon:'none'
      })
      return
    }
    if (!this.data.isDisabled){
      this.setData({
        isDisabled:true
      })
      form.id = this.data.purchaseId;
      form.classId = this.data.classId;
      form.fileAddress = JSON.stringify(this.data.fileAddress)
      form.pictureAddress = JSON.stringify(this.data.pictureAddress)
      form.demandTypeId = 31
      console.log(form)
      global.$ajax("/uac/auth/wx/common/saveMaterialDemandInfo",form).then(res => {
        if (res.data.code == 200) {
          tt.showToast({
            title: res.data.result.msg,
            icon: 'none'
          })
          setTimeout(function () {
            tt.switchTab({
              url: '/pages/purchase/purchaseIndex',
              success: function (e) {
                var page = getCurrentPages().pop();
                if (page == undefined || page == null) return;
                page.onLoad2();
              }
            })
          },1000);
        }
        this.setData({
          isDisabled: false
        })
        tt.showToast({
          title: res.data.result.msg,
          icon: 'none'
        })
      }).catch(res => {
        this.setData({
          isDisabled: false
        })
        tt.showToast({
          title: res.data.result.msg,
          icon: 'none'
        })
      });
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSwiperList();
    this.getQrcode();
    if (options.id){
      global.$ajax(`/uac/auth/wx/common/findMaterialDemandInfo/${options.id}`).then(res => {
        // console.log(res);
        let resData = res.data.result;
        console.log(resData);
        this.setData({
          purchaseId: options.id,
          title: resData.title,
          classId: resData.classId,
          className: resData.className,
          deliveryAddress: resData.deliveryAddress,
          description: resData.description,
          fileAddress: JSON.parse(resData.fileAddress),
          pictureAddress: JSON.parse(resData.pictureAddress),
          qqNumber: resData.qqNumber,
          messageType: resData.messageType,
          expirationDateType: resData.expirationDateType,
          topReward: resData.topReward,
          contactPerson: resData.contactPerson,
          phone: resData.phone,
          wxNumber: resData.wxNumber,
          email: resData.email,
          demandNumber: resData.demandCount,
          companyName: resData.companyName
        })
      });
    }
  },
  // 获取二维码
  getQrcode() {
    global.$ajax(`/uac/auth/wx/demand/queryQrcode2Info/2`, {}, { type: 'GET' }).then(res => {
      if (res.data.code == 200) {
        this.setData({
          qrCodeImg: res.data.result.qrcodeUrl
        })

      }
    });
  },
  imgView(e) {
    var img = [];
    img.push(e.currentTarget.dataset.img)
    tt.previewImage({
      urls: img
    })
  },
  getSwiperList() {
    global.$ajax(`/uac/auth/wx/common/findHomeSwiperInfoList`, {}, { type: 'get' }).then(res => {
      if (res.data.code == 200) {
        this.setData({
          swiperList: res.data.result
        })
      }
    })
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
