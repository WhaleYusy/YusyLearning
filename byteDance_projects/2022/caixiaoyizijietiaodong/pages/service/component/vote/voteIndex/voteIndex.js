// pages/service/component/vote/voteIndex/voteIndex.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    para: {},//参数
    themeInfoParam: {
      sortStatus: "voteNum",
      search: "",
      actionId: '',
      pageNum: 1,
      pageSize: 10,
    },
      isBrush:false,
    findVoteAction:{
      // participantCount:11,
      // voteCount:11,
      // viewNum:455,
      // actionStartTime: '2019-10-09',
      // actionEndTime:'2019-11-09',
      // status:1,
    },
    pageNum:1,
    pageSize:10,
    voteList: [
      // {
      //   voteMainImg:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1573539667830&di=23ba3a630b738da54c8f64c7fe1b3032&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201507%2F22%2F20150722111520_EGUdZ.thumb.700_0.jpeg',
      //   voteCode: 363,
      //   companyName: '深圳市暗能量',
      //   userName: '小甜甜',
      //   birthplace: '江苏南京',
      //   motto: '太阳与你，我都喜欢',
      //   voteNum: 33
      // }
    ],
  },
  imgView(e) {
    var img = [];
    img.push(e.currentTarget.dataset.img)
    tt.previewImage({
      urls: img
    })
  },
  toDetail(e){
    let that = this
    let item = e.currentTarget.dataset.item
    let voteId = item.id
    let actionId = item.actionId
    let vote = e.currentTarget.dataset.vote
    //查看选手详情
    if(vote){
      this.setData({
        isBrush:true
      })
      setTimeout(()=>{
        //3秒之后停止并进入详情
        that.setData({
          isBrush:false
        })
        tt.navigateTo({
          url: `/pages/service/component/vote/voteDetail/voteDetail?voteId=${voteId}&actionId=${actionId}`
        })
      },3000)
    }else{
      tt.navigateTo({
        url: `/pages/service/component/vote/voteDetail/voteDetail?voteId=${voteId}&actionId=${actionId}`
      })
    }
  },
  goToReward(){
    tt.navigateTo({
      url: `/pages/service/component/vote/voteRule/voteRule?id=${this.data.para.id}`
    })
  },
  goToRankingList(){
    tt.navigateTo({
      url: `/pages/service/component/vote/voteRank/voteRank?id=${this.data.para.id}`
    })
  },
  goToApply(e){
    let status = e.currentTarget.dataset.status
    if (status == 1) {
      tt.showToast({
        title: '活动未开始'
      })
    } else if (status == 3) {
      tt.showToast({
        title: '活动已结束'
      })
    }else{
      tt.navigateTo({
        url: `/pages/service/component/vote/voteSignUp/voteSignUp?id=${this.data.para.id}`
      })
    }
  },
  getVoteList(){
    tt.showLoading({
      title: '加载中',
      mask:false
    })
    console.log("数据")
    global.$ajax('/uac/auth/vote/findVoteThemeInfoList',this.data.themeInfoParam,{type:'POST'}).then(res=>{
      console.log("数据")
      console.log(res)
      let arr = JSON.parse(JSON.stringify(this.data.voteList));
      let tem = res.data.result.list
      arr = arr.concat(tem)
      this.setData({
        voteList:arr
      })
      tt.hideLoading()
    }).catch(err=>{
      tt.hideLoading()
    })
  },
  //获取投票的详情
  getFindVoteActionDetail(id) {
    global.$ajax(`/uac/auth/vote/findVoteActionDetail/${id}`,{},{type:'POST'})
      .then(res => {
        if (res.data.code == 200) {
          // console.log(res);
          this.setData({
            findVoteAction:res.data.result
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
  //搜索按钮
  onSearch() {
    tt.showLoading({
      title: '加载中',
      mask: false
    })
    console.log("数据")
    global.$ajax('/uac/auth/vote/findVoteThemeInfoList', this.data.themeInfoParam, { type: 'POST' }).then(res => {
      console.log("数据")
      console.log(res)
      let tem = JSON.parse(JSON.stringify(res.data.result.list));
      this.setData({
        voteList: tem
      })
      tt.hideLoading()
    }).catch(err => {
      tt.hideLoading()
    })
  },
  searchInput(e){
    var t = this.data.themeInfoParam;
    t.search = e.detail.value;
    this.setData({
      themeInfoParam : t
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    tt.setNavigationBarTitle({
      title: options.name
    })
    console.log(options)
    this.data.themeInfoParam.actionId = options.id
    let para = {
      id: options.id,
      status: options.status,
      name: options.name,
    }
    this.setData({
      para: para,
      themeInfoParam: this.data.themeInfoParam
    })
    this.getVoteList();//投票列表
    this.getFindVoteActionDetail(options.id);//投票详情
    this.getAdList()
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
  onLoad2() {
    this.setData({
      pageNum: 1,
      pageSize: 10,
      voteList: [],
      themeInfoParam: {
        sortStatus: "voteNum",
        search: "",
        actionId: this.data.para.id,
        pageNum: 1,
        pageSize: 10,
      },
    })
    this.getVoteList();//投票列表
    this.getFindVoteActionDetail(this.data.para.id);//投票详情
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({
      pageNum: 1,
      pageSize: 10,
      voteList: [],
      themeInfoParam: {
        sortStatus: "voteNum",
        search: "",
        actionId: this.data.para.id,
        pageNum: 1,
        pageSize: 10,
      },
    })
    this.getVoteList();//投票列表
    this.getFindVoteActionDetail(this.data.para.id);//投票详情
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
    let userId = wx.getStorageSync('userInfo') != '' ? JSON.parse(wx.getStorageSync('userInfo')).userId : ''
    let item = this.data.para;
    //title path image
    let title = "服务易";
    var url = `/pages/service/component/vote/voteIndex/voteIndex?id=${item.id}&status=${item.status}&name=${item.name}&pid=${userId}`;
    let message = global.shareConfig(title, url , '')
    console.log(message)
    return message;
  }
})