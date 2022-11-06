// componentS/tabBar/tabBar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    tabList: [
        {
          name: "采购易",
        path: "/pages/purchase/purchaseIndex",
        icon: "/img/icon/1.png"
        },
        {
          name: "销售易",
          path: "/pages/supply/supplyIndex",
          icon: "/img/icon/3.png"
        },
      { name: "服务易", path: "/pages/service/serviceIndex", icon: "/img/icon/2.png" },
        // { name: "优选圈", path: "/mall/home", icon: "iconfont icon-shangcheng" }
      { name: "优选易", path: "/pages/shoppingMall/index/shoppingIndex", icon: "/img/icon/4.png" }
      ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onGoto(e){
      console.log(1)
      let path = e.currentTarget.dataset.path
      tt.switchTab({
        url: path
      })
      console.log("酸菜鱼")

      // if (index == 0){
      //   console.log(0)
      //   tt.switchTab({
      //     url: '/pages/purchase/purchaseIndex'
      //   })
      // }else if(index == 1){
      //   tt.navigateTo({
      //     url: '/pages/supply/supplyIndex'
      //   })

      // }else if(index == 2){
      //   tt.navigateTo({
      //     url: '/pages/service/serviceIndex'
      //   })

      // }else if(index == 3){
      //   tt.navigateTo({
      //     url: '/pages/shoppingMall/index/shoppingIndex'
      //   })
      // }
    }
  }
})
