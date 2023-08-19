// componentS/supplyDetail/tripServer/tripServer.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    userStatus:null,
    datasList: null,
    companyId: null,
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
    onAddClick:function(){
      tt.navigateTo({
        url: '/pages/service/component/travel/publishTripProduct/publishTripProduct?cid='+this.data.companyId,
      })
    },
    onEdit:function(event){
      // console.log(event.currentTarget.dataset.pid)
      tt.navigateTo({
        url: '/pages/service/component/travel/publishTripProduct/publishTripProduct?type=edit&pid=' + event.currentTarget.dataset.pid,
      })
    },
    // 内容跳转内容页面
  onNavigateCon: function (e) {
      let id = e.currentTarget.dataset.id
      tt.navigateTo({
        url: `/pages/service/component/travel/travelContent/travelContent?id=${id}`
      })
    }
  }
})
