// pages/service/component/common/common.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    showNoMore:false,
    pageSize:10,
    pageNum:1,
    dataList:[]
  },
  getDetail() {
    //companyId
    ////uac/auth/wx/common/findFacilitatorInfoListByFacilitatorTypeId
    global.$ajax('/uac/auth/wx/common/findFacilitatorInfoListByFacilitatorTypeId', { facilitatorTypeId: this.data.id,pageSize:this.data.pageSize,pageNum:1}).then(res => {
      console.log(res)
      let arr = JSON.parse(JSON.stringify(this.data.dataList))
      arr = arr.concat(res.data.result.list)
      console.log(arr)
      if(res.data.code == 200){
        console.log(1)
        this.setData({
          dataList: arr,
          total: Number(res.data.result.total)
        })
      }
      if (this.data.dataList.length == this.data.total || res.data.result.list.length<= this.data.pageSize){
        this.setData({
          showNoMore:true
        })
      }
    }).catch(err => {

    })
  },
  selectType(e){
    //去供应商详情
    let id = e.currentTarget.dataset.id
    tt.navigateTo({
      url: '/pages/supply/component/supplyDetail/supplyDetail?id=' + id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      id:options.id
    })
    this.getDetail();
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
        pageNum:this.data.pageNum + 1
      })
      this.getDetail()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})