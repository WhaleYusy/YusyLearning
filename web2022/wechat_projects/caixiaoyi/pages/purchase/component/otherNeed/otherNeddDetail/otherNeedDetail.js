// pages/purchase/component/otherNeed/otherNeddDetail/otherNeedDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swperInfoList:[],
    otherNeedDetail: {
      // title:'招聘文员',comName:'深圳市鑫铭五金有限公司',num:12,salary:'6k-7k',imgUrl:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1573533799897&di=383ca378e45a8824d8a7c19e1c8046ac&imgtype=0&src=http%3A%2F%2Fdpic.tiankong.com%2Fuz%2F6n%2FQJ6212259237.jpg',address:'深圳市坪山区坑新街道新桥路78679790790',product:'非标螺丝、螺旋、垫片798798769798698698',require:'限女性，20-45岁',shouldDo:'详情咨询：18945698869'
      },
  },

  getSwiperInfoList(){
    global.$ajax('/uac/auth/wx/common/findHomeSwiperInfoList',{},{type:'GET'}).then(res=>{
      console.log(res)
      console.log(res.data.result)
      this.setData({
        swperInfoList:res.data.result
      })
    }).catch(err=>{
      console.log(err)
    })
  },
  //详情
  getFindOtherDemandDetail() {
    global.$ajax(
        `/uac/auth/wx/demand/findOtherDemandDetail/${this.data.id}`,{},{type:'POST'}
      )
      .then(res => {
        // console.log(res);
        if (res.data.code == 200) {
          this.setData({
            otherNeedDetail: res.data.result
          })
          let ond = this.data.otherNeedDetail;
          if (ond.jobRemark != null && ond.jobRemark != "") {
            if (ond.jobRemark.indexOf("<img") > -1) {
              ond.jobRemark = ond.jobRemark.replace(/<img/g, '<img style="width:100%;height:auto" ') //防止富文本图片过大
            } 
            if (ond.jobRemark.indexOf("<p") > -1) {
              ond.jobRemark = ond.jobRemark.replace(/<p/g, '<p style="word-break: break-all; " ') //防止不换行
            }
          }
          // console.log(ond.jobRemark)
          if (ond.remark != null && ond.remark!=""){
            if (ond.remark.indexOf("<img") > -1) {
              ond.remark = ond.remark.replace(/<img/g , '<img style="width:100%;height:auto" ') //防止富文本图片过大
            } 
            if (ond.remark.indexOf("<p") > -1) {
              ond.remark = ond.remark.replace(/<p/g, '<p style="word-break: break-all; " ') //防止不换行
            }
          }
          // console.log(ond.remark)
          this.setData({
            otherNeedDetail: ond
          })
        }
      });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      id:options.id
    })
    this.getSwiperInfoList();//轮播
    this.getFindOtherDemandDetail()
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