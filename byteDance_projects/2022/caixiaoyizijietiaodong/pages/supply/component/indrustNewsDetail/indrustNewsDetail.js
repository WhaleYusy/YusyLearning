// pages/supply/component/indrustNewsDetail/indrustNewsDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    html:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    global.$ajax(`/uac/auth/wx/common/getCompanyDynamicById/${options.id}`).then((res)=>{
      if (res.data.code == 200){
        this.setData({
          html: res.data.result
        })
        let ond = this.data.html;
        if (ond.companyDynamic != null && ond.companyDynamic != "") {
          if (ond.companyDynamic.indexOf("<img") > -1) {
            ond.companyDynamic = ond.companyDynamic.replace(/<img/g, '<img style="width:100%;height:auto" ') //防止富文本图片过大
          }
          if (ond.companyDynamic.indexOf("<p") > -1) {
            ond.companyDynamic = ond.companyDynamic.replace(/<p/g, '<p style="word-break: break-all; " ') //防止不换行
          }
        }
        console.log(ond.companyDynamic)
        this.setData({
          html: ond
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