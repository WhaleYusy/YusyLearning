// pages/shoppingMall/component/my/address/addressDetail/addressDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    form:{
      defaultAddressStatus:0,
      area:'',
      telephone:'',
      consignee:'',
      detailArea:"",
      id:'',
    },
    region: ['北京市', '北京市', '东城区'],
  },
  saveAddress(){
      console.log(123);
      if (this.data.form.consignee === '') {
        tt.showToast({
          title: '请输入收货人',
          icon:'none'
        })
      } else if (!/^1[2345789]\d{9}$/.test(this.data.form.telephone)) {
        tt.showToast({
          title: '请输入正确的手机号码',
          icon: 'none'
        })
      } else if (this.data.form.area === '') {
        tt.showToast({
          title: '请选择配送地址',
          icon: 'none'
        })
      } else if (this.data.form.detailArea === '') {
        tt.showToast({
          title: '请输入详细地址',
          icon: 'none'
        })
      } else {
        this.data.form.defaultAddressStatus === 1 ? this.data.form.defaultAddressStatus = 1 : this.data.form.defaultAddressStatus = 0
        if(this.data.id !== '' && this.data.id !== undefined){
          this.data.form.id = this.data.id
        }
        this.setData({
          form:this.data.form
        })
        global.$ajax("/uac/auth/goods/saveDeliveryAddressInfo", this.data.form,{type:'POST'}).then(res => {
          // this.data.form.defaultAddressStatus = true
          // this.setData({
          //   form:form
          // })
          if (res.data.code === 200) {
            // this.$toast('保存成功')
            tt.showToast({
              title: '保存成功'
            })
            // this.$router.push({
            //   path: '/mall/address',
            //   query: {
            //     addressType: this.$route.query.addressType === 'order' ? 'order' : 'my'
            //   }
            // })
            setTimeout(function(){
              tt.navigateBack({
                success: function (e) {
                  var page = getCurrentPages().pop();
                  if (page == undefined || page == null) return;
                  page.onLoad2();
                }
              })
            },1000)
          } else {
            tt.showToast({
              title: '保存失败',
              icon:'none'
            })
          }
        }).catch(err=>{
          console.log(err)
        })
      }
  },
  bindRegionChange(e) {
    //滚动触发的事件
    // console.log(e)
    let str = e.detail.value[0] + ',' + e.detail.value[1] + ',' + e.detail.value[2]
    this.data.form.area = str
    console.log(str)
    this.setData({
      form: this.data.form
    })
  },
  changeStatus(e){
    var f = this.data.form;
    if (f.defaultAddressStatus==0){
      f.defaultAddressStatus = 1;
    }else{
      f.defaultAddressStatus = 0;
    }
    console.log(f)
    this.setData({
      form :f
    })
    console.log(this.data.form)
  },
  setValue(e){
    console.log(e)
    let value = e.detail.value
    let key = e.currentTarget.dataset.key
    this.data.form[key] = value
    this.setData({
      form:this.data.form
    })
  },
  getAddrDetail(){
    global.$ajax(`/uac/auth/goods/findDeliveryAddressInfo/${this.data.id}`,{}).then(res=>{
      this.setData({
        form:res.data.result
      })
    }).catch(res=>{
      console.log(err)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id
    if(id !== undefined){
      this.setData({
        id:id
      })
      this.getAddrDetail()
    }
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