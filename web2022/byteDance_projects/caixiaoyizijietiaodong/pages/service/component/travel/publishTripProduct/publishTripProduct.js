// pages/service/component/travel/publishTripProduct/publishTripProduct.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topBarParam: {
      title: "发布旅游信息",
      clickType: 0,
      url: ""
    },
    routeTypeList: [],
    currentTime: "08:00",
    minDate: new Date().getTime(),
    show: false, //是否显示行程列表
    isShowDate1: false,
    isShowDate2: false,
    isTime: false,
    childHeightPopup: false,
    childHeighList: [
      {
        name: "1.2米",
        status: 1
      },
      {
        name: "1.5米",
        status: 2
      }
    ],
    timeIndex: "",
    timeKey: "",
    timeStartComparison: "", // 开始预定时间比较
    timeEndComparison: "", // 结束预定时间比较
    images: [],
    characteristicList: [{ content: "" }],
    tripList: [
      {
        children: [{ time: "" }],
        content: ""
      }
    ],
    submitList: {
      id: "",
      typeName: "",
      typeId: "",
      name: "",
      mainImg: "",
      images: [], // 上传图片数组
      tourDays: "",
      isHot: false,
      marketPrice: "",
      price: "",
      traitDesc: null,
      tourDesc: null,
      startTime: "",
      endTime: "",
      tourDetDesc: "",
      tourDetDescContent:"",
      tourDetDescImage:[],
      serviceId: null,
      childHeightStatus: "",
      childAmount: "",
      childHeightName: "",
      startTimeYMD:"",
      endTimeYMD:"",
    },
    maxCount: 5,  // 最大上传图片数量
    pageUpKeyId:"",
    type:null,
    editorCtx1:"",
    richContent:""
  },
  // 修改信息数据回显
  setDataEcho() {
    global.$ajax("/uac/auth/tour/findTourProjectDetail/" + this.data.pageUpKeyId).then(res => {
        if (res.data.code == 200) {
          // console.log(res.data.result);
          let resData = res.data.result;
          var submitList = this.data.submitList;
          submitList.id = this.data.pageUpKeyId;
          submitList.typeName = resData.typeName;
          submitList.typeId = resData.typeId;
          submitList.name = resData.name;
          submitList.mainImg = resData.mainImg;
          submitList.tourDays = resData.tourDays;
          submitList.isHot = resData.isHot;
          submitList.marketPrice = resData.marketPrice;
          submitList.price = resData.price;
          submitList.childHeightStatus = resData.childHeightStatus;
          submitList.childHeightName = resData.childHeightName;
          submitList.childAmount = resData.childAmount;
          submitList.startTime = resData.startTime;
          submitList.endTime= resData.endTime;
          submitList.startTimeYMD = resData.startTime.substring(0,10);
          submitList.endTimeYMD = resData.endTime.substring(0,10);
          submitList.tourDetDesc = resData.tourDetDesc;
          submitList.tourDetDescContent = resData.tourDetDescContent || "";
          submitList.tourDetDescContent = submitList.tourDetDescContent.replace(/<br>/g, "\n");
          submitList.tourDetDescImage = resData.tourDetDescImage || "[]";
          submitList.tourDetDescImage = JSON.parse(submitList.tourDetDescImage);

          submitList.serviceId = resData.serviceId;
          var images = JSON.parse(resData.images);
          var characteristicList = JSON.parse(resData.traitDesc);
          var tripList = JSON.parse(resData.tourDesc);
          this.setData({
            submitList: submitList,
            images: images,
            characteristicList: characteristicList,
            tripList: tripList,
            richContent: submitList.tourDetDesc
          })
        }
      });
  },

  // 获取线路类型
  getFindTourTypeList() {
    global.$ajax("/uac/auth/tour/findTourTypeList", {},{ type: 'GET' }).then(res => {
      if (res.data.code == 200) {
        // console.log(res);
        this.setData({
          routeTypeList: res.data.result
        })
      }
    });
  },

  // 查看大图
  previewImg(current) {
    // this.previewImgMixin(current, [current]);
  },

  // 行程主图文件上传
  companyCoverUrl(content) {
    this.onUploadImage(
      content,
      0,
      "mainImg",
      this.$refs.fileImg1,
      this.submitList
    );
  },

  // 行程主图文件上传方法
  // 选择图片
  chooseImage() {
    let _this = this
    let user_token = global.state.token;
    tt.chooseImage({
      success: function (res) {
        console.log(res)
        for (let i = 0; i < res.tempFilePaths.length; i++) {
          tt.uploadFile({
            url: global.state.baseUrl + '/uac/auth/uploadChatImage',
            filePath: res.tempFilePaths[i],
            name: 'file',
            header: {
              "token": user_token
            },
            success: function (res) {
              console.log(res)
              if (res.statusCode == 200) {
                let data = JSON.parse(res.data);
                let img = data.result.attachmentUrl;
                var submitList = _this.data.submitList;
                submitList.mainImg = img;
                _this.setData({
                  submitList: submitList
                })
              }
            }
          })
        }
      },
    })
  },
  // 选择图片
  chooseImage2() {
    let _this = this
    let user_token = global.state.token;
    if(this.data.images.length>=5){
      tt.showToast({
        title: "小图数量大于5张，不可再上传！",
        icon: 'none'
      })
      return;
    }
    tt.chooseImage({
      success: function (res) {
        console.log(res)
        for (let i = 0; i < res.tempFilePaths.length; i++) {
          tt.uploadFile({
            url: global.state.baseUrl + '/uac/auth/uploadChatImage',
            filePath: res.tempFilePaths[i],
            name: 'file',
            header: {
              "token": user_token
            },
            success: function (res) {
              console.log(res)
              if (res.statusCode == 200) {
                let data = JSON.parse(res.data);
                let img = data.result.attachmentUrl;
                var images = _this.data.images;
                images.push(img)
                _this.setData({
                  images: images
                })
              }
            }
          })
        }
      },
    })
  },

  /**
   * js时间格式转换
   */
  addTime(m) {
    return m < 10 ? "0" + m : m;
  },
  setFormat(shijianchuo) {
    var time = new Date(shijianchuo);
    var y = time.getFullYear();
    var m = time.getMonth() + 1;
    var d = time.getDate();
    var h = time.getHours();
    var mm = time.getMinutes();
    var s = time.getSeconds();
    return `${y}-${this.addTime(m)}-${this.addTime(d)} ${this.addTime(
      h
    )}:${this.addTime(mm)}:${this.addTime(s)}`;
  },

  /**
   * 开始预定日期弹窗
   */
  chooseStarDate() {
    this.setData({
      isShowDate1:true
    })
  },
  // 开始预定日期 `确定按钮`
  confirmStarBookDate(value) {
    console.log(value)
    var submitList = this.data.submitList;
    submitList.startTime = value.detail.value + " 00:00:00";
    this.setData({
      timeStartComparison: value.detail.value + " 00:00:00",
      submitList: submitList
    })
    if (submitList.endTime == submitList.startTime) {
      tt.showToast({
        title: "开始时间与截止时间相同，请重新选择",
        icon: 'none'
      })
      submitList.startTime = "";
      this.setData({
        submitList: submitList
      })
    }
    if (
      Number.parseInt(new Date(value.detail.value).getTime()) >
      Number.parseInt(new Date(this.data.timeEndComparison).getTime())
    ) {
      tt.showToast({
        title: "开始时间大于截止时间，请重新选择",
        icon: 'none'
      })
      submitList.startTime = "";
      this.setData({
        submitList: submitList,
        timeStartComparison:""
      })
    }
  },
  // 开始预定日期 `取消按钮`
  cancelStarBookDate() {
    this.setData({
      isShowDate1 : false
    })
  },

  /**
   * 截止预定日期弹窗
   */
  chooseEndDate() {
    this.setData({
      isShowDate2: true
    })
  },
  // 截止预定日期 `确定按钮`
  confirmEndBookDate(value) {
    console.log(value)
    var submitList = this.data.submitList;
    submitList.endTime = value.detail.value + " 00:00:00";
    this.setData({
      timeEndComparison: value.detail.value + " 00:00:00",
      submitList: submitList
    })
    if (submitList.endTime == submitList.startTime) {
      tt.showToast({
        title: "截止时间与开始时间相同，请重新选择",
        icon: 'none'
      })
      submitList.endTime = "";
      this.setData({
        submitList: submitList,
        timeEndComparison: ""
      })
    }
    if (
      Number.parseInt(new Date(value.detail.value).getTime()) <
      Number.parseInt(new Date(this.data.timeStartComparison).getTime())
    ) {
      tt.showToast({
        title: "截止时间小于开始时间，请重新选择",
        icon: 'none'
      })
      submitList.endTime = "";
      this.setData({
        submitList: submitList
      })
    }
  },
  // 截止预定日期 `取消按钮`
  cancelEndBookDate() {
    this.setData({
      isShowDate2 :false
    })
  },

  // 线路类型选择
  toChooseRoute(event) {
    let index = Number(event.detail.value)
    var d = this.data.routeTypeList[index];
    var submitList = this.data.submitList;
    submitList.typeId = d.id;
    submitList.typeName = d.name;
    this.setData({
      submitList:submitList
    })
  },
  // 线路名称
  submitName(event){
    console.log(event)
    var submitList = this.data.submitList;
    submitList.name = event.detail.value;
    this.setData({
      submitList: submitList
    })
  },
  // 线路类型选择弹窗
  toShow() {
    this.setData({
      show: true
    })
  },

  //上传产品小图 `删除`
  delete_img(ind) {
    var images = this.data.images;
    images.splice(ind, 1);
    this.setData({
      images : images
    })
  },

  // 点击选择图片
  uploadImg() {
    document.getElementById("upload_file").click();
  },

  //上传图片的请求
  fileChange(content) {
    // this.onUploadImage(content, 1, this.images, this.$refs.fileImg2);
  },

  // 行程天数
  onInputChange1(e) {
    var submitList = this.data.submitList;
    submitList.tourDays = e.detail.value.replace(/[^\d]/g, "");
    this.setData({
      submitList: submitList
    })
    if (e.detail.value == "" || e.detail.value == 0) {
      this.setData({
        tripList : [{ children: [{ time: "" }], content: "" }]
      })
    }
  },
