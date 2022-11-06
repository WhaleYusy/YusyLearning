// pages/purchase/component/mertialNeed/getContactDetail/getContactDetail.js
const img = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1573469708481&di=a5aa2e25ae8a426b5c1b783fae73db15&imgtype=0&src=http%3A%2F%2Fimg.taopic.com%2Fuploads%2Fallimg%2F140822%2F235037-140R206164886.jpg'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    latitude: "",
    longitude: "",
    imgUrls: [],
    dataList: {
      biCountShow: "", //用于显示不同等级用户需要支付的原积分
      biCount: "", //用于提交的积分
      id: "",
      classId: ""
    },
    userInfo:{
      freeDemandCount:'',
      bi:''
    },
    getContact:false,
    companyList:[
      // {logo:img,view:233,fans:233,like:300,address:'深圳市龙岗区坪地街道3487活动较少dhjshdu39483hfdhjwkhd83y498',supply:"LED驱动电源，智能驱动，智能电源"}
    ],
    requestData: {
      pageNum: 1,
      pageSize: 3,
      classId: "",
      latitude: null,
      longitude: null
    },
  },
  getAdList() {
    global.$ajax('/uac/auth/wxAdver/getAdverListByType',{ type: 2 },{type:'POST'}).then(res=>{ 
      console.log("轮播图图片");
      console.log(res.data);
      console.log(res.data.result);
      if (res.data.code === 200) {
      this.setData({
        imgUrls: res.data.result
      })
      }
    }).catch(res => {

    })
  },
  imgView(e) {
    console.log(e)
    var img = [];
    img.push(e.currentTarget.dataset.img)
    wx.previewImage({
      urls: img
    })
  },
  getConcat(){
    this.setData({
      getContact:true
    })
  },
  like(){
    console.log("喜欢")
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
  onGoTo(){
    //去购买积分
    wx.navigateTo({
      url: '/pages/purchase/component/xyAssistant/investCashout/investCashout'
    })
  },
  toSupplyDetail(e) {
    //去供应详情
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/supply/component/supplyDetail/supplyDetail?id='+id
    })
  },
  // 获取会员等级(2019.08.13，根据需求，统一修改成10积分一次)
  getVip() {
    global.$ajax("/uac/auth/wx/common/findUserInfo", {},{type:'POST'}).then(res => {
      console.log('打印userInfo');
      console.log(res.data.result);
      this.setData({
        userInfo: res.data.result || {}
      })
      console.log(this.data.userInfo)
      if (res.data.code == 200) {
        switch (Number.parseInt(res.data.result.userLevelId)) {
          case 1:
            this.data.dataList.biCount = 10;
            this.data.dataList.biCountShow = 10;
            break;
          case 3:
            this.data.dataList.biCount = 10;
            this.data.dataList.biCountShow = 10;
            break;
          case 5:
            this.data.dataList.biCount = 10;
            this.data.dataList.biCountShow = 10;
            break;
          case 6:
            this.data.dataList.biCount = 10;
            this.data.dataList.biCountShow = 10;
        }
        this.setData({
          dataList:this.data.dataList
        })
      }
    });
  },
  //打赏按钮
  onGiveReward() {
    this.setData({
      dataList: this.data.dataList
    })
    global.$ajax("/uac/auth/wx/common/getReward", this.data.dataList,{type:'POST'}).then(res => {
      if (res.data.result.code == -2) {
        wx.showToast({
          title: res.data.result.msg,
          icon: 'none'
        })
        // this.$emit("close", res.data.result.code);
        setTimeout(() => {
          //积分不足，跳转充值积分
          wx.navigateBack();
        }, 1000)
      } else {
        wx.showToast({
          title: res.data.result.msg,
          icon: 'none'
        })
        this.getDetail()
        // this.$emit("close", res.data.result.code);
        //打赏完了不跳转回去 2019-12-07
        // setTimeout(() => {
        //   wx.navigateBack({})
        // }, 1000)
      }
    })
      .catch(res => {
        wx.showToast({
          title: res.data.message,
          icon: 'none'
        })
      });
  },
  phoneCall(e){
    let that = this
    let number = e.currentTarget.dataset.number
    console.log(that.data.userInfo.telephone)
    wx.makePhoneCall({
      phoneNumber: number
    })
  },
  clip(e){
    let data = e.currentTarget.dataset.content
    wx.setClipboardData({
      data: data,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            wx.showToast({
              title: '复制成功'
            })
          }
        })
      }
    })
  },
  chat(){
    //直接聊天
    let item = this.data.companyInfo
    console.log(this.data.companyInfo)
    console.log(item.id)
    console.log(item.nickName)
    console.log(item.userPic)
    wx.navigateTo({
      url: '/pages/chatDetails/chatDetails?userId=' + item.uid + '&shopLogo=' + item.userPic + '&sendName=' + item.nickName
    })
  },
  //获取供应商用列表
  getList() {
    wx.showLoading({
      title: '加载中...',
      mask:false
    })
    let _this = this;
    // _this.requestData.pageNum++;
    global.$ajax("/uac/auth/wx/common/findSupplierInfoList2", _this.data.requestData,{type:'POST'})
      .then(res => {
        // console.log(res);
        let arr = JSON.parse(JSON.stringify(this.data.companyList))
        if (res.data.code == 200) {
          let old = arr.concat(res.data.result.list)
          this.setData({
            companyList:old
          })          
          wx.hideLoading()
        }
      });
  },
  getDetail(id) {
    id = this.data.dataList.id
    wx.showLoading({
      title: '加载中...',
      mask: false
    })
    setTimeout(() => {
      wx.hideLoading()
    }, 300);
    global.$ajax(`/uac/auth/wx/common/findMaterialDemandInfo/${id}`, {}, { type: 'POST' })
      .then(res => {
        console.log(res.data);
        if (res.data.code == 200) {
          let temArr = JSON.parse(res.data.result.fileAddress)
          console.log(temArr)
          this.setData({
            companyInfo: res.data.result,
            fileAddressList: temArr
          })
          if (this.data.companyInfo.reward == 0){
            this.setData({
              getContact:false
            })
          }else{
            this.setData({
              getContact: true
            })
          }
          let resData = res.data.result;
          console.log(resData)
          let arr = [
            resData.phone,
            resData.qqNumber,
            resData.wxNumber,
            resData.email
          ];
          let strArr = ['手机号', 'QQ号', '微信号', '邮箱']
          let temArr2 = []
          arr.map((item, key) => {
            console.log(key)
            console.log(strArr[key])
            temArr2.push({
              key: strArr[key],
              value: item
            });
          });
          this.setData({
            callList: temArr2
          })
        }
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    console.log("参数")
    console.log(options)
    this.data.dataList.classId = options.classId;
    this.data.requestData.classId = options.classId;
    this.data.dataList.id = options.id;
    this.getVip();
    // this.getList();//供应商列表
    this.getDetail();
    this.getQrcode();
    this.getAdList();//广告轮播图

    wx.getLocation({
      type: 'gcj02',
      success(res) {
        let requestData = that.data.requestData;
        requestData.latitude = res.latitude;
        requestData.longitude = res.longitude;
        that.setData({
          requestData: requestData
        })
      },
      complete() {
        that.getList();
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
    this.getAdList();//广告轮播图
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