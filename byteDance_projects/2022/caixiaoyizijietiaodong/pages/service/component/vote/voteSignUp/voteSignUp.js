// pages/service/component/vote/voteSignUp/voteSignUp.js
var areaList = require("../../../../../utils/areaList.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showArea:false,
    region:['北京市','北京市','东城区'],
    // customItem:'全部',
    areaList:null,//
    isShowHtml:true,//是否显示报名信息
    status:1,
    tempFilePaths: [],
    uploadImageList: [],
    checkUserData:{},
    id:'',
    param:{
      voteMainImg:'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1574127044&di=e29321d88c41882718a5b7e0d9d075d0&src=http://hbimg.b0.upaiyun.com/bdaca9a07e1a8947c00c2f826ebf848750927aa24963-cATwbg_fw658',
      companyName:'',
      userName:'',
      phone:'',
      wxNum:'',
      birthplace:'',
      motto:'',

    }
  },
  uploadCompanyUrl(){
    //上传图片
    let that = this;
    tt.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      // sourceType : 可以指定来源是相册还是相机，默认二者都有
      sourceType: ['album', 'camera'],  // 此为相册 
      // sourceType: ['camera'], // 此为相机
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        // 若多次选择一张, 需把每次上传的图片拼接在一个数组中渲染;
        tt.uploadFile({
          url: global.state.baseUrl + '/uac/auth/uploadImageFile',
          filePath: res.tempFilePaths[0],
          name: 'file',
          formData: {
            "token": global.state.token || JSON.parse(tt.getStorageSync("token"))
            // "token": 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6IjIzNnJnbmhoMmoxZzUyMjE1ZmQifQ.ywTxdnAcOd2bjU6EEUzpZNxtEJ-E3mJTt0gVQiondBw'
          },
          success: function (res) {
            console.log("上传的结果")
            console.log(res)
            if (res.statusCode != 200) {
              tt.showModal({
                title: '提示',
                content: '上传失败',
                icon: 'none',
                showCancel: false
              })
              return;
            } else {
              console.log("q")
              that.data.param.voteMainImg = JSON.parse(res.data).result.attachmentUrl
              that.setData({
                param: that.data.param
              })
            }
          },
          fail: function () {
            tt.showModal({
              title: '提示',
              icon: 'none',
              content: '上传失败7777',
              showCancel: false
            })
          }
        })
      }
    })
  },
  //删除照片
  deleteImg(){
    this.param.voteMainImg = ''
    that.setData({
      this: that.data.param
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  getReApply() {
    global.$ajax(`/uac/auth/vote/checkUserApply/${this.data.id}`,{},{type:'POST'})
      .then(res => {
        console.log("zhuangtai")
        console.log(res)
        if (res.data.code == 200) {
          // console.log(res);
          this.setData({
            checkUserData: res.data.result,
            status: res.data.result.status
          })
          if (res.data.result.status == 1) {
            tt.showToast({
              title: '活动时间未开始',
              icon:'none'
            })
          }
          if (res.data.result.status == 3) {
            tt.showToast({
              title: '活动已结束',
              icon: 'none'
            })
            this.setData({
              txt:'非常抱歉，活动已经结束'
            })
          }
          if (res.data.result.reApply == false) {
            this.setData({
              isShowHtml:true
            })
          } else {
            if (res.data.result.themeCheckStatus == 0) {
              this.setData({
                isShowHtml: true,
                txt:'您已经提交过报名，正在等待审核，请耐心等待'
              })
            } else if (res.data.result.themeCheckStatus == 1) {
              this.txt = "";
              this.setData({
                isShowHtml: true,
                txt:'您已经报过名了哦'
              })
            } else {
              tt.showToast({
                title: '非常抱歉，您提交的报名审核不通过',
                icon: 'none'
              })
              this.setData({
                isShowHtml: true
              })
            }
          }
        }
      });
  },
  chooseArea(){
    //选择籍贯
    console.log("???")
    this.setData({
      showArea:true
    })
  },
  onCancel(){
    //点击取消
    this.setData({
      showArea: false
    })
  },
  bindRegionChange(e){
    //滚动触发的事件
    // console.log(e)
    let str = e.detail.value[0] + ',' + e.detail.value[1] + ',' + e.detail.value[2]
    this.data.param.birthplace = str
    console.log(str)
    this.setData({
      param: this.data.param
    })
  },
  replaceSpace(){
    //替换空格
  },
  onKeyups(e){
    //输入的时候
    let key = e.currentTarget.dataset.key;
    let value = e.detail.value
    console.log(value)
    //不让输入空格
    value = value.replace(/\s+/g, "")
    console.log(value)
    console.log(value)
    this.data.param[key] = value
    this.setData({
      param: this.data.param
    })
  },
  //保存提交
  onSaveVoteThemeInfo() {
    //测试暂时注释
    if (this.data.status == 1) {
      tt.showToast({
        title: '活动时间未开始',
        icon:'none'
      })
    } else if (this.data.status == 3) {
      tt.showToast({
        title: '活动已结束',
        icon: 'none'
      })
    } else {
      if (this.data.param.actionId == "") {
        tt.showToast({
          title: '参数错误',
          icon: 'none'
        })
      } else if (this.data.param.companyName == "") {
        tt.showToast({
          title: '请输入公司名称',
          icon: 'none'
        })
      } else if (this.data.param.userName == "") {
        tt.showToast({
          title: '请输入姓名',
          icon: 'none'
        })
      } else if (this.data.param.userName.length <= 1) {
        tt.showToast({
          title: '报名者名称长度需大于2个字符',
          icon: 'none'
        })
      } else if (
        !/^1\d{10}$/.test(
          this.data.param.phone
        )
      ) {
        tt.showToast({
          title: '请输入正确的手机号', 
          icon: 'none'
        })
      } else if (this.data.param.wxNum == "") {
        tt.showToast({
          title: '请输入微信号（领奖品用）',
          icon: 'none'
        })
      } else if (this.data.param.birthplace == "") {
        tt.showToast({
          title: '请输入籍贯',
          icon: 'none'
        })
      } else if (this.data.param.motto == "") {
        tt.showToast({
          title: '请输入格言',
          icon: 'none'
        })
      } else if (this.data.param.voteMainImg == "") {
        tt.showToast({
          title: '请上传图片',
          icon: 'none'
        })
      } else {
        tt.showLoading({
          title: '报名中...',
          mask:false
        })
        // return
        this.data.param.actionId = this.data.id;
        global.$ajax("/uac/auth/vote/saveVoteThemeInfo", this.data.param,{type:'POST'})
          .then(res => {
            if (res.data.code == 200) {
              console.log(res);
              tt.hideLoading()
              tt.showToast({
                title: '报名提交成功，等待管理员审核！',
                icon: 'none'
              })
              setTimeout(() => {
                // 返回投票首页
                tt.redirectTo({
                  url: '/pages/service/component/vote/voteIndex/voteIndex?id=' + this.data.id
                })
                // tt.navigateBack({
                  
                // })
              }, 300);
            }
          }).catch(err=>{
            tt.hideLoading()
            console.log(err)
          })
      }
    }
  },
  onLoad: function (options) {
    console.log(areaList)
    this.setData({
      id:options.id,
      areaList: areaList.default
    })
    this.getReApply() //暂时隐藏
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