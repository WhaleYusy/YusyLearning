// componentS/supplyDetail/comPage/comPage.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    companyInfo:{
      type: Object,
      value:{}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    
  },
  /**
   * 组件的方法列表
   */
  methods: {
    tel(event){
      console.log(event);
      wx.makePhoneCall({
        phoneNumber: event.currentTarget.dataset.tel,
        success: function () {
          console.log("拨打电话成功！")
        },
        fail: function () {
          console.log("拨打电话失败！")
        }
      })
    }
  }
})
