// pages/service/calendar/calendar.js
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

  /**
   * 组件的方法列表
   */
  methods: {
    chooseDate(e){
      //选择日期
      let dataValue = e.currentTarget.dataset.date
      
      console.log(e)
      let str = dataValue.slice(0, 4) + '/' + dataValue.slice(4, 6) + '/' + dataValue.slice(6)
      if(new Date().getTime() > new Date(str).getTime()){
        tt.showToast({
          title: '不能选择小于当天的日期',
          icon:'none'
        })
        return 
      }
      this.setData({
        chooseIndex: dataValue
      })
      this.triggerEvent('setDate', str);  
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
  }
})
