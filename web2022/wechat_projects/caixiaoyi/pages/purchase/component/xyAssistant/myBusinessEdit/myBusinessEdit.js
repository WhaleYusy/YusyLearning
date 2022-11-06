// pages/purchase/component/xyAssistant/myBusinessEdit/myBusinessEdit.js
var time = require("../../../../../utils/util.js");
var noneImg = "data:image/jpeg;base64,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";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    coverImg:"",
    sceneImg:"",
    businessImg:"",
    logoImg:"",
    settleType:"1", //1供应商 2服务商
    companyType:"",
    companyName:"",
    regMoney:"", 
    buildTimeS: "",
    address:"",
    linkman:"",
    phone:"",
    qq:"",
    wechat:"",
    introduce:"",
    serviceArea:"",
    mainProduct:[], //主营商品
    agentProduct: [],  //代理品牌
    mainCustomer: [],  //主要客户
    identifyList:[], //认证
    noneImg: noneImg,
    maxDate: new Date().getTime(),
    vdshow:false,
    currentDate: null,
    eventTime: "",
    menuList: [],
    showCato: false,
    showChild: false,//一开始不显示
    classId: "", // 供应商类型id
    facilitatorTypeId: "", // 服务商类型id
    className: '',
    latitude:null,
    longitude:null,
    markers: [{
      latitude: null,
      longitude: null
    }],
    active: 0,
    scrollSet:""
  },
  expandFir(e) {
    // 默认没children选中 有则展开
    let index = e.currentTarget.dataset.index, item = this.data.menuList[index];
    if(item.children){
      this.setData({
        active: index,
        showChild: true
      })
    }else {
      this.setData({
        showChild: false,
        showCato: false,
        scrollSet: '',
        classId: item.id,
        facilitatorTypeId: item.id,
        className: item.className
      })
    }
  },
  // 点击菜单进行请求
  chooseAndClose(e) {
    let datas = e.currentTarget.dataset.item
    this.setData({
      showChild: false,
      showCato: false,
      scrollSet: '',
      classId: datas.id,
      facilitatorTypeId: datas.id,
      className: datas.className
    })
  },
  //点击出现左侧分类
  goCatogory() {
    if(this.data.settleType == 1){
      global.$ajax('/uac/auth/wx/common/demandClassList', {}, { type: 'GET' }).then((res) => {
        if (res.data.code == 200) {
          this.setData({
            menuList: res.data.result,
            showCato: true,
            scrollSet: 'overflow-y:hidden;height:calc(100vh - 98rpx)'
          })
        }
      }).catch(err => {

      })
    }else {
      global.$ajax('/uac/auth/wx/common/findFacilitatorTypeList', {}, { type: 'GET' }).then((res) => {
        if (res.data.code == 200) {
          let array = [];
          if (res.data.result.length > 0){
            for(let index in res.data.result){
              let item = res.data.result[index];
              array.push({
                id: item.id,
                className: item.facilitatorTypeName
              })
            }
          }
          this.setData({
            menuList: array,
            showCato: true,
            scrollSet: 'overflow-y:hidden;height:calc(100vh - 98rpx)'
          })
        }
      }).catch(err => {

      })
    }
  },
  //上传封面
  oncoverImg: function () {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片，临时地址
        const tempFilePaths = res.tempFilePaths[0];
        that.imageUpload(tempFilePaths,0);
      }
    })
  },
  //上传公司实景图
  onsceneImg: function () {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片，临时地址
        const tempFilePaths = res.tempFilePaths[0];
        that.imageUpload(tempFilePaths, 1);
      }
    })
  },
  //上传营业执照
  onbusinessImg: function () {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片，临时地址
        const tempFilePaths = res.tempFilePaths[0];
        that.imageUpload(tempFilePaths, 2);
      }
    })
  },
  //上传LOGO
  onlogoImg: function () {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片，临时地址
        const tempFilePaths = res.tempFilePaths[0];
        that.imageUpload(tempFilePaths, 3);
      }
    })
  },
  ontypechange:function(){
    this.setData({
      companyType : "event"
    })
  },
  imageUpload:function(el,index) {
    var that = this;
    let user_token = global.state.token;
    var trueUrl = "";
    wx.uploadFile({
      url: global.state.baseUrl + '/uac/auth/uploadImageFile',
      filePath: el,
      name: 'file',
      header: {
        "token": user_token
      },
      success: function (res) {
        let data = JSON.parse(res.data);
        if (res.statusCode == 200) {
          switch(index){
            case 0: 
              that.setData({
                coverImg: data.result.attachmentUrl
              })
              break;
            case 1:
              that.setData({
                sceneImg: data.result.attachmentUrl
              })
              break;
            case 2:
              that.setData({
                businessImg: data.result.attachmentUrl
              })
            break;
            case 3:
              that.setData({
                logoImg: data.result.attachmentUrl
              })
            break;
            default: break;
          }
        }else{
          wx.showToast({
            title: data.message,
            icon: 'none'
          })
        }
      }
    })
    // return el;
  },
  //入驻类型选择
  onstChange: function(event){
    console.log(event)
    this.setData({
      settleType: event.detail.value,
      claseId: '',
      facilitatorTypeId: '',
      className: ''
    })
  },
  //打开时间选择器
  onvdOpen: function(event){
    // console.log(event);
    var name1 = event.currentTarget.dataset.name;
    var time1 = this.data[name1];
    console.log(time1);
    var time2 = new Date(time1).getTime();
    console.log(time2);
    this.setData({
      currentDate: time2,
      vdshow: true,
    })
    console.log(this.data.currentDate)
  },
  //关闭时间选择器
  onvdClose: function(){
    this.setData({
      vdshow: false,
    })
  },
  //确认修改时间
  onvdInput: function (event){
    var dts = time.formatTimeThree(event.detail,'Y-M-D');
    this.setData({
      buildTimeS: dts,
      vdshow: false
    })
  },
  addProduct: function(){
    var mList = this.data.mainProduct;
    mList.push("");
    this.setData({
      mainProduct:mList
    })
  },
  productChange: function (event) {
    var mList = this.data.mainProduct;
    var index = event.currentTarget.dataset.index;
    var data = event.detail.value;
    mList[index] = data;
    this.setData({
      mainProduct: mList
    })
  },
  addAgent: function () {
    var aList = this.data.agentProduct;
    console.log(aList);
    aList.push("");
    this.setData({
      agentProduct: aList
    })
  },
  agentChange: function (event) {
    var aList = this.data.agentProduct;
    var index = event.currentTarget.dataset.index;
    var data = event.detail.value;
    aList[index] = data;
    this.setData({
      agentProduct: aList
    })
  },
  addCustomer: function () {
    var aList = this.data.mainCustomer;
    var newObj = {
      name: "",
      company: "",
      sum: null,
      price: null,
      coopTimeS: null
    }
    aList.push(newObj);
    this.setData({
      mainCustomer: aList
    })
  },
  customerChange: function (event) {
    var aList = this.data.mainCustomer;
    var index = event.currentTarget.dataset.index;
    var name1 = event.currentTarget.dataset.name;
    var data = event.detail.value;
    console.log(aList)
    aList[index][name1] = data;
    this.setData({
      mainCustomer: aList
    })
  },
  toast: function (con) {
    wx.showToast({
      title: con,
      icon: 'none',
      duration: 2000
    })
  },
  addIdentify: function () {
    var aList = this.data.identifyList;
    if(aList.length>=3){
      wx.showToast({
        title: '最多只可以添加3项哦！',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    var newObj = {
      project: "",
      department: "",
      number: "",
      base: "",
      peopleNum: null,
      endTimeS: null,
      area: ""
    }
    aList.push(newObj);
    this.setData({
      identifyList: aList
    })
  },
  identifyChange: function (event) {
    var aList = this.data.identifyList;
    var index = event.currentTarget.dataset.index;
    var name1 = event.currentTarget.dataset.name;
    var data = event.detail.value;
    console.log(aList)
    aList[index][name1] = data;
    this.setData({
      identifyList: aList
    })
  },
  submitSupply: function (formE) {
    let update = false;
    if (this.data.id == undefined || this.data.id == null || this.data.id == '') {
    } else {
      update = true;
    }
    global.$ajax('/uac/auth/wx/common/findSupplierDetailInfoCount',{},{ type: 'GET' }).then(res => {
      console.log(res)
      if (res.data.result != null && res.data.result.code == 300) { //有供应商信息
        if(!update){  // 有供应商信息不给新增
          this.toast(res.data.result.msg);
          return;
        }
      }
      // 无供应商信息 或者 有供应商信息修改
      console.log(formE.detail.value)
      let form = formE.detail.value
      console.log(form);
      console.log(this.data);
      this.setData({
        address: form.address,
        companyName: form.companyName,
        introduce: form.introduce,
        linkman: form.linkman,
        phone: form.phone,
        qq: form.qq,
        regMoney: form.regMoney,
        serviceArea: form.serviceArea,
        settleType: form.settleType,
        wechat: form.wechat
      })
      if (this.data.coverImg === "") {
        this.toast("请上传公司封面");
        return;
      }
      if (this.data.businessImg === "") {
        this.toast("请上传营业执照");
        return;
      }
      if (this.data.logoImg === "") {
        this.toast("请上传公司logo");
        return;
      }
      if (
        (this.data.settleType == "1" && this.data.classId == "") ||
        (this.data.settleType == "1" && this.data.classId == null)
      ) {
        this.toast("请选择供应商类别");
        return;
      }
      if (
        (this.data.settleType == 2 &&
          this.data.facilitatorTypeId == "") ||
        (this.data.settleType == 2 && this.data.facilitatorTypeId == null)
      ) {
        this.toast("请选择服务商类别");
        return;
      }
      if (this.data.companyName === "") {
        this.toast("请输入公司名称");
        return;
      }
      if (this.data.regMoney === "") {
        this.toast("请输入注册资本");
        return;
      }
      if (this.data.buildTimeS === "") {
        this.toast("请选择成立时间");
        return;
      }
      if (this.data.address === "") {
        this.toast("请输入公司地址");
        return;
      }
      if (this.data.linkman === "") {
        this.toast("请输入联系人");
        return;
      }
      if (this.data.phone === "") {
        this.toast("请输入手机号");
        return;
      }
      if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(this.data.phone)) {
        this.toast("手机号格式不正确");
        return;
      }

      console.log(this.data);
      let data = {
        id: this.data.id,
        type: this.data.settleType,
        supplierName: this.data.companyName,
        companyUrl: this.data.sceneImg,
        enterpriseUrl: this.data.businessImg,
        coverUrl: this.data.coverImg,
        logo: this.data.logoImg,
        regCapital: this.data.regMoney,
        supplierAddress: this.data.address,
        shortName: this.data.introduce,
        serviceRange: this.data.serviceArea,
        phone: this.data.phone,
        wxNumber: this.data.wechat,
        qqNumber: this.data.qq,
        establishTime: this.data.buildTimeS,
        operateProduces: this.data.mainProduct,
        proxyBrand: this.data.agentProduct,
        contactPerson: this.data.linkman,
        classId: this.data.classId,
        facilitatorTypeId: this.data.facilitatorTypeId
      }
      let mainPartner = [];
      if (this.data.mainCustomer.length > 0){
        for (let item in this.data.mainCustomer) {
          let customer = this.data.mainCustomer[item];
          mainPartner.push({
            supplierId: this.data.id,
            partnerName: customer.name,
            companyName: customer.company,
            num: customer.sum,
            cash: customer.price,
            partnerTime: customer.coopTimeS
          })
        }
      }
      let certificate = [];
      if (this.data.identifyList.length > 0){
        for(let item in this.data.identifyList){
          let identify = this.data.identifyList[item];
          certificate.push({
            supplierId: this.data.id,
            certificateProject: identify.project,
            certificateOrganization: identify.department,
            certificateNo: identify.number,
            certificateGist: identify.base,
            coverPersons: identify.peopleNum,
            expiredTime: identify.endTimeS,
            coverJobRange: identify.area
          })
        }
      }
      data.mainPartner = JSON.stringify(mainPartner);
      data.certificate = JSON.stringify(certificate);
      data.latitude = this.data.markers[0].latitude;
      data.longitude = this.data.markers[0].longitude;


      // 保存入库
      global.$ajax('/uac/auth/wx/common/saveSupplierInfo', data, { type: 'POST' }).then(res => {
        console.log(res)
        if (res.data.code === 200) {
          var txt = ""
          if (this.data.id == undefined || this.data.id == null || this.data.id == ''){
            txt = "提交成功。";
          }else{
            txt = "修改成功。"
          }
          this.toast(txt);
          //跳转到列表页
          setTimeout(function(){
            wx.redirectTo({
              url: "/pages/purchase/component/xyAssistant/myBusiness/myBusiness"
            })
          },1000)
        }else{
          this.toast(res.data.message);
          return;
        }
      }).catch(err => {
        console.log(err)
        this.toast("出错了~")
      })
    })

  },
  setMarkers(e) {
    let newMarker = {}, mList = []
    newMarker.id = 1
    newMarker.latitude = e.detail.latitude
    newMarker.longitude = e.detail.longitude
    mList.push(newMarker)
    this.setData({
      markers: mList
    })
    console.log(e)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.getLocation({
      type: 'gcj02',
      success(res) {
        console.log(res)
        let markers = {}, mList = []
        markers.id = 1
        markers.latitude = res.latitude
        markers.longitude = res.longitude
        mList.push(markers)
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude,
          markers: mList
        })
      }, complete() {
        console.log(options)
        if (options.id) {
          that.setData({
            id: options.id
          })
          that.initBusiness(options.id)
        }
      }
    })
  },
  // 初始化公司
  initBusiness(id){
    global.$ajax('/uac/auth/wx/common/querySupplierInfoById/' + id, {}, { type: 'POST' }).then(res => {
      console.log(res)
      if(res.data.code === 200){
        let data = res.data.result
        let markers ={}, mList = []
        markers.latitude = data.latitude
        markers.longitude = data.longitude
        mList.push(markers)
        this.setData({
          coverImg: data.coverUrl,
          sceneImg: data.companyUrl,
          businessImg: data.enterpriseUrl,
          logoImg: data.logo,
          settleType: data.type,
          companyName: data.supplierName,
          regMoney: data.regCapital,
          buildTimeS: data.establishTime,
          address: data.supplierAddress,
          linkman: data.contactPerson,
          phone: data.phone,
          qq: data.qqNumber,
          wechat: data.wxNumber,
          introduce: data.shortName,
          serviceArea: data.serviceRange,
          facilitatorTypeId: data.facilitatorTypeId,
          classId: data.classId,
          mainProduct: data.operateProducesStr ? data.operateProducesStr.split(','):[],
          agentProduct: data.proxyBrandStr ? data.proxyBrandStr.split(','):[],
          latitude: data.latitude,
          longitude: data.longitude,
          markers: mList,
        })
        // 初始化类别
        this.initType(data.type, data.classId, data.facilitatorTypeId);
        // 初始化主要客户
        if (data.partnerList.length > 0){
          let array = [];
          for (let item in data.partnerList){
            let partner = data.partnerList[item];
            console.log(data.partnerList[item]);
            array.push({
              name: partner.partnerName,
              company: partner.companyName,
              sum: partner.num,
              price: partner.cash,
              coopTimeS: partner.partnerTime
            })
          }
          this.setData({
            mainCustomer: array
          })
        }

        // 初始化主题证书
        if (data.certificateList.length > 0) {
          let array = [];
          for (let item in data.certificateList) {
            let certificate = data.certificateList[item];
            console.log(data.certificateList[item]);
            array.push({
              project: certificate.certificateProject,
              department: certificate.certificateOrganization,
              number: certificate.certificateNo,
              base: certificate.certificateGist,
              peopleNum: certificate.coverPersons,
              endTimeS: certificate.expiredTime,
              area: certificate.coverJobRange
            })
          }
          this.setData({
            identifyList: array
          })
        }
      }
    }).catch(err => {
      console.log(err)
    })
  },
  // 初始化类型
  initType(type, classId, facilitatorTypeId){
    if(type == 1){
      global.$ajax('/uac/auth/wx/common/demandClassList', {}, { type: 'GET' }).then((res) => {
        if (res.data.code == 200) {
          let menuList = res.data.result, isReturn = false;
          for(let index in menuList){
            if(isReturn){
              break;
            }
            let item = menuList[index]
            if (item.id == classId){
              this.setData({
                className: item.className
              })
              isReturn = true;
              break;
            }
            if (item.children){
              for(let indexJ in item.children){
                let itemJ = item.children[indexJ];
                // console.log(itemJ)
                if (itemJ.id == classId) {
                  this.setData({
                    className: itemJ.className
                  })
                  isReturn = true;
                  break;
                }
              }
            }
          }
        }
      }).catch(err => {
      })
    }else {
      global.$ajax('/uac/auth/wx/common/findFacilitatorTypeList', {}, { type: 'GET' }).then((res) => {
        if (res.data.code == 200) {
          let menuList = res.data.result, isReturn = false;
          for (let index in menuList) {
            if (isReturn) {
              break;
            }
            let item = menuList[index]
            if (item.id == facilitatorTypeId) {
              this.setData({
                className: item.facilitatorTypeName
              })
              isReturn = true;
              break;
            }
          }
        }
      }).catch(err => {
      })
    }
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