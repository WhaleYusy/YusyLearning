const app = getApp();
/**
 * 和后端的枚举对应
 */
const CONNECT = 1; 	// 第一次(或重连)初始化连接
const CHAT = 2;		// 聊天消息
const SIGNED = 3; 		// 消息签收
const KEEPALIVE = 4; 	// 客户端保持心跳
const PULL_FRIEND = 5;	// 重新拉取好友
let timer = null;
let isConnert = false;
let pageThis = null;

var inputVal = '';
var msgList = [];
var windowWidth = wx.getSystemInfoSync().windowWidth;
var windowHeight = wx.getSystemInfoSync().windowHeight;
var keyHeight = 0;
var websocket = require('../../utils/websocket.js');
var utils = require('../../utils/util.js');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 消息数据列表
    newList: [],
    message: '',
    scrollHeight: '100vh',
    marginTop: '120rpx',
    inputBottom: 0,
    userSeftId: '',
    userId: '',
    userSeftHeadImg:'',
    userHeadImg: '',
    defaultLogo:'',
    goodsImg:'',
    goodsName:'',
    orderNo:'',
    firstConnert:true,
    fromDistuped:false,
    // 页面的图片集合数组
    previewImgList: [],
    toView:'msg-0',
    pageNum:1,
    kfNickName:'',
    userLevelInfo:{},
    userName:'',
    userSeftName:'',
    textHeight:'calc(100vh - 100rpx - 80px)'
  },

  /*
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {    
    var chatTitle = "聊天 - " + options.sendName;
    wx.setNavigationBarTitle({ title: chatTitle });
    pageThis = this;  
    let userInfo = global.state.userInfoJson
    console.log(global.state)
    if (global.state.token) {
      this.setData({
        userSeftId: userInfo.userId,
        userSeftHeadImg: userInfo.headUrl,
        userSeftName: userInfo.nickName,
        userId: options.userId,
        userHeadImg: options.shopLogo,
        userName: options.sendName,
        scrollHeight: '100vh'
        // goodsImg: options.goodsImg || '',
        // goodsName: options.goodsName || '',
        // orderNo: options.orderNo || '',
        // kfNickName: options.kfNickName || ''
      })    
      this.getUserLevel()
      this.getRecords(); // 拉取聊天记录
    }else{
      wx.showToast({
        title: '您还未登录,请先登录~',
        icon:'none',
        duration: 8000
      })
    }
    // this.getShopInfo();
    websocket.connect(wsInit)
  },
  // 获取会员等级等信息
  getUserLevel() {
    console.log(this.data)
    global.$ajax(`/uac/auth/wxfans/findFansInfo/${this.data.userId}`).then(res => {
      if (res.data.code == 200) {
        console.log(res.data.result)
        this.setData({
          userLevelInfo: res.data.result
        })
      }
    });
  },
  // 页面卸载
  onUnload() {
    console.log(123)
    clearInterval(timer);
    wx.onSocketClose(function (res) {
       console.log('WebSocket 已关闭！'+2222)
    })
    
  },
  //事件处理函数
  send() {
    var flag = this
    let sendMsg = this.data.message;
    if (sendMsg.trim() == "") {
      wx.showToast({
        title: '消息不能为空哦~',
        icon: "none",
        duration: 2000
      })
    } else {
      setTimeout(function () {
        flag.setData({
          increase: false
        })
      }, 500)
      // 构建ChatMsg
      let chatMsg = new ChatMsg(this.data.userSeftId, this.data.userId, sendMsg, null);
      // 构建DataContent        
      let dataContent = new DataContent(CHAT, chatMsg, null);
      let selfSendTime = new Date().getTime();
      let strSelfSendTime = changeDate(selfSendTime);
      let arr = [{ 
        sendUserId: this.data.userSeftId, 
        acceptUserId: this.data.userId, 
        sendTime: strSelfSendTime,
        content:sendMsg
      }];      
      chat(JSON.stringify(dataContent));
      this.setData({
        newList: this.data.newList.concat(arr),
        message:''
      })
      console.log('发送成功')
      this.setData({
        toView: 'msg-' + (this.data.newList.length - 1),
        message:null,
        total:parseInt(this.data.total) + 1
      })
      const sendAudioContext = wx.createInnerAudioContext();
      sendAudioContext.src = "http://ossqiniu.zzldaiyan.com/send.mp3";
      sendAudioContext.play();
      console.log(this.data.newList)
    }
  },
  //监听input值的改变
  bindChange(res) {
    this.setData({
      message: res.detail.value
    })
  },
  cleanInput() {
    //button会自动清空，所以不能再次清空而是应该给他设置目前的input值
    this.setData({
      message: this.data.message
    })
  },
  increase() {
    this.setData({
      increase: true,
      aniStyle: true
    })
  },
  //点击空白隐藏message下选框
  outbtn() {
    this.setData({
      increase: false,
      aniStyle: true
    })
  },

  // 选择图片
  chooseImage() {
    let _this = this
    let user_token = global.state.token;
    wx.chooseImage({
      success: function (res) {
        console.log(res)
        for (let i = 0; i < res.tempFilePaths.length;i++){
          wx.uploadFile({
            url: global.state.baseUrl + '/uac/auth/uploadChatImage',
            filePath: res.tempFilePaths[i],
            name: 'file',
            header: {
              "token": user_token
            },
            success: function (res) {
              console.log(res)
              if (res.statusCode == 200) {
                let data = JSON.parse(res.data);
                let img = data.result.attachmentUrl;
                let imgArr = [];
                imgArr.push(img)
                let sendMsg = JSON.stringify(imgArr);
                // 构建ChatMsg
                let chatMsg = new ChatMsg(_this.data.userSeftId, _this.data.userId, img, null);
                // 构建DataContent        
                let dataContent = new DataContent(CHAT, chatMsg, "1");
                let selfSendTime = new Date().getTime();
                let strSelfSendTime = changeDate(selfSendTime);
                let arr = [{ sendUserId: _this.data.userSeftId, acceptUserId: _this.data.userId, content: img, sendTime: strSelfSendTime,isImg:true}];
                console.log(arr)
                _this.setData({
                  newList: _this.data.newList.concat(arr)
                })
                _this.setData({
                  toView: 'msg-' + (_this.data.newList.length - 1),
                  total: parseInt(_this.data.total) + 1
                })
                const sendAudioContext = wx.createInnerAudioContext();
                sendAudioContext.src = "http://ossqiniu.zzldaiyan.com/send.mp3";
                sendAudioContext.play();
                chat(JSON.stringify(dataContent));
                console.log('发送成功')
              }
            }
          })
        }   
      },
    })
  },
  // 选择文件
  chooseFile() {
    let _this = this
    let user_token = global.state.token;
    wx.chooseMessageFile({
      count: 10,
      // type: 'image',
      success(res) {
        console.log(res)
        let str2 = res.tempFiles[0].name.substring(res.tempFiles[0].name.lastIndexOf('.') + 1)
        console.log(str2)
        if(str2 !== 'zip' && str2 !== '.rar' && str2 !== 'pdf' && str2 !== 'xls' && str2 !== 'txt' && str2 !== 'doc' && str2 !== 'xlsx' && str2 !== 'docx'){
          wx.showToast({
            title: '该文件类型不支持，仅支持以下文件类型：zip，rar，pdf，xls，txt，doc，xlsx，docx',
            icon:'none'
          })
          return 
        }
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFiles[0]
        if (tempFilePaths.size > 10 * 1024 * 1024) {
          wx.showToast({
            title: '文件不能大于10m',
            icon: 'none'
          })
          return
        }
        console.log("这里")
        res.tempFiles.forEach((el) => {
          console.log(el)
          wx.uploadFile({
            url: global.state.baseUrl + '/uac/auth/uploadImageFile',
            filePath: el.path,
            name: 'file',
            header: {
              "token": user_token
            },
            success: function (res) {
              console.log(res)
              if (res.statusCode == 200) {
                let data = JSON.parse(res.data);
                let img = data.result.attachmentUrl;
                let imgArr = [];
                imgArr.push(img)
                let sendMsg = JSON.stringify(imgArr);
                // 构建ChatMsg
                let chatMsg = new ChatMsg(_this.data.userSeftId, _this.data.userId, data.result.fileName, null, img);
                // 构建DataContent        
                let dataContent = new DataContent(CHAT, chatMsg, "1");
                let selfSendTime = new Date().getTime();
                let strSelfSendTime = changeDate(selfSendTime);
                let arr = [{ sendUserId: _this.data.userSeftId, acceptUserId: _this.data.userId, content: data.result.fileName, sendTime: strSelfSendTime, isImg: true, fileUrl: img }];
                console.log(arr)
                _this.setData({
                  newList: _this.data.newList.concat(arr)
                })
                _this.setData({
                  toView: 'msg-' + (_this.data.newList.length - 1),
                  total: parseInt(_this.data.total) + 1
                })
                const sendAudioContext = wx.createInnerAudioContext();
                sendAudioContext.src = "http://ossqiniu.zzldaiyan.com/send.mp3";
                sendAudioContext.play();
                chat(JSON.stringify(dataContent));
                console.log('发送成功')
              }
            },
            fail: (res) => {
              console.log(res)
              console.log("f")
            },
            complete: () => {
              console.log('c')
            }
          })
        })
      },
    })

    
  },
  //图片预览
  previewImg(e) {
    var that = this
    //必须给对应的wxml的image标签设置data-set=“图片路径”，否则接收不到
    var res = e.target.dataset.src
    var list = this.data.previewImgList //页面的图片集合数组

    //判断res在数组中是否存在，不存在则push到数组中, -1表示res不存在
    if (list.indexOf(res) == -1) {
      this.data.previewImgList.push(res)
    }
    wx.previewImage({
      current: res, // 当前显示图片的http链接
      urls: that.data.previewImgList // 需要预览的图片http链接列表
    })
  },
  //下载文件
  downLoad(e) {
    var that = this
    let res = e.target.dataset.src
    wx.downloadFile({
      url: res
    })
  },
  //聊天消息始终显示最底端
  bottom: function () {
    var query = wx.createSelectorQuery()
    query.select('#flag').boundingClientRect()
    query.selectViewport().scrollOffset()
    query.exec(function (res) {
      wx.pageScrollTo({
        scrollTop: res[0].bottom  // #the-id节点的下边界坐标  
      })
      res[1].scrollTop // 显示区域的竖直滚动位置  
    })
  },
  // 触顶加载
  scrollup() {
    if (this.data.total != this.data.newList.length) {
      this.setData({
        pageNum: this.data.pageNum + 1
      })
      this.getRecords(true);
    }
  },
  // 获取聊天记录
  getRecords(isFresh){
    let data = {
      pageNum: this.data.pageNum, 
      pageSize: 20, 
      sendUserId:this.data.userSeftId,
      acceptUserId: this.data.userId
    }
    wx.showLoading({
      title: '加载中~',
    })
    global.$ajax(`/uac/auth/wxApp/im/listChatMsg`, data ).then(res => {
      console.log(res);
      let recordList = res.data.result.list;
      let length = recordList.length;
      // for (let i = 0; i < length;i++){ 
      //   if(recordList[i].isImg){
      //     recordList[i].content = JSON.parse(recordList[i].content)[0];
      //   }else{
      //     let reMsg = recordList[i].content;
      //     let msg = reMsg.replace(RegExp("<br>", "g"), "\n");
      //     recordList[i].content = msg;          
      //   }
      // }
      this.setData({
        newList: res.data.result.list.concat(this.data.newList),
        total: parseInt(res.data.result.total)
      })      
      wx.hideLoading();
      if (!isFresh) {
        this.setData({
          toView: 'msg-' + (this.data.newList.length - 1)
        })
      } else {
        this.setData({
          toView: 'msg-20'
        })
      }  
    });
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
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
   * 获取聚焦
   */
  focus: function (e) {
    keyHeight = e.detail.height;
    this.setData({        
      scrollHeight: `calc(100vh - ${keyHeight}px )`,      
      textHeight: `calc(100vh - ${keyHeight}px - 100rpx - 80px)`
    });
    console.log(this.data.scrollHeight)
    this.setData({
      toView: 'msg-' + (this.data.newList.length - 1),
      inputBottom: keyHeight + 'px'
    })

  },

  //失去聚焦(软键盘消失)
  blur: function (e) {
    this.setData({
      scrollHeight: '100vh',
      textHeight: 'calc(100vh - 100rpx - 80px)',
      inputBottom: 0
    })  
    this.setData({
      textHeight: 'calc(100vh - 100rpx - 80px)'
    })
    this.setData({
      toView: 'msg-' + (this.data.newList.length - 1),
    })
  },
  /**
   * 退回上一页
   */
  toBackClick: function () {
    wx.navigateBack({})
  }
})
function wsInit() {  
  wx.onSocketMessage((res) => {
    let msg = JSON.parse(res.data);
    let arr = []
    let selfSendTime = new Date().getTime();
    let strSelfSendTime = changeDate(selfSendTime);
    if (msg.extand === '1'){   //图片         
      // arr = [{ sendUserId: msg.chatMsg.senderId, acceptUserId: msg.chatMsg.receiverId, sendTime: strSelfSendTime, content: JSON.parse(msg.chatMsg.msg), isImg: true }];
      arr = [{ sendUserId: msg.chatMsg.senderId, acceptUserId: msg.chatMsg.receiverId, fileUrl: msg.chatMsg.fileUrl, sendTime: strSelfSendTime, content: msg.chatMsg.msg, isImg: true }];

    }else{     //  文字
      let reMsg = msg.chatMsg.msg;
      let saMsg = reMsg.replace(RegExp("<br>", "g"), "\n"); 
      arr = [{ sendUserId: msg.chatMsg.senderId, acceptUserId: msg.chatMsg.receiverId, sendTime: strSelfSendTime, content: saMsg }];   
    }
    //收到消息
    pageThis.setData({
      newList: pageThis.data.newList.concat(arr)
    });
    pageThis.setData({
      toView: 'msg-' + (pageThis.data.newList.length - 1),
      total: parseInt(pageThis.data.total) + 1
    })
    const msnAudioContext = wx.createInnerAudioContext();
    msnAudioContext.src = "http://ossqiniu.zzldaiyan.com/msn.mp3";
    msnAudioContext.play();
    console.log(res)
  }, function (res){      
  })
  wx.onSocketOpen((res) => {
    if(res){
      isConnert = true;
      // if (pageThis.data.firstConnert){
        
      // }
      // 登录
      var chatMsg = new ChatMsg(pageThis.data.userSeftId, null, null, null);
      var dataContent = new DataContent(CONNECT, chatMsg, null);

      chat(JSON.stringify(dataContent));

      console.log('WebSocket连接打开')    
      clearInterval(timer);
      timer = setInterval(keepalive, 10000); 
    }
  })
  wx.onSocketError(function (res) {
    isConnert = false;
    console.log('WebSocket连接打开失败')
  })
  wx.onSocketClose(function (res) {
    isConnert = false;
    pageThis.setData({
      firstConnert:false
    })
    console.log('WebSocket 已关闭！' + 1111)
  })
};
/**
 * 构建消息 DataContent 模型对象
 * @param {Object} action
 * @param {Object} chatMsg
 * @param {Object} extand
 */

