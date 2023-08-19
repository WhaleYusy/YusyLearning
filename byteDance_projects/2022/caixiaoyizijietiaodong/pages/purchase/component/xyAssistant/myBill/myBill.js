// pages/purchase/component/xyAssistant/myBill/myBill.js
var filter = require("../../../../../utils/filter.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    noMore: false,
    loadMore: false,
    active: "1",
    pageNum: 1,
    pageSize: 10,
    activeList: [],
    total: 0,
    showNoMore: false
  },
  // 切换我的账单模块，显示数据
  ontabActive: function(event){
    var active = event.currentTarget.dataset.active;
    // if (active1 == active2){
    //   return;
    // }
    this.setData({
      pageNum: 1,
      active: active,
      showNoMore: false,
      activeList: []
    })
    if (this.data.active == 1) {
      this.findBillInfoList()
    } 
    else if (this.data.active == 2){
      this.findBillInfoListByMonth()
    }
    else if (this.data.active == 3) {
      this.findIncomeInfoList()
    } 
    else {
      this.findOutComeInfoList()
    }
  },
  findBillInfoList() {
    //账单明细
    global.$ajax('/uac/auth/wx/common/findBillInfoList', { pageNum: this.data.pageNum, pageSize: this.data.pageSize }, { type: 'POST' }).then(res => {
      let arr = JSON.parse(JSON.stringify(this.data.activeList))
      if (res.data.code == 200) {
        arr = arr.concat(filter.getTypeNameFd(res.data.result.list))
        this.setData({
          activeList: arr,
          total: Number(res.data.result.total)
        })
        if (this.data.activeList.length == res.data.result.total || res.data.result.total == 0) {
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
  findBillInfoListByMonth() {
    //月度汇总
    global.$ajax('/uac/auth/wx/common/findBillInfoListByMonth', { pageNum: this.data.pageNum, pageSize: this.data.pageSize }, { type: 'POST' }).then(res => {
      let arr = JSON.parse(JSON.stringify(this.data.activeList))
      if (res.data.code == 200) {
       arr = arr.concat(filter.getTypeNameFd(res.data.result.list))
        this.setData({
          activeList: arr,
          total: Number(res.data.result.total)
        })
        if (this.data.activeList.length == res.data.result.total || res.data.result.total == 0) {
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
  findIncomeInfoList() {
    //收入明细
    global.$ajax('/uac/auth/wx/common/findIncomeInfoList', { pageNum: this.data.pageNum, pageSize: this.data.pageSize }, { type: 'POST' }).then(res => {
      let arr = JSON.parse(JSON.stringify(this.data.activeList))
      if (res.data.code == 200) {
      arr = arr.concat(filter.getTypeNameFd(res.data.result.list))
        this.setData({
          activeList: arr,
          total: Number(res.data.result.total)
        })
        if (this.data.activeList.length == res.data.result.total || res.data.result.total == 0) {
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
  findOutComeInfoList() {
    //支出明细
    global.$ajax('/uac/auth/wx/common/findOutComeInfoList', { pageNum: this.data.pageNum, pageSize: this.data.pageSize }, { type: 'POST' }).then(res => {
      let arr = JSON.parse(JSON.stringify(this.data.activeList))
      if (res.data.code == 200) {
        arr = arr.concat(filter.getTypeNameFd(res.data.result.list))
        this.setData({
          activeList: arr,
          total: Number(res.data.result.total)
        })
        if (this.data.activeList.length == res.data.result.total || res.data.result.total == 0) {
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
  isType(type) {
    
  },
  // 返回小易助手主页
  rLastPage: function () {
    tt.navigateBack({
      delta: 1
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.findBillInfoList()
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
    this.setData({
      dataList: [],
      noMore: false,
      loadMore: false,
      pageNum: 1
    })
    if (this.data.active == 1) {
      this.findBillInfoList()
    }
    else if (this.data.active == 2) {
      this.findBillInfoListByMonth()
    }
    else if (this.data.active == 3) {
      this.findIncomeInfoList()
    }
    else if (this.data.active == 4) {
      this.findOutComeInfoList()
    }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.total !== this.data.activeList && !this.data.noMore) {
      this.setData({
        pageNum: this.data.pageNum + 1
      })
      if (this.data.active == 1) {
        this.findBillInfoList()
      }
      else if (this.data.active == 2) {
        this.findBillInfoListByMonth()
      }
      else if (this.data.active == 3) {
        this.findIncomeInfoList()
      }
      else if (this.data.active == 4) {
        this.findOutComeInfoList()
      }
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})