// componentS/supplyDetail/indrustNews/indrustNews.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    dynamicList:{
      type:Array,
      value:[]
    },
    companyId:null,
    userStatus:null
  },

  /**
   * 组件的初始数据
   */
  data: {
    isShow:false,
    placeholder:'。。。',
    param:{
      logo:'',
      title:'',
      companyDynamicImage:[],
      companyDynamicContent:""
    },
    //富文本相关的参数
    formats: {},
    readOnly: false,
    placeholder: '在这里尽情创作吧！',
    keyboardHeight: 0,
    isIOS: false,
    richContent:"",
  },

  /**
   * 组件的方法列表
   */
  methods: {
    saveTitle(e){
      //保存标题
      this.data.param.title = e.detail.value
      this.setData({
        param: this.data.param
      })
    },
    // 添加按钮
    onAddClick() {
      // this.onEditorReady()
      this.data.param = {
        supplierId: this.data.companyId,
        logo: "",
        title: "",
        id: "",
        companyDynamicContent: "",
        companyDynamicImage:[]
      }
      this.setData({
        isShow:true,
        param: this.data.param
      })
      
    },
    // 选择图片
    chooseImage() {
      let _this = this
      let user_token = global.state.token;
      tt.chooseImage({
        success: function (res) {
          console.log(res)
          for (let i = 0; i < res.tempFilePaths.length; i++) {
            tt.uploadFile({
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
                  _this.data.param.logo = img
                  _this.setData({
                    param: _this.data.param
                  })
                }
              }
            })
          }
        },
      })
    },
    // 选择图片
    chooseImage2() {
      let _this = this
      let user_token = global.state.token;
      tt.chooseImage({
        success: function (res) {
          console.log(res)
          for (let i = 0; i < res.tempFilePaths.length; i++) {
            tt.uploadFile({
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
                  _this.data.param.companyDynamicImage.push(img)
                  _this.setData({
                    param: _this.data.param
                  })
                }
              }
            })
          }
        },
      })
    },
    removeImage2(event){
      let index = event.currentTarget.dataset.index;
      let paramList = this.data.param
      paramList.companyDynamicImage.splice(index, 1)
      this.setData({
        param: paramList
      })
    },
    onTextInput(e){
      console.log(e)
      let param = this.data.param
      param.companyDynamicContent = e.detail.value
      this.setData({
        param: param
      });
    },
    // 发布按钮点击
    onSubmitClick() {
      var that = this;
      tt.showModal({
        title: '确认提交',
        content: '确认提交该企业动态？',
        showCancel: true,//是否显示取消按钮
        success: function (res) {
          if (res.cancel) {
            //点击取消,默认隐藏弹框
          } else {
            that.onSubmitClick2()
          }
        },
        fail: function (res) {
          tt.showToast({
            title: '提交失败',
          })
        }//接口调用失败的回调函数
      })
    },
    //提交按钮
    onSubmitClick2() {
      if (this.data.param.title.trim() == '') {
        tt.showToast({
          title: '请输入企业动态标题',
          icon:'none'
        })
      } else if (this.data.param.logo == '') {
        tt.showToast({
          title: '请输入企业动态首图',
          icon: 'none'
        })
      } else if (this.data.param.companyDynamicContent == "") {
        tt.showToast({
          title: '请输入企业动态信息',
          icon: 'none'
        })
      } else {
        var param = this.data.param;
        param.companyDynamic = "<p>"+param.companyDynamicContent.replace(/\n/g, "</p><p>")+"</p>"
        for(let a=0;a<param.companyDynamicImage.length;a++){
          param.companyDynamic += "<img src='" + param.companyDynamicImage[a] +"' />"
        }
        param.companyDynamicContent = param.companyDynamicContent.replace(/\n/g, "<br>")
        param.companyDynamicImage = JSON.stringify(param.companyDynamicImage);
        console.log(this.data.param)
        global.$ajax("/uac/auth/wx/common/saveCompanyDynamicWithSupplier", this.data.param).then(res => {
          // console.log(res)
          if (res.data.code == 200) {
            tt.showToast({
              title: res.data.result,
              icon: 'none'
            })
            this.setData({
              isShow: false
            })
          }
        });
      }
    },
    onEditClick(event){
      //修改企业动态
      // this.onEditorReady()
      var param = event.currentTarget.dataset.item;
      param.companyDynamicContent = param.companyDynamicContent || "";
      param.companyDynamicContent = param.companyDynamicContent.replace(/<br>/g, "\n");
      param.companyDynamicImage = param.companyDynamicImage || "[]";
      param.companyDynamicImage = JSON.parse(param.companyDynamicImage);
      this.setData({
        isShow: true,
        param: param,
        richContent: param.companyDynamic
      })
    },
    onCloseClick() {
      this.setData({
        isShow:false,
        richContent:""
      })
    },
    toIndrustDetail(ev){
      let item = ev.currentTarget.dataset.item
      tt.navigateTo({
        url: '/pages/supply/component/indrustNewsDetail/indrustNewsDetail?id=' + item.id
      })
    },
    // 富文本相关的函数
    readOnlyChange() {
      this.setData({
        readOnly: !this.data.readOnly
      })
    },
    updatePosition(keyboardHeight) {
      const toolbarHeight = 50
      const { windowHeight, platform } = tt.getSystemInfoSync()
      let editorHeight = keyboardHeight > 0 ? (windowHeight - keyboardHeight - toolbarHeight) : windowHeight
      this.setData({ editorHeight, keyboardHeight })
    },
    calNavigationBarAndStatusBar() {
      const systemInfo = tt.getSystemInfoSync()
      const { statusBarHeight, platform } = systemInfo
      const isIOS = platform === 'ios'
      const navigationBarHeight = isIOS ? 44 : 48
      return statusBarHeight + navigationBarHeight
    },
    onEditorReady() {
      const that = this
      this.createSelectorQuery().select('#editor').context(function (res) {
        console.log(res)
        that.editorCtx = res.context
        that.editorCtx.setContents({ html: that.data.richContent }) // 注意：插入的是对象
      }).exec()
    },
    blur(e) {
      let html = e.detail.html
      let delta = e.detail.delta
      console.log(html)
      console.log(delta)
      this.data.param.companyDynamic = html
      this.setData({
        param: this.data.param
      })
      this.editorCtx.blur()
    },
    //样式设置的部分
    format(e) {
      console.log(e)
      let { name, value } = e.target.dataset
      if (!name) return
      // console.log('format', name, value)
      console.log(this)
      this.editorCtx.format(name, value)

    },
    onStatusChange(e) {
      console.log(this.editorCtx)
      const formats = e.detail
      this.setData({ formats })
    },
    insertDivider() {
      this.editorCtx.insertDivider({
        success: function () {
          console.log('insert divider success')
        }
      })
    },
    clickLogText(e) {
      that.editorCtx.getContents({
        success: function (res) {
          console.log(res.html)
          tt.setStorageSync("content", res.html); // 缓存本地
          console.log(res.html)
        }
      })
    },
    clear() {
      this.editorCtx.clear({
        success: function (res) {
          // console.log("clear success")
        }
      })
    },
    removeFormat() {
      this.editorCtx.removeFormat()
    },
    insertDate() {
      const date = new Date()
      const formatDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
      this.editorCtx.insertText({
        text: formatDate
      })
    },
    insertImage() {
      const that = this
      let user_token = global.state.token;
      tt.chooseImage({
        count: 1,
        success: function (res) {
          tt.uploadFile({
            url: global.state.baseUrl + '/uac/auth/uploadChatImage',
            filePath: res.tempFilePaths[0],
            name: 'file',
            header: {
              "token": user_token
            },
            success: function (res) {
              console.log(res)
              if (res.statusCode == 200) {
                let data = JSON.parse(res.data);
                let img = data.result.attachmentUrl;
                that.editorCtx.insertImage({
                  src: img,
                  data: {
                    id: 'abcd',
                    role: 'god'
                  },
                  // width: '100%',
                  success: function () {
                    console.log('insert image success')
                  }
                })
              }
            }
          })
        }
      })
    }
  },
  ready(){
    // this.onEditorReady()
    //在pageNeo使用的时候写在onLoad里面的
    const platform = tt.getSystemInfoSync().platform
    const isIOS = platform === 'ios'
    this.setData({ isIOS })
    const that = this
    this.updatePosition(0)
    let keyboardHeight = 0
    // tt.onKeyboardHeightChange(res => {
    //   if (res.height === keyboardHeight) return
    //   const duration = res.height > 0 ? res.duration * 1000 : 0
    //   keyboardHeight = res.height
    //   setTimeout(() => {
    //     tt.pageScrollTo({
    //       scrollTop: 0,
    //       success() {
    //         that.updatePosition(keyboardHeight)
    //         that.editorCtx.scrollIntoView()
    //       }
    //     })
    //   }, 200)
    // })
  }
})
