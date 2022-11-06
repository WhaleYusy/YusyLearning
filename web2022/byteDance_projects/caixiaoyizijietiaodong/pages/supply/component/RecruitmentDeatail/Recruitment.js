// pages/supply/component/Recruitment/Recruitment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    companyInfo: {},
    swiperList:[],
    param:{}
  },
  addCircleFriend(){
    tt.navigateTo({
      url: '/pages/chatDetails/chatDetails?userId=' + this.data.param.userId + '&shopLogo=' + this.data.param.shopLogo + '&sendName=' + this.data.param.sendName
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var param = JSON.parse(options.param)
    this.setData({
      param: param
    })
    global.$ajax(`/uac/auth/wx/common/findTalentRecruitment/${param.id}`).then((res) => {
      if (res.data.code == 200) {
        this.setData({
          companyInfo: res.data.result
        })
        let ond = this.data.companyInfo;
        if (ond.content != null && ond.content != "") {
          if (ond.content.indexOf("<img") > -1) {
            ond.content = ond.content.replace(/<img/g, '<img style="width:100%;height:auto" ') //防止富文本图片过大
          }
          if (ond.content.indexOf("<p") > -1) {
            ond.content = ond.content.replace(/<p/g, '<p style="word-break: break-all; " ') //防止不换行
          }
        }
        console.log(ond.content)
        if (ond.jobRemark != null && ond.jobRemark != "") {
          if (ond.jobRemark.indexOf("<img") > -1) {
            ond.jobRemark = ond.jobRemark.replace(/<img/g, '<img style="width:100%;height:auto" ') //防止富文本图片过大
          }
          if (ond.jobRemark.indexOf("<p") > -1) {
            ond.jobRemark = ond.jobRemark.replace(/<p/g, '<p style="word-break: break-all; " ') //防止不换行
          }
        }
        console.log(ond.jobRemark)
        this.setData({
          companyInfo: ond
        })
      }
    })
    global.$ajax(`/uac/auth/wx/common/findHomeSwiperInfoList`,{},{type:'get'}).then((res) => {
      console.log(res)
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