//app.js
App({
  onLaunch: function () {
    wx.playBackgroundAudio({
      dataUrl: 'http://www.0dutv.com/plug/down/up2.php/204583470.mp3',
      title: "广东爱情故事 - 最美的不过小YU虾",
      coverImgUrl: "https://mmbiz.qpic.cn/mmbiz_jpg/YDAMvtOf0AWFcmjgGx2wGVWibCqphHhkXq0u2m6ztPS9VHtrfhzfWkMpnFo9y6rJnHheQbdEn2E7iaVMEoXs1FMw/0?wx_fmt=jpeg"
    })
  },
  globalData: {
    userInfo: null
  }
})