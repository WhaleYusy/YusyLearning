// pages/service/component/vote/voteRank/voteRank.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    param: {
      actionId: "",
      pageNum: 1,
      pageSize: 10
    },
    rankingList:[
      // {num:'g33232',userName:'甜甜1',voteNum:3333},
      // {num:'u34534',userName:'甜甜2',voteNum:3333},
      // {num:'k8977',userName:'甜甜3',voteNum:3333},
      // {num:'u8977',userName:'甜甜4',voteNum:3333},
      // {num:'u8977',userName:'甜甜5',voteNum:3333},
      // {num:'k8977',userName:'甜甜6',voteNum:3333},
      // {num:'n8977',userName:'甜甜7',voteNum:3333},
      // {num:'h8977',userName:'甜甜8',voteNum:3333},
    ]
  },
  getSortInfo(){
    tt.showLoading({
      title: '加载中',
      mask: false
    })
    ///uac/auth/vote/findVoteThemeSort
    global.$ajax('/uac/auth/vote/findVoteThemeSort', this.data.param,{type:'POST'}).then(res=>{
      console.log(res)
      this.setData({
        rankingList: res.data.result.list
      })
    }).catch(err=>{
      console.log(err)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(1)
    let id = options.id
    this.data.param.actionId = options.id
    this.setData({
      param:this.data.param
    })
    this.getSortInfo()
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