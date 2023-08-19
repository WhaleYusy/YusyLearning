// pages/purchase/component/mertialNeed/shareNeed/shareNeed.js
var ctx = "" // 用于获取canvas
var leftMargin = "" //文字距离左边边距
var topMargin = "" //文字距离右边边距
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:"",
    shareList:[],
    result:null,
    qrcodeUrl: '',
    canvasWidth: '', // canvas宽度
    canvasHeight: '', // canvas高度
    imagePath: '' // 分享的图片路径
  },
  getDetail(id) {
    tt.showLoading({
      title: '加载中...',
      mask: false
    })
    setTimeout(() => {
      tt.hideLoading()
    }, 300);
    global.$ajax(`/uac/auth/wx/common/findMaterialDemandInfo/${id}`, {}, { type: 'POST' })
      .then(res => {
        console.log(res.data.result);
        if (res.data.code == 200) {
          res.data.result.pictureAddress == "" ? (this.data.shareList = []) : 
            (this.data.shareList = JSON.parse(res.data.result.pictureAddress).splice(0, 5));
          this.setData({
            result: res.data.result,
            shareList: this.data.shareList
          })
          this.initQrCode(id);
        }
      })
  },
  imgView(e) {
    var img = [];
    img.push(e.currentTarget.dataset.img)
    tt.previewImage({
      urls: img
    })
  },
  /**
* 初始化二维码
*/
  initQrCode(mtId) {
    let data = {
      page: 'pages/purchase/component/mertialNeed/metialNeddDetail/metialNeddDetail',
      scene: mtId
    }
    global.$ajax('/uac/auth/wx/gen_qr_code', data, { type: 'POST' }).then((res) => {
      if (res.data.code == 200) {
        this.setData({
          qrcodeUrl: res.data.result.body
        })
        // 生成二维码后，数据完毕，开始画图
        this.addImage()
      }
    }).catch(err => {
    })
  },
  //导出图片
  tempFilePath: function () {
    let that = this;
    tt.canvasToTempFilePath({
      canvasId: 'myCanvas',
      success: function success(res) {
        tt.saveFile({
          tempFilePath: res.tempFilePath,
          success: function success(res) {
            that.setData({
              imagePath: res.savedFilePath
            });
          }
        });
      }
    });
  },
  addImage:function(){
    var context = tt.createContext();
    this.addPicture();
    this.addTitleLeftBg();
    this.addTitleLeft();
    this.addTitle();
    this.addDescn();
    this.addConAndCode1();
    this.addConAndCode2();
    this.addConAndCode3();
    ctx.draw();
    this.tempFilePath()
  },
  addPicture: function () {
    var img = this.data.shareList[0] || "../../../../../img/timg.jpg";
    ctx.drawImage(img,10,10,355,220);
  },
  addTitleLeftBg: function () {
    var grad = ctx.createLinearGradient(10, 270, 90, 250);
    grad.addColorStop(0, "#fde37e");
    grad.addColorStop(1, "#fe6d00");
    ctx.setFillStyle(grad);
    ctx.beginPath();
    ctx.moveTo(10, 255);
    ctx.lineTo(60, 255);
    ctx.lineTo(70, 235);
    ctx.lineTo(20, 235);
    ctx.fill();
  },
  addTitleLeft:function(){
    var str = " 求 购 ";
    ctx.font = 'normal 14px sans-serif';
    ctx.setTextAlign('left'); // 文字居中
    ctx.setFillStyle("#fff");
    ctx.fillText(str, 20, 250);
  },
  addTitle: function () {
    var str = this.data.result.title || "";
    ctx.font = 'normal bold 18px sans-serif';
    ctx.setTextAlign('left');
    ctx.setFillStyle("#222");
    ctx.fillText(str, 85, 250);
  },
  addDescn: function () {
    var str = "要求描述：";
    str += this.data.result.description;
    // ctx.font = 'normal 14px sans-serif';
    // ctx.setTextAlign('left'); 
    // ctx.setFillStyle("#222");
    // ctx.fillText(str, 20, 290);
    this.dealWords({
      ctx: ctx,//画布上下文
      fontSize: 14,//字体大小
      word: str,//需要处理的文字
      maxWidth: 350,//一行文字最大宽度
      x: 20,//文字在x轴要显示的位置
      y: 290,//文字在y轴要显示的位置
      maxLine: 2//文字最多显示的行数
    })
  },
  addConAndCode1: function () {
    var str = "需求数量：";
    str += this.data.result.demandCount;
    ctx.font = 'normal 12px sans-serif';
    ctx.setTextAlign('left'); 
    ctx.setFillStyle("#222");
    ctx.fillText(str, 20, 350);
  },
  addConAndCode2: function () {
    var str = "物料类别：";
    str += this.data.result.className;
    ctx.font = 'normal 12px sans-serif';
    ctx.setTextAlign('left'); 
    ctx.setFillStyle("#222");
    ctx.fillText(str, 20, 380);
  },
  addConAndCode3: function () {
    var str = "交货地点：";
    str += this.data.result.deliveryAddress;
    ctx.font = 'normal 12px sans-serif';
    ctx.setTextAlign('left'); 
    ctx.setFillStyle("#222");
    ctx.fillText(str, 20, 410);
  },
  addCode:function(){
    var img = "";
  },
  saveCanvas:function(){
    var img = [];
    img.push(this.data.imagePath)
    tt.previewImage({
      urls: img
    })
  },
  //处理文字多出省略号显示
  dealWords: function (options) {
    options.ctx.setFontSize(options.fontSize);//设置字体大小
    var allRow = Math.ceil(options.ctx.measureText(options.word).width / options.maxWidth);//实际总共能分多少行
    var count = allRow >= options.maxLine ? options.maxLine : allRow;//实际能分多少行与设置的最大显示行数比，谁小就用谁做循环次数

    var endPos = 0;//当前字符串的截断点
    for (var j = 0; j < count; j++) {
      var nowStr = options.word.slice(endPos);//当前剩余的字符串
      var rowWid = 0;//每一行当前宽度
      if (options.ctx.measureText(nowStr).width > options.maxWidth) {//如果当前的字符串宽度大于最大宽度，然后开始截取
        for (var m = 0; m < nowStr.length; m++) {
          rowWid += options.ctx.measureText(nowStr[m]).width;//当前字符串总宽度
          if (rowWid > options.maxWidth) {
            if (j === options.maxLine - 1) { //如果是最后一行
              options.ctx.fillText(nowStr.slice(0, m - 1) + '...', options.x, options.y + (j + 1) * 18);    //(j+1)*18这是每一行的高度
            } else {
              options.ctx.fillText(nowStr.slice(0, m), options.x, options.y + (j + 1) * 18);
            }
            endPos += m;//下次截断点
            break;
          }
        }
      } else {//如果当前的字符串宽度小于最大宽度就直接输出
        options.ctx.fillText(nowStr.slice(0), options.x, options.y + (j + 1) * 18);
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
    })
    this.getDetail(options.id)
    var that = this
    var sysInfo = tt.getSystemInfo({
      success: function (res) {
        that.setData({
          canvasWidth: res.windowWidth,
          canvasHeight: res.windowWidth * 1.25
        })
        leftMargin = res.windowWidth
        topMargin = res.windowWidth * 1.25
      },
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    ctx = tt.createCanvasContext('myCanvas')
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
    // return eventHandler接收到的分享参数
    console.log(this.data.imagePath)
    return {
      title: this.data.result.title,
      path: "/uac/auth/w /common/findMaterialDemandInfo/"+this.data.id,
      imageUrl: this.data.imagePath
    };
  }
})