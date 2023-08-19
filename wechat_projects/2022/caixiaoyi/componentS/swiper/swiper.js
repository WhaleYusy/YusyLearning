// componentS/swiper.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    imgUrlsOutIn:{
      type:null,
      value:null
    },
    // 指示点激活时候的样式
    linkDotColor:{
      type: null,
      value: 'background:red !important'
    },
    // 指示点未激活时候的样式
    unLinkDotColor:{
      type: null,
      value: 'background:lightgray'
    },
    //轮播的图片()
    imgUrls:{
      type:null,
      value:  [
        'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1573028547&di=54be00c4e87e04a27123f8cb771a53f2&src=http://img.juimg.com/tuku/yulantu/121103/235077-121103063Z138.jpg',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1573038633462&di=816cca8b94dce871a57201366479d834&imgtype=0&src=http%3A%2F%2Fimg02.tooopen.com%2Fimages%2F20150714%2Ftooopen_sy_133978098392.jpg',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1573038633461&di=dd8eebf7fca86741cb5968c88658460f&imgtype=0&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201401%2F04%2F225732xmxbtyx75r4ybgvb.jpg',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1573038633461&di=2c343f0fbd55c409cf667bc6bc94e798&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2Fac9343efaeb1822c7de374f539d4021c33b53db93117b-IgeIXF_fw658',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1573038633460&di=0bf59709f586367d91e00b2aac990765&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F1%2F56f5023bbcb03.jpg'

      ],
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    //swiper
    indicatorDots: false,//导航点
    autoplay: true,
    circular: true, //衔接滑动
    interval: 5000,
    duration: 1000,
    swiperCurrent:0,//当前轮播图的位置
    //swiper
  },
  methods: {
    setImgUrls(data){
      console.log(data)
    },
    swiperChange(e){
      this.setData({
        swiperCurrent:e.detail.current
      })
    },
    imgView(e) {
      var img = [];
      img.push(e.currentTarget.dataset.img)
      wx.previewImage({
        urls: img
      })
    },
  }
})
