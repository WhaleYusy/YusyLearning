// componentS/supplyDetail/Recruitment/Recruitment.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    dynamicList:{
      type:Array,
      value:[]
    },
    companyId: null,
    userStatus:null,
    company:null
  },

  /**
   * 组件的初始数据
   */
  data: {
    isShow: false,
    placeholder:'请输入',
    param:{
      contentContent:'',//任职要求
      jobRemarkContent:'',//岗位职责
      contentImage:[],//任职要求
      jobRemarkImage:[],//岗位职责
    },
    richContent:"",
    richJobRemark:""
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onModify(event){
      console.log(event)
      var param = event.currentTarget.dataset.item; 
      param.contentContent = param.contentContent || "";
      param.contentContent = param.contentContent.replace(/<br>/g, "\n");
      param.contentImage = param.contentImage || "[]";
      param.contentImage = JSON.parse(param.contentImage);
      param.jobRemarkContent = param.jobRemarkContent || "";
      param.jobRemarkContent = param.jobRemarkContent.replace(/<br>/g, "\n");
      param.jobRemarkImage = param.jobRemarkImage || "[]";
      param.jobRemarkImage = JSON.parse(param.jobRemarkImage);
      this.setData({
        // richText:param.
        richContent: param.content,
        richJobRemark: param.jobRemark,
        isShow:true,
        param: param
      })
    },
    onAddClick(){
      this.setData({
        isShow: true,
        param:{
          contentContent:'',//任职要求
          jobRemarkContent:'',//岗位职责
          contentImage:[],//任职要求
          jobRemarkImage:[],//岗位职责
        }
      })
    },
    onCloseClick(){
      this.setData({
        isShow: false,
        richContent: "",
        richJobRemark: ""
      })
    },
    goToDetails(ev) {
      console.log(this.data.company)
      let item = ev.currentTarget.dataset.item
      let us = ev.currentTarget.dataset.us
      var param = {
        id: item.id,
        us:us,
        userId: this.data.company.uid,
        shopLogo:this.data.company.userPic,
        sendName: this.data.company.nickName
      }
      tt.navigateTo({
        url: '/pages/supply/component/RecruitmentDeatail/Recruitment?param=' + JSON.stringify(param)
      })
    },
    //富文本
    // 富文本相关的函数
    onEditorReady1() { //1
      const that = this
      this.createSelectorQuery().select('#editor1').context(function (res) {
        console.log(res)
        that.editorCtx1 = res.context
        if (that.data.richContent == "" || that.data.richContent == null) {
        } else {
          that.editorCtx1.setContents({ html: that.data.richContent }) // 注意：插入的是对象
        }
      }).exec()
    },
    blur1(e) { //1
      let html = e.detail.html
      let delta = e.detail.delta
      console.log(html)
      console.log(delta)
      this.data.param.content = html
      this.setData({
        param: this.data.param
      })
      this.editorCtx1.blur()
    },
    //样式设置的部分
    format1(e) { //1
      console.log(e)
      let { name, value } = e.target.dataset
      if (!name) return
      // console.log('format', name, value)
      console.log(this)
      this.editorCtx1.format(name, value)

    },
    onStatusChange1(e) { //1
      console.log(this.editorCtx1)
      const formats = e.detail
      this.setData({ formats })
    },
    insertImage1() { //1
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
                that.editorCtx1.insertImage({
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
    },
    //岗位职责的富文本函数
    onEditorReady2() { //1
      const that = this
      this.createSelectorQuery().select('#editor2').context(function (res) {
        that.editorCtx2 = res.context
        if (that.data.richJobRemark == "" || that.data.richJobRemark == null) {
        } else {
          that.editorCtx2.setContents({ html: that.data.richJobRemark }) // 注意：插入的是对象
        }
      }).exec()
    },
    blur2(e) { //1
      let html = e.detail.html
      let delta = e.detail.delta
      console.log(html)
      console.log(delta)
      this.data.param.jobRemark = html
      this.setData({
        param: this.data.param
      })
      this.editorCtx2.blur()
    },
    //样式设置的部分
    format2(e) { //1
      console.log(e)
      let { name, value } = e.target.dataset
      if (!name) return
      // console.log('format', name, value)
      console.log(this)
      this.editorCtx2.format(name, value)

    },
    onStatusChange2(e) { //1
      console.log(this.editorCtx1)
      const formats = e.detail
      this.setData({ formats })
    },
    insertImage2() { //1
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
                that.editorCtx2.insertImage({
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
    },
    // 选择图片
    chooseImage3() {
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
                  _this.data.param.contentImage.push(img)
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
    removeImage3(event){
      let index = event.currentTarget.dataset.index;
      let paramList = this.data.param
      paramList.contentImage.splice(index, 1)
      this.setData({
        param: paramList
      })
    },
    onTextInput(e){
      let param = this.data.param
      param.contentContent = e.detail.value
      this.setData({
        param: param
      });
    },
    // 选择图片
    chooseImage4() {
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
                  _this.data.param.jobRemarkImage.push(img)
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
    removeImage4(event){
      let index = event.currentTarget.dataset.index;
      let paramList = this.data.param
      paramList.jobRemarkImage.splice(index, 1)
      this.setData({
        param: paramList
      })
    },
    onTextInput2(e){
      let param = this.data.param
      param.jobRemarkContent = e.detail.value
      this.setData({
        param: param
      });
    },
    // 发布按钮点击
    onSubmitClick2() {
      var that = this;
      tt.showModal({
        title: '确认提交',
        content: '确认提交该人才招聘信息？',
        showCancel: true,//是否显示取消按钮
        success: function (res) {
          if (res.cancel) {
            //点击取消,默认隐藏弹框
          } else {
            that.onSubmitClick()
          }
        },
        fail: function (res) {
        }//接口调用失败的回调函数
      })
    },
    //提交按钮
    onSubmitClick() {
      if (this.data.param.workAddress == "" || this.data.param.workAddress == null) {
        tt.showToast({
          title: '请输入公司所在城市',
          icon:'none'
        })
      } else if (this.data.param.job == "" || this.data.param.job == null) {
        tt.showToast({
          title: '请输入职位名称',
          icon: 'none'
        })
      } else if (this.data.param.salaryRange == "" || this.data.param.job == null) {
        tt.showToast({
          title: '请输入薪资',
          icon: 'none'
        })
      } else if (
        this.data.param.recruitmentPersons == "" ||
        this.data.param.recruitmentPersons == null
      ) {
        tt.showToast({
          title: '请输入招聘人数',
          icon: 'none'
        })
      } else if (this.data.param.contentContent == "" || this.data.param.contentContent == null) {
        tt.showToast({
          title: '请输入任职要求',
          icon: 'none'
        })
      } else if (this.data.param.jobRemarkContent == "" || this.data.param.jobRemarkContent == null) {
        tt.showToast({
          title: '请输入岗位职责',
          icon: 'none'
        })
      } else {
        var param = this.data.param;
        param.supplierId = this.data.companyId
        param.content = "<p>"+param.contentContent.replace(/\n/g, "</p><p>")+"</p>"
        for(let a=0;a<param.contentImage.length;a++){
          param.content += "<img src='" + param.contentImage[a] +"' />"
        }
        param.jobRemark = "<p>"+param.jobRemarkContent.replace(/\n/g, "</p><p>")+"</p>"
        for(let a=0;a<param.jobRemarkImage.length;a++){
          param.jobRemark += "<img src='" + param.jobRemarkImage[a] +"' />"
        }
        
        param.contentContent = param.contentContent.replace(/\n/g, "<br>")
        param.jobRemarkContent = param.jobRemarkContent.replace(/\n/g, "<br>")
        param.contentImage = JSON.stringify(param.contentImage);
        param.jobRemarkImage = JSON.stringify(param.jobRemarkImage);
        console.log(param)
        global.$ajax(
            "/uac/auth/wx/common/saveTalentRecruitmentWithSupplier",
            param
          )
          .then(res => {
            if (res.data.code == 200) {
              tt.showToast({
                title: res.data.result,
                icon: 'none'
              })
              this.setData({
                isShow :false
              })
            }
          });
      }
    },
    saveValue(e){
      let key = e.currentTarget.dataset.key
      let value = e.detail.value
      this.data.param[key] = value
      this.setData({
        param: this.data.param
      })
    },
  }
})
