// pages/purchase/component/mertialNeed/mertialNeed.js
var filter = require("../../../../utils/filter.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    purchaseProductlist: [
      
    ],
    imgUrls: [],
    showNoMore: false,
    total: 0,
    requestData: {
      pageSize: 10,
      pageNum: 1,
    },

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
  getAdList() {
    global.$ajax('/uac/auth/wxAdver/getAdverListByType', { type: 1 }, { type: 'POST' }).then(res => {
      this.setData({
        imgUrls: res.data.result
      })
    }).catch(res => {

    })
  },
  loadData(){
    tt.showLoading({
      title:"加载中..."
    })
    global.$ajax('/uac/auth/wx/common/materialDeamndHome2', this.data.requestData, { type: 'POST' }).then((res) => {
      let arr = JSON.parse(JSON.stringify(this.data.purchaseProductlist))
      if (res.data.code == 200) {
        if (res.data.result.list.length > 0) {
          arr = arr.concat(filter.purchaseListFd(res.data.result.list))
          this.setData({
            purchaseProductlist: arr,
            total: Number(res.data.result.count)
          })
          tt.hideLoading()
          if (this.data.total == this.data.purchaseProductlist.length || res.data.result.list.length == 0 ) {
            this.setData({
              showNoMore: true
            })
          }
        } else {
          //没有更多
          this.setData({
            showNoMore: true
          })
        }
        tt.hideLoading()
      }
    }).catch(err => {

    })
  },
  goPage(e){
    //去到物料需求的详情页面
    let item = e.currentTarget.dataset.item
    tt.navigateTo({
      url: '/pages/purchase/component/mertialNeed/metialNeddDetail/metialNeddDetail?id='+item.id
    })
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadData();
    this.getAdList();
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
    if (!this.data.showNoMore) {
      this.data.requestData.pageNum += 1
      this.setData({
        requestData: this.data.requestData
      })
      this.loadData();
    } else {
      console.log("已经没有更多了")
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})