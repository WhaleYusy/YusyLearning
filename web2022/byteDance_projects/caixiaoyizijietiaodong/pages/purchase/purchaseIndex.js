// pages/purchase/purchaseIndex.js
var filter = require("../../utils/filter.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showNoMore:false,
    total:0,
    show:true,
    searchValue:'',
    isReachBottom:false,
    showChild:false,//一开始不显示
    active:0,
    showCato:false,//是否显示菜单
    menuList:[],
    imgUrls: [],
    purchaseProductlist:[],
    pageNum:1,
    pageSize:6,
    demandTypeId:'',
    keyWords:'',
    classId: '',
    pid: '',
    //测试用
    isShowPopup:false,
    //关注弹窗
    isShowPopup2:false,
    evaluateList:[],
    showCode:false,
    meTotal:0,
    totalMsg:0,//小易助手
    useATT:false,
    scrollSet:''
  },
  imgView(e) {
    var img = [];
    img.push(e.currentTarget.dataset.img)
    tt.previewImage({
      urls: img
    })
  },
  closeShowCode(){
    this.setData({
      showCode:false
    })
  },
  onPopupClose() {
    this.setData({
      isShowPopup: false
    })
  },
  onPopupClose2() {
    this.setData({
      isShowPopup2: false
    })
  },
  // 获取评价列表
  getEvaluate() {
    // Indicator.open({ text: "加载中...", spinnerType: "fading-circle" });
    tt.showLoading({
      title:'加载中...'
    })
    this.setData({
      evaluateList:[]
    })
    global.$ajax("/uac/auth/wx/demand/queryUnEvaluateList",{}).then(res => {
      if (res.data.code == 200) {
        // console.log(res);

        res.data.result.length > 0
          ? (this.data.isShowPopup = true)
          : (this.data.isShowPopup = false);
        // this.data.isShowPopup == true ? mbOpen() : mbClose();
        if (res.data.result.length > 0){
          res.data.result.map((item, index) => {
            this.data.evaluateList.push({
              createdTime: item.createdTime,
              materialDemandId: item.materialDemandId,
              title: item.title,
              uid: item.uid,
              radio: "",
              textarea: "",
              biCount: item.biCount
            });
          });
        }
        this.setData({
          evaluateList: this.data.evaluateList,
          isShowPopup: this.data.isShowPopup
        })
        // setTimeout(() => {
        //   Indicator.close();
        // }, 300);
        tt.hideLoading()
      }
    }).catch(err=>{
      console.log(err)
    })
  },
  goCatogory(){
    //点击出现左侧分类
    this.setData({
      showCato:true,
      scrollSet: 'overflow-y:hidden;height:91vh'
    })
    global.$ajax('/uac/auth/wx/common/demandClassList', {}, { type: 'GET' }).then((res)=>{
      if (res.data.code == 200) {
        this.setData({
          menuList: res.data.result
        })
      }
    }).catch(err=>{

    })
  },
  // 禁止上层滑动影响到下层页面
  stopPageScroll(){
    return;
  },
  getAdList() {
    global.$ajax('/uac/auth/wxAdver/getAdverListByType', { type: 1 }, { type: 'POST' }).then(res => {
      this.setData({
        imgUrls: res.data.result
      })
    }).catch(res => {

    })
  },
  // 查询未验证的用户数量
  getFindUnApplyCount(callBack) {
    global.$ajax("/uac/auth/user/findUnReadMsgCount").then(res => {
      if (res.data.code == 200) {
        callBack(res.data.result)
      }
    });
  },
  getxyList() {
    console.log("sum")
    let userId = tt.getStorageSync('userInfo') != '' ? JSON.parse(tt.getStorageSync('userInfo')).userId : ''
    console.log(userId)
    if (!userId){

    }else{
      global.$ajax(`/uac/auth/wxApp/im/countUnReadMsg/${userId}`).then(res => {
        if (res.data.code == 200) {
          this.getFindUnApplyCount(data => {
            this.setData({
              totalMsg: res.data.result.unReadTotal + data
            })
            this.data.totalMsg > 100 ? this.data.totalMsg = '99+' : this.data.totalMsg = res.data.result.unReadTotal + data
            this.setData({
              totalMsg: this.data.totalMsg
            })
          })
        }
      });
    }
  },
  clickLayer(){
    //
    this.setData({
      showCato:false,
      scrollSet: '',
      active:''
    })
  },
  inputKey(ev){
    //输入搜索关键词
    this.setData({
      keyWords: ev.detail.value
    })
  },
  serach(){
    if (this.data.keyWords==null || this.data.keyWords==''){
      this.setData({
        useATT: false
      })
    } else {
      this.setData({
        useATT: true
      })
    }
    //搜索
    this.setData({
      purchaseProductlist: [],
      pageNum: 1,
      demandTypeId: '',
      classId: ''
    })
    if (this.data.useATT){
      this.getMetialListAndF()
    }else{
      this.getMetialList();
    }
  },
  onCatoClose(){
    this.setData({
      showCato: false,
      scrollSet: '',
      active: ''
    })
  },
  expandFir(e){
    //
    let children = e.currentTarget.dataset.item.children
    let index = e.currentTarget.dataset.index
    this.setData({
      active:index,
      showChild:true
    })
    if (!children){
      tt.showToast({
        title: '暂无分类',
        icon:'none'
      })
    }
  },
  //点击菜单进行请求
  chooseAndClose(e){
    tt.showLoading({
      title: '搜索中...'
    })
    console.log(e)
    let datas = e.currentTarget.dataset.item
    console.log(datas)
    let d_classId,
      d_pid = "";
    if (datas.sort == 1) {
      d_classId = "";
      d_pid = datas.parentId;
    } else {
      d_classId = datas.id;
      d_pid = "";
    }
    this.setData({
      searchValue: datas.className,
      isSearch:true,
      getSearchData:[],
      showChild: false,
      showCato: false,
      scrollSet: '',
      active: ''
    })
    console.log("3333")
    global.$ajax("/uac/auth/wx/common/demandTypeList",{},{type:'GET'}).then(res => {
      //arr 是什么
      console.log(res)
      let arr = res.data.result.filter(item => {
        return item.demandTypeName == "物料需求";
      });
      this.setData({
        demandTypeId: arr[0].id,
        classId: d_classId,
        pid: d_pid,
        keyWords: ''
      })
      global.$ajax("/uac/auth/wx/common/findMaterialDemandListByClassId", {
          demandTypeId: arr[0].id,
          classId: d_classId,
          pageNum: 1,
          pageSize: 99,
          pid: d_pid
        },{type:'POST'})
        .then(data => {
        console.log("data")
        console.log(data)
          let arrTem = []
          arrTem = arrTem.concat(filter.purchaseListFd(data.data.result.list))
          // data.data.result.list.map((item, index) => {
          //   if (data.data.result.list.length > 0) {
          //     arr.push({
          //       classId: item.classId,
          //       className: item.className,
          //       endTime: item.endTime.substring(0, 10),
          //       id: item.id,
          //       status: item.status,
          //       logo: item.logo,
          //       deliveryAddress: item.deliveryAddress,
          //       description: item.description,
          //       startTime: item.startTime.substring(0, 10),
          //       title: item.title,
          //       viewNum: item.viewNum,
          //       adImg: data.data.result,
          //       adType: 0
          //     });
          //   }
          // });
          this.setData({
            purchaseProductlist: arrTem
          })
         tt.hideLoading()
          //这是啥
          // `ad` 图
          // this.$http
          //   .get("uac/auth/generalizeArticle/findRandomAdvertising")
          //   .then(data => {
          //     res.data.result.list.map((item, index) => {
          //       if (res.data.result.list.length > 0) {
          //         this.getSearchData.push({
          //           classId: item.classId,
          //           className: item.className,
          //           endTime: item.endTime.substring(0, 10),
          //           id: item.id,
          //           status: item.status,
          //           logo: item.logo,
          //           deliveryAddress: item.deliveryAddress,
          //           description: item.description,
          //           startTime: item.startTime.substring(0, 10),
          //           title: item.title,
          //           viewNum: item.viewNum,
          //           adImg: data.data.result,
          //           adType: 0
          //         });
          //       }
          //     });
          //     Number.parseInt(res.data.result.list.length) % 2 == 0
          //       ? (this.getSearchData[this.getSearchData.length - 1][
          //         "adType"
          //       ] = 1)
          //       : (this.getSearchData[this.getSearchData.length - 1][
          //         "adType"
          //       ] = 0);
          //   });

          // this.$nextTick(() => {
          //   Indicator.close();
          //   this.$refs.getData.getListmore();
          //   this.searchValue = "";
          // });
        });
    });
    
  },
  //菜单区域的跳转
  toPage(e){
    let index = e.currentTarget.dataset.index
    let path = ''
    switch(index){
      case '1': path = '/pages/purchase/component/mertialNeed/mertialNeed'; break;
      case '2': path = '/pages/purchase/component/otherNeed/otherNeed'; break;
      case '3': path = '/pages/service/component/vote/voteList/voteList'; break;
      case '4': path = '/pages/service/component/news/news'; break;
      case '5': path = '/pages/shoppingMall/index/shoppingIndex'; break;
      case '6': path = ''; break;
      case '7': path = '/pages/service/component/travel/travel'; break;
      case '8': path = '/pages/purchase/component/xyAssistant/xyAssistant';break;
    }
    if(index == 5){
      tt.switchTab({
        url: path
      })
    } else if (index != 5 && index != 6 ){
      tt.navigateTo({
        url: path
      })
    }else if(index == 6){
      this.setData({
        showCode:true
      })
    }
  },
  goPage(ev){
    //去到求购页的详情
    let item = ev.currentTarget.dataset.item;
    console.log(item.id);
    tt.navigateTo({
        url: '/pages/purchase/component/mertialNeed/metialNeddDetail/metialNeddDetail?id=' +item.id
     })
  },
  getSwiper(){
    // let type = JSON.parse('1')
    // global.$ajax('/uac/auth/wxAdver/getAdverListByType', {type:type}, { type: 'POST' }).then((res) => {
    //   console.log(res)
    // }).catch(err => {

    // })
    var purSwiper = this.selectComponent("#purSwiper")
    // 父组件里面执行子组件的方法
    // console.log(purSwiper)
    // purSwiper.setImgUrls(this.data.imgUrls); 
  },
  clickImgParent(){
    //动作触发
  },
  getMetialList(){
    //物料需求的接口
    tt.showLoading({
      title: '加载中...'
    })
    global.$ajax('/uac/auth/wx/common/materialDeamndHome2', {keyWords: this.data.keyWords, pageNum: this.data.pageNum,pageSize: this.data.pageSize},{type:'POST'}).then(res=>{
      let old = JSON.parse(JSON.stringify(this.data.purchaseProductlist))
      let arr = old.concat(filter.purchaseListFd(res.data.result.list))
      this.setData({
        purchaseProductlist: arr,
        total: res.data.result.count ? res.data.result.count : 0,
        meTotal: res.data.result.count ? res.data.result.count : 0,
      })
      if (this.data.total == this.data.purchaseProductlist.length) {
        this.setData({
          showNoMore:true
        })
      }
      tt.hideLoading()
    }).catch(res=>{
      tt.hideLoading()
    })
  },
  getMetialListAndF(){
    //物料需求的接口
    tt.showLoading({
      title: '加载中...'
    })
    global.$ajax('/uac/auth/wx/common/attentionAndQueryDemand', {keyWords: this.data.keyWords, pageNum: this.data.pageNum,pageSize: this.data.pageSize},{type:'POST'}).then(res=>{
      let old = JSON.parse(JSON.stringify(this.data.purchaseProductlist))
      let arr = old.concat(filter.purchaseListFd(res.data.result.list))
      this.setData({
        purchaseProductlist: arr,
        total: res.data.result.count ? res.data.result.count : 0,
        meTotal: res.data.result.count ? res.data.result.count : 0,
      })
      if (this.data.total == this.data.purchaseProductlist.length) {
        this.setData({
          showNoMore:true
        })
      }
      tt.hideLoading()
    }).catch(res=>{
      tt.hideLoading()
    })
  },
  goPostPurchaseIndex(){
    tt.navigateTo({
      url: '/pages/purchase/component/pushPurchase/pushPurchase'
    })
  },
  setValue(e){
    //评价框选择
    let index = e.currentTarget.dataset.index
    let value = e.currentTarget.dataset.value
    console.log(index)
    console.log(value)
    this.data.evaluateList[index].radio = value
    this.setData({
      evaluateList:this.data.evaluateList
    })
  },
  // 获取二维码
  getQrcode(){
    global.$ajax(`/uac/auth/wx/demand/queryQrcode2Info/2`,{},{type:'GET'}).then(res => {
      if (res.data.code == 200) {
        this.setData({
          qrCodeImg:res.data.result.qrcodeUrl
        })
        
      }
    });
  },
  setTextArea(e){
    //
    console.log(e)
    let value = e.detail.value
    let index = e.currentTarget.dataset.index
    console.log(value)
    this.data.evaluateList[index].textarea = value
    this.setData({
      evaluateList:this.data.evaluateList
    })
  },
  onCurrentClic(e) {
    var that = this;
    //评价
    let item = e.currentTarget.dataset.item
    console.log(item)
    if (item.radio == "") {
      tt.showToast({
        title: '请先选择评价选项',
        icon:'none'
      })
    }else if(item.radio == 0 && item.textarea.trim() == ''){
      tt.showToast({
        title: '请输入评价内容',
        icon:'none'
      })
    }else{
      //进行评价
      global.$ajax("/uac/auth/wx/common/saveDemandEvaluate", {
        evaluateType: item.radio,
        content: item.textarea,
        materialDemandId: item.materialDemandId,
        uid: item.uid,
        biCount: item.biCount
      })
      .then(res => {
        // console.log(res);
        if (res.data.code == 200) {
          tt.showToast({
            title: res.data.result
          })
          setTimeout(function(){
            that.getEvaluate();
          },1000)
        }
      });
    }
  },
  getFollowBox(){
    let subscribe;
    if (tt.getStorageSync('userInfo')) { //已授权用户
      global.$ajax("/uac/auth/wx/common/findUserInfo", {}).then(res => {
        if (res.data.code === 200) {
          subscribe = res.data.result.subscribe
          console.log(subscribe)
          if (subscribe == 0) { //未关注需弹框
            if (tt.getStorageSync("loginStatus")) {  //是否已弹过弹框
              return;
            } else {  //未弹过弹出
              //弹框
              // setTimeout(() => {
                this.setData({
                  // isShowPopup: false,
                  isShowPopup2: true
                })
              // },1500)
              tt.setStorage({
                key: 'loginStatus',
                data: true
              })
            }
          } else {  //已关注不需弹框
            return;
          }
        }
      })
    } else {  //未授权用户

      if (tt.getStorageSync("loginStatus")) {  //是否已弹过弹框
      } else {  //未弹过弹出
        if (tt.getStorageSync('loginStatusNum') < 3) { //弹框次数未达三次
          //弹框
          // setTimeout(() => {
            this.setData({
              // isShowPopup: false,
              isShowPopup2: true
            })
          // }, 1500)
          tt.setStorage({
            key: 'loginStatus',
            data: true
          })
          tt.setStorage({
            key: 'loginStatusNum',
            data: tt.getStorageSync('loginStatusNum') + 1
          })
        } else {  //已够三次，不弹
          return;
        }
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad2:function(){
    this.setData({
      purchaseProductlist: [],
      pageNum: 1,
      demandTypeId: '',
      classId: ''
    })
    this.getMetialList()
  },
  onLoad: function (options) {
    this.getAdList();//时候也轮播图
    this.getMetialList()
    this.getQrcode();//获取推广二维码
    // this.getEvaluate();
    // this.getxyList();
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
    this.getSwiper()
    this.getEvaluate()
    this.getxyList()
    // 新需求 弹框关注 暂时注释 2019.12.19
    // this.getFollowBox()
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
    this.getAdList();//时候也轮播图
    this.onLoad2();
    this.getQrcode();//获取推广二维码
    this.getSwiper()
    this.getEvaluate()
    this.getxyList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if(this.data.demandTypeId!=""||this.data.classId!=""){
      return;
    }
    if (!this.data.showNoMore) {
      this.data.pageNum += 1
      this.setData({
        pageNum: this.data.pageNum
      })
      if(this.data.useATT){
        this.getMetialListAndF()
      }else{

        this.getMetialList()
      }
    } else {
      console.log("已经没有更多了")
    }

    // if(this.data.purchaseProductlist.length < this.data.total){
    //   this.setData({
    //     pageNum:1
    //   })
    //   this.getMetialList()
    // }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    let userId = wx.getStorageSync('userInfo') != '' ? JSON.parse(wx.getStorageSync('userInfo')).userId : ''
    //title path image
    let title = "采购易";
    var url = '/pages/purchase/purchaseIndex?pid='+userId;
    let message = global.shareConfig(title, url , '')
    console.log(message)
    return message;
  }
})