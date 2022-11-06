// pages/ai/ai.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 4000,
    duration: 1000,
    list: ["https://mmbiz.qpic.cn/mmbiz_jpg/YDAMvtOf0AWFcmjgGx2wGVWibCqphHhkXhPf52oPvicuW8qXgHQfh56ibibyqEBCAd4iaic5aVib7VgkUhGDxOX8gtzFg/0?wx_fmt=jpeg", "https://mmbiz.qpic.cn/mmbiz_jpg/YDAMvtOf0AWFcmjgGx2wGVWibCqphHhkXiawib8uaZS2U4A51ibyFmL3HL6ibSicViaZfOiaN1LJFnmzMRK7icTdWheY1Hw/0?wx_fmt=jpeg", "https://mmbiz.qpic.cn/mmbiz_jpg/YDAMvtOf0AWFcmjgGx2wGVWibCqphHhkX8NfSeddLMTVZ37cGjgXKB4Pl5v8xcoSJpjaXqtD9Lbc7oWquibRyoGg/0?wx_fmt=jpeg"],
    list2: ["https://mmbiz.qpic.cn/mmbiz_jpg/YDAMvtOf0AWFcmjgGx2wGVWibCqphHhkXJJUerrEzhNKFJe3OrO9BqjhSNM0psrwczJKEoOicrYd7lewTUMCWxGg/0?wx_fmt=jpeg", "https://mmbiz.qpic.cn/mmbiz_jpg/YDAMvtOf0AWFcmjgGx2wGVWibCqphHhkXXbXUyhkbictQ15BlvuBoyk3DVDBicY5NyX8dczBbQxhlmM5htk6ibgaSg/0?wx_fmt=jpeg", "https://mmbiz.qpic.cn/mmbiz_jpg/YDAMvtOf0AWFcmjgGx2wGVWibCqphHhkXicj3cmZ97Gz8PvX7D2AslZg5F9fTSrHpiagaLYOZJEzfHXicTXT4Ymnqg/0?wx_fmt=jpeg","https://mmbiz.qpic.cn/mmbiz_png/YDAMvtOf0AWFcmjgGx2wGVWibCqphHhkXe62xicDvbfHafPFMaeo2RZCgwef56byVrSEW9kJxiaIPmQn79axMlH0Q/0?wx_fmt=png"],
    list3: ["https://mmbiz.qpic.cn/mmbiz_jpg/YDAMvtOf0AWFcmjgGx2wGVWibCqphHhkXey7dQRaQzeHbhb8g5k1fdR49mq2ZcWGboL2K8r4lF4E1rMG2gydu5g/0?wx_fmt=jpeg","https://mmbiz.qpic.cn/mmbiz_jpg/YDAMvtOf0AWFcmjgGx2wGVWibCqphHhkX3ZBv6AiaUetQyyM3PsInPWzzCzKNOOdR17y6vNszqUcjz9VCHyDJJ1g/0?wx_fmt=jpeg"],
    list4: ["https://mmbiz.qpic.cn/mmbiz_jpg/YDAMvtOf0AWFcmjgGx2wGVWibCqphHhkXCW2diaB72Xo5gMT1PoCuQmkDttiaXRYmGOibCnq0kxC6WzJOuAib7sSA0A/0?wx_fmt=jpeg","https://mmbiz.qpic.cn/mmbiz_jpg/YDAMvtOf0AWFcmjgGx2wGVWibCqphHhkXTJD1dpN9iaLtr160YvpHp82pFDkPEn3icFn3OSrtS0x2bY8BmicXzmRDQ/0?wx_fmt=jpeg"],
    list5: ["https://mmbiz.qpic.cn/mmbiz_jpg/YDAMvtOf0AWFcmjgGx2wGVWibCqphHhkXbJFDMamHdIxzHRXIsKNks1OQUMibBiaH23HYvHcdIKHZtytrs60ahk9w/0?wx_fmt=jpeg", "https://mmbiz.qpic.cn/mmbiz_jpg/YDAMvtOf0AWFcmjgGx2wGVWibCqphHhkXEXeTsiaMn5fKOYM0icxvd22jtYdmO2K2sHCHSl2kbHfiaGCH6v4vyW9Bw/0?wx_fmt=jpeg", "https://mmbiz.qpic.cn/mmbiz_jpg/YDAMvtOf0AWFcmjgGx2wGVWibCqphHhkXqYibiauPr8csza0jQicGWf7SglmyoX027hPvNqqZ6FohjLgqliazGUre1w/0?wx_fmt=jpeg","https://mmbiz.qpic.cn/mmbiz_jpg/YDAMvtOf0AWFcmjgGx2wGVWibCqphHhkXjIe22Ze2tEdDRHWMoVr9qPASunRQpDoZRSAys4nJERzOuDxmo7huNw/0?wx_fmt=jpeg"],
    list6: ["https://mmbiz.qpic.cn/mmbiz_png/YDAMvtOf0AWFcmjgGx2wGVWibCqphHhkXd3d7h0DSRUc2sYBDhNhdibiccYpqM0n1eRUHkAYUmnWcUBDkXeezibOBw/0?wx_fmt=png", "https://mmbiz.qpic.cn/mmbiz_png/YDAMvtOf0AWFcmjgGx2wGVWibCqphHhkXPhiaMjQfYPqC3icnyKGUiaxP0hSGKcqNrkeNRGQAciaJK00vDshBQzjW3A/0?wx_fmt=png", "https://mmbiz.qpic.cn/mmbiz_png/YDAMvtOf0AWFcmjgGx2wGVWibCqphHhkXNNQOuNNl8Ne57Vs8Ef3BLicxVsKdcvBOZBKsLLoXC5flyaLYtJVPYsQ/0?wx_fmt=png", "https://mmbiz.qpic.cn/mmbiz_png/YDAMvtOf0AWFcmjgGx2wGVWibCqphHhkXvvic5XbsJ0g7VMgXdOibXSTGhU5sRZIic7DEnxlxiby3o0bvWZicanm0rBA/0?wx_fmt=png","https://mmbiz.qpic.cn/mmbiz_png/YDAMvtOf0AWFcmjgGx2wGVWibCqphHhkXibibf3bGXHSz4dYicXux18yznpsmoh5NES65CdyLyiacqJtXW5JqrMibd9w/0?wx_fmt=png"],
    list7: ["https://mmbiz.qpic.cn/mmbiz_png/YDAMvtOf0AWFcmjgGx2wGVWibCqphHhkX0ibJhszkOnj7oAibegp79ZX5GOwHuDtmf4zJNqPcQ3fvIVbgXPVc2leQ/0?wx_fmt=png", "https://mmbiz.qpic.cn/mmbiz_png/YDAMvtOf0AWFcmjgGx2wGVWibCqphHhkXK5eSE6HEjODbTWjJDF7zjOZTCzjodQq4iaia6jKKbxdEj7nRO8UicGyGA/0?wx_fmt=png","https://mmbiz.qpic.cn/mmbiz_png/YDAMvtOf0AWFcmjgGx2wGVWibCqphHhkXANq6WPjfaVzATt7w4ezxS7TnvnjnK2gHXQqKQicCUREnFYKDWGoV9kA/0?wx_fmt=png"]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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