function DataContent(action, chatMsg, extand) {
  this.action = action;
  this.chatMsg = chatMsg;
  this.extand = extand;
}
/**
 * 和后端的 ChatMsg 聊天模型对象保持一致
 * @param {Object} senderId
 * @param {Object} receiverId
 * @param {Object} msg
 * @param {Object} msgId
 */
function ChatMsg(senderId, receiverId, msg, msgId,fileUrl) {
  this.senderId = senderId;
  this.sendHeadImg = pageThis.data.userSeftHeadImg;
  this.sendUserName = pageThis.data.userSeftName;
  this.acceptHeadImg = pageThis.data.userHeadImg;
  this.acceptUserName = pageThis.data.userName;
  this.receiverId = receiverId;
  this.msg = msg;
  this.fileUrl = fileUrl || '';
  this.msgId = msgId;
}
function keepalive() {
  console.log(12344)
  // 构建对象
  var dataContent = new DataContent(KEEPALIVE, null, null);
  // 发送心跳  
  chat(JSON.stringify(dataContent));
}
function chat(msg) {
  // 如果当前websocket的状态是已打开，则直接发送， 否则重连
  if (isConnert) {
      websocket.send(msg);
  } else {
    // 重连websocket
    websocket.connect(wsInit);
    setTimeout(()=>{
      websocket.send(msg);
    }, 1000);
  }
};


// 时间转换
// 时间戳转换
function changeDate(val) {
  // 比如需要这样的格式 yyyy-MM-dd hh:mm:ss
  let date = new Date(val);
  let Y = date.getFullYear() + '-';
  let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  let D = date.getDate() + ' ';
  let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
  let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
  let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
  let lastTime = Y + M + D +' '+ h + m + s;
  return lastTime;
}