// pages/supply/component/supplyDetail/supplyDetail.js
var filter = require("../../../../utils/filter.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeType:1,
    selectBarList: [
      { name: "产品服务", path: "/supplyCircleDetail/productService" },
      { name: "微官网", path: "/supplyCircleDetail/companyHome" },
      { name: "企业动态", path: "/supplyCircleDetail/businessMovement" },
      { name: "人才招聘", path: "/supplyCircleDetail/talentRecruitment" }
    ],
    companyInfo: {},
    companyId:'',
    pageNum: 1,
    dynamicList:[],
    total:null,
    datasList:[],
    lyparam : {
      serviceId: '',
      pageNum: 1,
      pageSize: 10
    },
    loadMoreStatus:1,  //旅游管理数量更多
    imageSavePath:""
  },
  
  selectType(e){
    //选择tab
    let index = e.currentTarget.dataset.index
    if (index == this.data.activeType){return}
    this.setData({
      activeType:index,
      pageNum: 1,
      dynamicList: [],
      total: null
    })
    if (this.data.activeType == 2){
      this.getCompanyDynamic()
    }
    if (this.data.activeType == 3){
      this.getTalentRecruitmentBySupplierId()
    }
  },
  // 获取旅游产品服务列表
  getSupplyCircleDetail() {
    global.$ajax("/uac/auth/tour/findTourProjectListByServiceId", this.data.lyparam).then(res => {
      if (res.data.code == 200) {
        var datasList = this.data.datasList.concat(res.data.result.list);
        this.setData({
          datasList: datasList
        })
        console.log(datasList)
        if (datasList.length == res.data.result.total) {
          this.setData({
            loadMoreStatus:0
          })
        }
      }
    })
  },
  // 获取企业动态列表
  getCompanyDynamic() {
    let listParam = {
      pageNum: this.data.pageNum,
      pageSize: 10,
      supplierId: this.data.companyId
    }
    global.$ajax("/uac/auth/wx/common/getCompanyDynamicBySupplierId", listParam ).then(res => {
      if (res.data.code == 200) {
        let newList = this.data.dynamicList;
        res.data.result.companyDynamicInfo.list.map(item => {
          newList.push({
            logo: item.logo == null ? res.data.result.mdcSupplier.logo : item.logo,
            title: item.title == null ? res.data.result.mdcSupplier.supplierName : item.title,
            createdTime: item.createdTime == null ? res.data.result.mdcSupplier.createdTime : item.createdTime,
            companyDynamic: item.companyDynamic == null ? "" : item.companyDynamic,
            companyDynamicContent: item.companyDynamicContent == null ? "" : item.companyDynamicContent,
            companyDynamicImage: item.companyDynamicImage == null ? "" : item.companyDynamicImage,
            id: item.id,
            supplierId: this.data.companyId
          })
        })
        this.setData({        
          dynamicList: newList,
          total: res.data.result.companyDynamicInfo.total
        })        
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var lyparam = this.data.lyparam;
    lyparam.serviceId = options.id;
    this.setData({
      companyId: options.id,
      lyparam: lyparam
    })
    this.getCompanyInfo()
    this.getSupplyCircleDetail()
    // this.getDetail()
    this.getXcxCode(this.data.companyId)
  },
  //组件刷新方法
  returnOnload: function(){
    this.getCompanyInfo();
  },
  // 获取供应商信息
  getCompanyInfo(){
    tt.showLoading({
      title:'加载中...'
    })
    global.$ajax(`/uac/auth/wx/common/querySupplierInfoById/${this.data.companyId}`).then((res)=>{
      if (res.data.code == 200){
        this.setData({
          companyInfo: res.data.result 
        })
        let companyInfoNew = this.data.companyInfo
        companyInfoNew.operateProducesStr = filter.formatProxyBrandStr(companyInfoNew.operateProducesStr)
        this.setData({
          companyInfo: companyInfoNew
        })
        tt.hideLoading()
      }
    })
  },
  // 获取人才招聘列表
  getTalentRecruitmentBySupplierId() {
    let listParam = {
      pageNum: this.data.pageNum,
      pageSize: 10,
      supplierId: this.data.companyId
    }
    global.$ajax("/uac/auth/wx/common/getTalentRecruitmentBySupplierId", listParam ).then(res => {
      if (res.data.code == 200) {
        this.setData({
          dynamicList: this.data.dynamicList.concat(res.data.result.pageInfo.list),
          total: res.data.result.pageInfo.total
        })
      }
    })
  },
  // 点赞
  likeCout() {
    global.$ajax(`/uac/auth/wx/common/dainzan/${this.data.companyId}`)
      .then(res => {
        if (res.data.code === 200) {
          if (res.data.result != "您已点赞过了") {
            let likeCount = null;
            res.data.result >= 10000
              ? (likeCount = `${res.data.result / 10000}万+`)
              : (likeCount = res.data.result);
            this.data.companyInfo.likeCount = likeCount;
            this.setData({
              companyInfo: this.data.companyInfo
            })
            let companyInfoNew = this.data.companyInfo
            companyInfoNew.operateProducesStr = filter.formatProxyBrandStr(companyInfoNew.operateProducesStr)
            this.setData({
              companyInfo: companyInfoNew
            })
            tt.showToast({
              title: '点赞成功',
              icon:'none'
            })
          } else {
            tt.showToast({
              title: res.data.result,
              icon: 'none'
            })
          }
        }
      });
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
    if (this.data.activeType == 2 && (this.data.dynamicList.length != this.data.total)  ) {
      this.setData({
        pageNum: this.data.pageNum + 1
      })
      this.getCompanyDynamic()
    }
    if (this.data.activeType == 3 && (this.data.dynamicList.length != this.data.total)  ) {
      this.setData({
        pageNum: this.data.pageNum + 1
      })
      this.getTalentRecruitmentBySupplierId()
    }
  },

  getXcxCode(id) {
    global.$ajax(`/uac/auth/wx/getSupplierShare`, { id: id }, { type: 'GET' }).then(res => {
      console.log(res)
      if (res.data.code == 200) {
        this.setData({
          imageSavePath: res.data.result.attachmentUrl
        })
      }
    });
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    let that = this
    let titleName = this.data.companyInfo.supplierName || '采销更容易，爱上【采销易】'
    let sharePath = "pages/supply/component/supplyDetail/supplyDetail?id=" + this.data.companyId
    let userId = wx.getStorageSync('userInfo') != '' ? JSON.parse(wx.getStorageSync('userInfo')).userId : ''
    sharePath = sharePath + "&pid=" + userId;
    let message = {
      title: titleName,
      desc: titleName,
      path: sharePath,
      imageUrl: this.data.imageSavePath
    }
    console.log(message)
    return message
  }
})