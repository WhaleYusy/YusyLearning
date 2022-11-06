// pages/service/travelOrder/travelOrder.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      tourId:'',
      // orderTimeS: "2019-04-15 12:30",
      orederDate:'',
      orederDate2:"",
      // orederTime:'',
      // imgUrl:"/img/gzhImg/bt4.jpg",
      // routeTitle:"洛杉矶豪华定制路线",
      // setTypeS:"双人套餐",
      // setEditionS:"豪华定制版",
      // adultPrice:"6500",
      // childPrice:"3250",
      adultNum:0,
      childAmount:0,
      // nowPoints:0,
      // travelPoints:0,
      // payPoints:0,
      // payTravelPoints:0,
      // allPrice: 0,
      money:{
        amount:0,
        sum:0,
      },
      // adultNum:0,
      // childNum:0,
      //日历部分
      chooseIndex:'',
      year: 0,
      month: 0,
      date: ['日', '一', '二', '三', '四', '五', '六'],
      dateArr: [],
      isToday: '',
      isTodayWeek: false,
      todayIndex: 0,
      canOrderList:[],
      orderTime:"12:30",
      orderTimeList:[]
  },
  //成人购买量
   changeMinus(){
    if(this.data.adultNum <= 1){
      this.setData({
        adultNum: 0
      })
    }else{
      this.setData({
        adultNum: this.data.adultNum - 1
      })
    }
    let num = this.data.adultNum * this.data.money.price + this.data.childAmount * this.data.money.childPrice
    this.data.money.sum = num
    this.setData({
      money:this.data.money
    }) 
    this.setIntegralCalculation();
  },
  changePlus(){
    if(this.data.adultNum >= 100){
      this.setData({
        adultNum: 100
      })
    }else{
      this.setData({
        adultNum: this.data.adultNum + 1
      })
    }
    let num = this.data.adultNum * this.data.money.price + this.data.childAmount * this.data.money.childPrice
    this.data.money.sum = num
    this.setData({
      money:this.data.money
    }) 
    this.setIntegralCalculation();
  },
  changeNum(e){
    let num = e.detail.value;
    if(num == null || num == ""){
      num = "1";
    }else if(parseInt(num) <= 1){
      num = "1";
    }else if(parseInt(num) >= 100){
      num = "100";
    }
    this.setData({
      adultNum : parseInt(num)
    })
  },
  //儿童购买量
  changeMinus1(){
    if(this.data.childAmount <= 1){
      this.setData({
        childAmount: 0
      })
    }else{
      this.setData({
        childAmount: this.data.childAmount - 1
      })
    }
    let num = this.data.adultNum * this.data.money.price + this.data.childAmount * this.data.money.childPrice
    this.data.money.sum = num
    this.setData({
      money: this.data.money
    }) 
    // this.computeAllPrice();
    this.setIntegralCalculation();
  },
  changePlus1(){
    if(this.data.childAmount >= 100){
      this.setData({
        childAmount: 100
      })
    }else{
      this.setData({
        childAmount: this.data.childAmount + 1
      })
    }
    let num = this.data.adultNum * this.data.money.price + this.data.childAmount * this.data.money.childPrice
    this.data.money.sum = num
    this.setData({
      money: this.data.money
    }) 
    // this.computeAllPrice();
    this.setIntegralCalculation();
  },
  changeNum1(e){
    let num = e.detail.value;
    if(num == null || num == ""){
      num = "1";
    }else if(parseInt(num) <= 1){
      num = "1";
    }else if(parseInt(num) >= 100){
      num = "100";
    }
    this.setData({
      attrStepperNum : parseInt(num)
    })
  },
  setDate(e){
    console.log(e)
    this.setData({
      orederDate2: e.detail
    })
  },
  setTime(e){
    console.log(e)
    this.setData({
      orederTime: e.detail
    })
  },
  //返回上一页
  rLastIndex: function () {
    tt.navigateBack({
      delta: 1
    })
  },
  // 计算总价格
  // computeAllPrice: function () {
  //   var adultPrice = this.data.adultPrice;
  //   var childPrice = this.data.childPrice;
  //   var adultNum = this.data.adultNum;
  //   var childNum = this.data.childNum;
  //   this.setData({
  //     allPrice: adultPrice * adultNum + childPrice * childNum
  //   })
  // },
  // 加减成人票数
  onAdultChange: function (event) {
    // debugger
    this.setData({
      adultNum:event.detail
    })
    let num = this.data.adultNum * this.data.money.price + this.data.childAmount * this.data.money.childPrice
    this.data.money.sum = num
    this.setData({
      money:this.data.money
    }) 
    this.setIntegralCalculation();
  },
  // 加减儿童票数
  onChildChange: function (event) {
    // debugger
    this.setData({
      childAmount: event.detail
    })
    let num = this.data.adultNum * this.data.money.price + this.data.childAmount * this.data.money.childPrice
    this.data.money.sum = num
    this.setData({
      money: this.data.money
    }) 
    // this.computeAllPrice();
    this.setIntegralCalculation();
  },
  //跳转付款详情页面的提示
  onNextStep:function(){
    if(this.data.chooseIndex == ''){
       tt.showToast({
        title: '请选择预约时间',
        icon:'none'
      })
      return
    }else if(this.data.adultNum == 0 ){
       tt.showToast({
         title: '请选择成人票数',
         icon:'none'
       })
       return
     }
    
    let that = this
    tt.showModal({
      title: '提示',
      content: '请与客服人员确认后购买\n售出不变退货哟~',
      confirmColor:"#040df9",
      success: function (res) {
        if (res.confirm) {
          //先进行缓存参数
          let data = JSON.stringify({
            bi: that.data.toBookData.bi,
            travelBi: that.data.toBookData.travelBi,
            money: that.data.money,
            name: that.data.toBookData.name,
            time: that.data.orederDate2,
            personOrderCount: that.data.adultNum,
            childOrderCount: that.data.childAmount
          })
          tt.setStorageSync('bookData', data)
          //确认，跳转
          tt.navigateTo({
            url: '/pages/service/component/travel/travelOrderMain/travelOrderMain?id='+that.data.tourId
          })
        } else if (res.cancel) {
          return;
        }
      }
    })
  },
  getTripDetail() {
    tt.showToast({
      title: '加载中',
      icon:'none'
    })
    global.$ajax(`/uac/auth/tour/findTourProjectDetail/${this.data.tourId}`,{},{type:'POST'})
      .then(res => {
        console.log(res)
        if (res.data.code == 200) {
           console.log("旅游列表");
          console.log(res.data.result);
          this.data.money.price = res.data.result.price
          this.data.money.childPrice = res.data.result.childAmount
          this.setData({
            toBookData: res.data.result,
            money: this.data.money,
          })
          // tt.hideLoading()
          this.setIntegralCalculation();//积分计算
        }
      });
  },
  // 积分计算
  setIntegralCalculation() {
    // debugger
    if (this.data.toBookData.bi >= 0){  //积分大于等于0
      if (this.data.toBookData.travelBi >= this.data.money.sum * 2) {
        // 旅游积分够用
        this.data.money.preTravelBi = this.data.money.sum * 2;
        this.data.money.preBi = 0;
        this.data.money.amount = 0;
        this.setData({
          money:this.data.money
        })
      } else if (
        this.data.toBookData.travelBi + this.data.toBookData.bi >=
        this.data.money.sum * 2
      ) {
        // 旅游积分不够用，用户积分够用，同时扣除旅游积分与用户积分
        this.data.money.preTravelBi = this.data.toBookData.travelBi;
        this.data.money.preBi = this.data.money.sum * 2 - this.data.toBookData.travelBi;
        this.data.money.amount = 0;
        this.setData({
          money: this.data.money
        })
      } else {
        // 旅游积分不够用，用户积分不够用，同时扣除旅游积分与用户积分，支付余下现金
        this.data.money.preTravelBi = this.data.toBookData.travelBi;
        this.data.money.preBi = this.data.toBookData.bi;
        this.data.money.amount =
          (this.data.money.sum * 2 - this.data.toBookData.travelBi - this.data.toBookData.bi) /
          2;
        this.setData({
          money: this.data.money
        }) 
      }
    }else{
      if (this.data.toBookData.travelBi >= this.data.money.sum * 2) {
        // 旅游积分够用
        this.data.money.preTravelBi = this.data.money.sum * 2;
        this.data.money.preBi = 0;
        this.data.money.amount = 0;
        this.setData({
          money: this.data.money
        })
      } else {
        // 旅游积分不够用，扣除旅游积分，支付余下现金
        this.data.money.preTravelBi = this.data.toBookData.travelBi;
        this.data.money.preBi = 0;
        this.data.money.amount =
          (this.data.money.sum * 2 - this.data.toBookData.travelBi) /
          2;
        this.setData({
          money: this.data.money
        })
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    //进场计算总价格
    // this.computeAllPrice();
     this.travelCalendar = this.selectComponent("#travelCalendar");
    // this.selectComponent("#travelCalendar")._onLoad();
     console.log("日历组件");
     console.log(this.travelCalendar);
    this._onLoad();
    this.formatTime();
    this.setData({
     // orederDate2: this.formatTime(),
      tourId:options.id
    })
    this.getTripDetail()
  },
  formatTime(){
    var today = new Date();
    console.log(today)
    today.setTime(new Date().getTime() + 24 * 60 * 60 * 1000);
    console.log(today)
    let month = today.getMonth() + 1 > 9 ? today.getMonth() + 1 : '0' + (today.getMonth() + 1)
    let date = today.getDate() > 9 ? today.getDate() : '0' + today.getDate()
    let str = today.getFullYear() + '/' + month + '/' + date
    this.setData({
      orederDate2: str
    })
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

  },

  //日历部分
   chooseDate(e){
      //选择日期
      let dataValue = e.currentTarget.dataset.date
      console.log("选择时间")
      console.log(dataValue)
      console.log(e)

      let str = dataValue.slice(0, 4) + '/' + dataValue.slice(4, 6) + '/' + dataValue.slice(6)
      if(new Date().getTime() > new Date(str).getTime()){
        tt.showToast({
          title: '不能选择小于当天的时间，请重新选择',
          icon:'none'
        })
        return 
      }
      this.setData({
        chooseIndex: dataValue,
        orederDate2:str
      })
      // this.triggerEvent('setDate', str);  
    },
     _onLoad: function () {
      console.log('onload')
      let now = new Date();
      let year = now.getFullYear();
      let month = now.getMonth() + 1;
      let date = now.getDate();
      var tyear = year;
      var tmonth = (month > 9) ? month : ('0' + month);
      var tday = (date > 9) ? date : ('0' + date);
      this.setData({
        year: year,
        month: month,
        isToday: '' + tyear + tmonth + tday,
        //计算今天起后4天的可预约日期
        canOrderList: this.laterDay(4),
        orderTimeList:this.onOrderTimeList(10,15)
      })
      this.dateInit(null,null);
    },
    dateInit: function (setYear, setMonth) {
      console.log("init")
      //全部时间的月份都是按0~11基准，显示月份才+1
      let dateArr = [];						//需要遍历的日历数组数据
      let arrLen = 0;							//dateArr的数组长度
      let now = setYear ? new Date(setYear, setMonth) : new Date();
      let year = setYear || now.getFullYear();
      let nextYear = 0;
      let month = setMonth || now.getMonth();					//没有+1方便后面计算当月总天数
      let nextMonth = (month + 1) > 11 ? 1 : (month + 1);
      console.log("year + ',' + (month + 1) + ',' + 1")
      console.log(year + ',' + (month + 1) + ',' + 1)
      let startWeek = new Date(year + '/' + (month + 1) + '/' + 1).getDay();							//目标月1号对应的星期
      console.log("startWeek")
      console.log(startWeek)
      let dayNums = new Date(year, nextMonth, 0).getDate();				//获取目标月有多少天
      console.log('dayNums')
      console.log(dayNums)
      let obj = {};
      let num = 0;
      let canOrderList = this.data.canOrderList;

      if (month + 1 > 11) {
        nextYear = year + 1;
        console.log("nextYear")
        console.log(nextYear)
        console.log("nextMonth")
        console.log(nextMonth)
        dayNums = new Date(nextYear, nextMonth, 0).getDate();
      }
      arrLen = startWeek + dayNums;
      console.log("arrLen")
      console.log(arrLen)

      for (let i = 0; i < arrLen; i++) {
        console.log("循环内部")
        if (i >= startWeek) {
          num = i - startWeek + 1;
          var tyear = year;
          var tmonth = (month > 8) ? month+1 : ('0' + (month+1));
          var tday = (num > 9 ) ? num : ('0' + num);
          obj = {
            // isToday: '' + year + (month + 1) + num,
            isToday: '' + year + tmonth + tday,
            dateNum: num,
            weight: ''
          }
          // if(this.data.isToday == obj.isToday){
          //   obj.weight = "￥855";
          // }
          // if(canOrderList.indexOf(obj.isToday)>-1){
          //   obj.weight = "可预约";
          // }
        } else {
          obj = {};
        }
        console.log("obj")
        console.log(obj)
        dateArr[i] = obj;
      }
      console.log(dateArr)
      this.setData({
        dateArr: dateArr
      })

      let nowDate = new Date();
      let nowYear = nowDate.getFullYear();
      let nowMonth = nowDate.getMonth() + 1;
      let nowWeek = nowDate.getDay();
      let getYear = setYear || nowYear;
      let getMonth = setMonth >= 0 ? (setMonth + 1) : nowMonth;

      if (nowYear == getYear && nowMonth == getMonth) {
        this.setData({
          isTodayWeek: true,
          todayIndex: nowWeek
        })
      } else {
        this.setData({
          isTodayWeek: false,
          todayIndex: -1
        })
      }
    },
    lastMonth: function () {
      //全部时间的月份都是按0~11基准，显示月份才+1
      let year = this.data.month - 2 < 0 ? this.data.year - 1 : this.data.year;
      let month = this.data.month - 2 < 0 ? 11 : this.data.month - 2;
      this.setData({
        year: year,
        month: (month + 1)
      })
      this.dateInit(year, month);
    },
    nextMonth: function () {
      //全部时间的月份都是按0~11基准，显示月份才+1
      let year = this.data.month > 11 ? this.data.year + 1 : this.data.year;
      let month = this.data.month > 11 ? 0 : this.data.month;
      this.setData({
        year: year,
        month: (month + 1)
      })
      this.dateInit(year, month);
    },
    //计算后N天的时间
    laterDay: function(num){
      　　var t = new Date();
      　　var iToDay = t.getDate();
      　　var iToMon = t.getMonth();
      　　var iToYear = t.getFullYear();
      　　var arr = [];
      　　for(var i = 1; i<num+ 1; i++) {
  　　　　var newDate = new Date(iToYear, iToMon, (iToDay + i));
  　　　　arr.push('' + newDate.getFullYear() + (newDate.getMonth() + 1) + newDate.getDate())
      　　}
      　　return arr;
      },
    onOrderTimeList:function(start,end){
      var arr = [];
      for(var a = start;a<=end;a++){
        var obj = {};
        obj.name = "";
        obj.value = a + ":30";
        if (obj.value == this.data.orderTime){
          obj.name = "active";
        }
        arr.push(obj);
      }
      return arr;
    },
    changeDateTime: function (event){
      var dt = event.currentTarget.dataset.dt;
      this.setData({
        orderTime : dt
      })
      this.setData({
        orderTimeList: this.onOrderTimeList(10, 15)
      })
      // let str = this.data.orderTime.slice(0, 4) + '/' + this.data.orderTime.slice(4, 6)+'/'+this.data.orderTime.slice(6)
      // console.log("str")
      // console.log(str)
      // this.triggerEvent('setTime', str);  
    }
})

