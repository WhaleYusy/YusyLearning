// componentS/supplyDetail/productService/productService.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    operateProducesUrlList:{
      type: Object,
      value:{}
    },
    companyId: null,
    userStatus: null,

  },

  /**
   * 组件的初始数据
   */
  data: {
    isShow: false,
    param: {
      title: "",
      operateProducesUrl: ""
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getData(){
      console.log("数据")
    },
    previewImg(e) {
      var img = [];
      img.push(e.currentTarget.dataset.img)
      wx.previewImage({
        urls: img
      })
    },
    titleSet(e){
      var param1 = this.data.param;
      param1.title = e.detail.value;
      this.setData({
        param: param1
      });
    },
    // 删除
    onDel(event) {
      var id = event.currentTarget.dataset.item;
      var that = this;
      wx.showModal({
        title: '删除提示',
        content: '此操作将永久删除该数据，是否继续?',
        success: function (sm) {
          if (sm.confirm) {
            // 用户点击了确定 可以调用删除方法了
            global.$ajax("/uac/auth/wx/common/deleteOperateProducesById/" + id).then(res => {
              console.log(res)
              if (res.data.code == 200) {
                wx.showToast({
                  title: res.data.result,
                  icon: 'none'
                })
                that.triggerEvent('check');
              }
            });
          } else if (sm.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    },
    // 添加按钮
    onAddClick() {
      this.data.param = {
        operateProducesUrl: "",
        title: "",
        id: this.data.companyId
      }
      this.setData({
        isShow : true
      })
    },

    // 关闭
    onCloseClick() {
      this.setData({
        isShow: false
      })
    },

    // 选择图片
    chooseImage() {
      let _this = this
      let user_token = global.state.token;
      wx.chooseImage({
        success: function (res) {
          console.log(res)
          for (let i = 0; i < res.tempFilePaths.length; i++) {
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
                  _this.data.param.operateProducesUrl = img
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

    // 提交按钮
    onSubmitClick() {
      var that = this;
      if (this.data.param.title == "") {
        wx.showToast({
          title: "请输入产品标题",
          icon: 'none'
        })
        return;
      } else if (this.data.param.operateProducesUrl == "") {
        wx.showToast({
          title: "请上传产品图片",
          icon: 'none'
        })
        return;
      } else {
        console.log(this.data.param)
        global.$ajax("/uac/auth/wx/common/saveOperateProducesUrl", this.data.param).then(res => {
          // console.log(res)
          if (res.data.code == 200) {
            wx.showToast({
              title: res.data.result,
              icon: 'none'
            })
            this.setData({
              isShow: false,
              param:{}
            })
            setTimeout(function () {
              that.triggerEvent('check');  
            },1000)
          }
        });
      }
    }
  }
})
