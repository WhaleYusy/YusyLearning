// componentS/purchaseList/purchaseList.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isReachBottom:{
      type:null,
      value:false
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
    toDetail(){

    },
    imgClick(){
      console.log("ii")
      console.log(this)
      this.triggerEvent('imgClick');
    },
    rightClick(){
      console.log("rr")
      this.triggerEvent('rightClick');
    },
  }
})
