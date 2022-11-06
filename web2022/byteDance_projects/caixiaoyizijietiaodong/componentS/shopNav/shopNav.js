// componentS/shopNav/shopNav.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    active:null,
    selected:null
  },

  /**
   * 组件的初始数据
   */
  data: {
    navData: [
      { name: '首页', path: '/pages/shoppingMall/index/shoppingIndex', icon: 'iconhome' },
      { name: '分类', path: '/pages/shoppingMall/component/catogory/catogory', icon: 'iconfenlei4' },
      { name: '我的', path: '/pages/shoppingMall/component/my/index/myIndex', icon: 'iconwode' }
    ]
  },
 
  /**
   * 组件的方法列表
   */
  methods: {
    onGoto1(e) {
      let path = e.currentTarget.dataset.path
      let index = e.currentTarget.dataset.index
      // this.setData({
      //   selected:index
      // })
      // console.log(path)
      // // tt.navigateTo({
      // //   url: path
      // // })
      // console.log(e)
      if (index == 0){
        console.log("首页")
        tt.switchTab({
          url:path
        })
      }else{
        tt.navigateTo({
          url: path
        })
      }
      // this.triggerEvent('toPath', path)
    },
  }
})