//热门
  onChange(){
    var submitList = this.data.submitList;
    submitList.isHot = !submitList.isHot;
    this.setData({
      submitList: submitList
    })
  },
  // 原价
  onInputChange2(e) {
    var submitList = this.data.submitList;
    submitList.marketPrice = e.detail.value.replace(/[^\d]/g, "");
    this.setData({
      submitList: submitList
    })
  },

  // 现价
  onInputChange3(e) {
    var submitList = this.data.submitList;
    submitList.price = e.detail.value.replace(/[^\d]/g, "");
    this.setData({
      submitList: submitList
    })
  },

  // 儿童身高价格
  onInputChange4(e) {
    var submitList = this.data.submitList;
    submitList.childAmount = e.detail.value.replace(/[^\d]/g, "");
    this.setData({
      submitList: submitList
    })
  },
  childHeightPopuptrue() {
    this.setData({
      childHeightPopup: true
    })
  },
  // 儿童身高选择
  onchildHeightSel(data) {
    let index = data.detail.value;
    var submitList = this.data.submitList;
    submitList.childHeightName = this.data.childHeighList[index].name;
    submitList.childHeightStatus = this.data.childHeighList[index].status;
    console.log(submitList)
    this.setData({
      submitList: submitList
    })
  },

  // 添加更多产品特色
  addOneMoreProductSpecial() {
    var characteristicList = this.data.characteristicList;
    characteristicList.push({ content: "" });
    this.setData({
      characteristicList: characteristicList
    })
  },

  // 删除更多产品特色
  deleteOneMoreProductSpecial(index) {
    var characteristicList = this.data.characteristicList;
    characteristicList.splice(index, 1);
    this.setData({
      characteristicList: characteristicList
    })
  },

  // 添加更多行程介绍
  toAddOneMoreTripContent() {
    var tripList = this.data.tripList;
    tripList.push({
      children: [{ time: "" }],
      content: ""
    });
    this.setData({
      tripList: tripList
    })
  },

  // 删除更多行程介绍
  deleteOneMoreTripIntro(index) {
    var tripList = this.data.tripList;
    tripList.splice(index, 1);
    this.setData({
      tripList: tripList
    })
  },
  psChange(event) {
    console.log(event)
    var index = event.currentTarget.dataset.index;
    var characteristicList = this.data.characteristicList;
    characteristicList[index].content = event.detail.value;
    this.setData({
      characteristicList: characteristicList
    })
  },
  icChange1(event) {
    console.log(event)
    var index = event.currentTarget.dataset.index;
    var tripList = this.data.tripList;
    tripList[index].children[0].time = event.detail.value;
    this.setData({
      tripList: tripList
    })
  },
  icChange2(event) {
    console.log(event)
    var index = event.currentTarget.dataset.index;
    var tripList = this.data.tripList;
    tripList[index].content = event.detail.value;
    this.setData({
      tripList: tripList
    })
  },
  //富文本
  // 富文本相关的函数
  onEditorReady1() { //1
    const that = this
    this.createSelectorQuery().select('#editor1').context(function (res) {
      console.log(that.data.richContent )
      that.data.editorCtx1 = res.context
      if (that.data.richContent == "" || that.data.richContent==null){

      }else{
        that.data.editorCtx1.setContents({ html: that.data.richContent }) // 注意：插入的是对象
      }
    }).exec()
  },
  blur1(e) { //1
    let html = e.detail.html
    let delta = e.detail.delta
    console.log(html)
    console.log(delta)
    var submitList = this.data.submitList;
    submitList.tourDetDesc = html
    this.setData({
      submitList: submitList
    })
    this.data.editorCtx1.blur()
  },
  //样式设置的部分
  format1(e) { //1
    console.log(e)
    let { name, value } = e.target.dataset
    if (!name) return
    // console.log('format', name, value)
    console.log(this)
    this.data.editorCtx1.format(name, value)

  },
  onStatusChange1(e) { //1
    console.log(this.data.editorCtx1)
    const formats = e.detail
    this.setData({ formats })
  },
  insertImage1() { //1
    const that = this
    let user_token = global.state.token;
    tt.chooseImage({
      count: 1,
      success: function (res) {
        tt.uploadFile({
          url: global.state.baseUrl + '/uac/auth/uploadChatImage',
          filePath: res.tempFilePaths[0],
          name: 'file',
          header: {
            "token": user_token
          },
          success: function (res) {
            console.log(res)
            if (res.statusCode == 200) {
              let data = JSON.parse(res.data);
              let img = data.result.attachmentUrl;
              that.data.editorCtx1.insertImage({
                src: img,
                data: {
                  id: 'abcd',
                  role: 'god'
                },
                // width: '100%',
                success: function () {
                  console.log('insert image success')
                }
              })
            }
          }
        })
      }
    })
  },
  onTextInput(e){
    let submitList = this.data.submitList
    submitList.tourDetDescContent = e.detail.value
    this.setData({
      submitList: submitList
    });
  },
  // 选择图片
    chooseImage5() {
      let _this = this
      let user_token = global.state.token;
      tt.chooseImage({
        success: function (res) {
          console.log(res)
          for (let i = 0; i < res.tempFilePaths.length; i++) {
            tt.uploadFile({
              url: global.state.baseUrl + '/uac/auth/uploadChatImage',
              filePath: res.tempFilePaths[i],
              name: 'file',
              header: {
                "token": user_token
              },
              success: function (res) {
                console.log(res)
                if (res.statusCode == 200) {
                  let data = JSON.parse(res.data);
                  let img = data.result.attachmentUrl;
                  _this.data.submitList.tourDetDescImage.push(img)
                  _this.setData({
                    submitList: _this.data.submitList
                  })
                }
              }
            })
          }
        },
      })
    },
    removeImage5(event){
      let index = event.currentTarget.dataset.index;
      let submitList = this.data.submitList
      submitList.tourDetDescImage.splice(index, 1)
      this.setData({
        submitList: submitList
      })
    },
  // 发布按钮点击
  onRelease() {
    var that = this;
    tt.showModal({
      title: '确认提交',
      content: '确认提交该旅游信息？',
      showCancel: true,//是否显示取消按钮
      success: function (res) {
        if (res.cancel) {
          //点击取消,默认隐藏弹框
        } else {
          that.onRelease2()
        }
      },
      fail: function (res) {
      }//接口调用失败的回调函数
    })
  },
  // 发布按钮执行
  onRelease2() {
    var submitList = this.data.submitList;
    let isProductSpecial,
      isTripIntroduce,
      isTripListRoad = false;
    this.data.characteristicList.map(item => {
      if (item.content != "") {
        isProductSpecial = false;
      } else {
        isProductSpecial = true;
      }
    });
    this.data.tripList.map((item, index) => {
      item.children.map((val, key) => {
        val.time != "" ? (isTripIntroduce = false) : (isTripIntroduce = true);
      });
      item.content != "" ? (isTripListRoad = false) : (isTripListRoad = true);
    });
    
    // submitList.tourDetDesc = "<p>123</p>"
    if (submitList.typeId == "") {
      tt.showToast({
        title: "请选择线路类型",
        icon: 'none'
      })
    } else if (submitList.name == "") {
      tt.showToast({
        title: "请输入线路名称",
        icon: 'none'
      })
    } else if (submitList.mainImg == "") {
      tt.showToast({
        title: "请上传行程主图",
        icon: 'none'
      })
    } else if (this.data.images.length <= 0) {
      tt.showToast({
        title: "请上传产品小图(最多上传5张)",
        icon: 'none'
      })
    } else if (submitList.tourDays == "") {
      tt.showToast({
        title: "请输入行程天数",
        icon: 'none'
      })
    } else if (submitList.tourDays == 0) {
      tt.showToast({
        title: "行程天数不能为0天",
        icon: 'none'
      })
    } else if (submitList.marketPrice == "") {
      tt.showToast({
        title: "请输入原价",
        icon: 'none'
      })
    } else if (submitList.price == "") {
      tt.showToast({
        title: "请输入现价",
        icon: 'none'
      })
    } else if (submitList.childHeightStatus == "") {
      tt.showToast({
        title: "请选择儿童身高",
        icon: 'none'
      })
    } else if (submitList.childAmount == "") {
      tt.showToast({
        title: "请输入儿童身高价格",
        icon: 'none'
      })
    } else if (submitList.startTime == "") {
      tt.showToast({
        title: "请选择开始预定日期",
        icon: 'none'
      })
    } else if (submitList.endTime == "") {
      tt.showToast({
        title: "请选择截止预定日期",
        icon: 'none'
      })
    } else if (isProductSpecial == true) {
      tt.showToast({
        title: "请输入产品特色",
        icon: 'none'
      })
    } else if (isTripIntroduce == true) {
      tt.showToast({
        title: "请输入行程时间：如第一天，以此类推",
        icon: 'none'
      })
    } else if (isTripListRoad == true) {
      tt.showToast({
        title: "请输入行程内容介绍",
        icon: 'none'
      })
    } else if (submitList.tourDetDescContent == "") {
      tt.showToast({
        title: "请输入图文详情",
        icon: 'none'
      })
    } else {
      submitList.tourDetDesc = "<p>"+submitList.tourDetDescContent.replace(/\n/g, "</p><p>")+"</p>"
      for(let a=0;a<submitList.tourDetDescImage.length;a++){
        submitList.tourDetDesc += "<img src='" + submitList.tourDetDescImage[a] +"' />"
      }
      submitList.tourDetDescContent = submitList.tourDetDescContent.replace(/\n/g, "<br>")
      submitList.tourDetDescImage = JSON.stringify(this.data.submitList.tourDetDescImage);
      submitList.traitDesc = JSON.stringify(this.data.characteristicList);
      submitList.tourDesc = JSON.stringify(this.data.tripList);
      submitList.images = JSON.stringify(this.data.images);
      console.log(submitList)
      global.$ajax('/uac/auth/tour/saveTourProjectInfo', submitList, { type: 'POST' })
        .then(res => {
        if (res.data.code == 200) {
          // console.log(res);
          this.data.type == "edit"
            ? tt.showToast({
              title: "修改成功",
              icon: 'none'
            })
            : tt.showToast({
              title: "发布成功，等待管理员审核",
            icon: 'none'
          });
          setTimeout(function(){
            tt.navigateBack({
            })
          },1000)
        }
      });
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var submitList = this.data.submitList;
    console.log(options)
    if (options.type == 'edit') {
      this.setData({
        pageUpKeyId: options.pid,
        type:"edit"
      })
      this.setDataEcho();
    }else{
      submitList.serviceId = options.cid;
      this.setData({
        submitList: submitList,
        richContent:""
      })
    }
    this.getFindTourTypeList();
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