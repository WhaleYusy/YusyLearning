import axios from 'axios';
import router from '../router';
import moment from 'moment'
import {
  Message
} from 'element-ui'
import store from '../store'



let QZDSOFT_REQUEST = axios.create({

});

//设定基础路径
// let rootApi = 'http://api.yworth.com.cn/';
// let rootApi = 'http://mapi.qzdcloud.com';
// let rootApi = 'http://192.168.0.35:9900';
//let rootApi = 'http://v2api.qzdcloud.com/';
let rootApi = 'http://api.xlwfw.com';
axios.defaults.baseURL = rootApi;
axios.defaults.timeout = 10000;


// axios.defaults.headers.common['Content-Type'] = 'application/json'


// 请求的拦截器
axios.interceptors.request.use(config => {
  // debugger
  // 为每个请求头都添加认证TOKEN,注意由于后台使用的是JSON WEB TOKEN,
  //所有token 之前要带上 Bearer空格
  //当我们在请求头里带上token的时候,浏览器默认将这个请求视作复杂请求
  /*当请求被视作复杂请求的时候,浏览器会对服务器发起两次请求
      第一次请求: OPTIONS,这个请求的作用,检测是否能够正常连接服务器
      第二次请求: get/post,这个请求就是正式请求数据
      */
  if (sessionStorage.getItem('token')) {
    // let expireTime = new Date(moment(JSON.parse(sessionStorage.getItem('userInfo')).time, "YYYYMMDDHHmmss").format('YYYY-MM-DD HH:mm:ss')).getTime()
    //  let now = new Date().getTime();
    // 续租过期时间小于10分钟且未失效还有操作的
    //  console.log((expireTime -now)/1000  +"s ,会话剩余有效时间："+ formatSeconds((expireTime -now)/1000));
    //  if ((expireTime - now)/1000 <= 360) {
    //    // 续租token
    //    let user = JSON.parse(sessionStorage.getItem('userInfo'));
    //    // 已过期的不再继租
    //    if(user && config.url.indexOf("logout") <0  && ((expireTime - now)/1000) > 0 ){
    //     QZDSOFT_REQUEST({
    //          url:`${rootApi}/pc/user/reToken`,
    //          method: 'get',
    //          params: {},
    //          timeout:'6000',
    //          headers:{
    //            'token': user.tok,
    //            'Content-Type':'application/x-www-form-urlencoded'
    //          }
    //      }).then(res=>{
    //        if (res.data.data.code === 1 ) {
    //            user.time = res.data.data.exipreTime;
    //            user.tok = res.data.data.token;
    //            sessionStorage.setItem('userInfo',JSON.stringify(user))
    //          }
    //        })
    //    }else{
    //       Message('很抱歉，登录已过期，请重新登录');
    //       store.dispatch('setCartNumber',0);
    //       sessionStorage.removeItem('userInfo')
    //       router.push('/login/index');
    //       return
    //    }
    //  }
    // config.headers.common['Authorization'] = 'Bearer ' + JSON.parse(sessionStorage.getItem('userInfo')).tok || '';
    config.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('token');
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// //响应的拦截器
// axios.interceptors.response.use(response => {
//   return response;
// }, error => {
//   // router.replace({ path: '/upgradeAndMaintenanceOfWebsite' })
//   return Promise.reject(error);
// });
//响应的拦截器
axios.interceptors.response.use(response => {
  if (response.data.resp_code === 401) {
    sessionStorage.clear();
    window.location.reload();
  } else {
    return response;
  }
}, error => {
  return Promise.reject(error);
});



function formatSeconds(value) {
  var secondTime = parseInt(value); // 秒
  var minuteTime = 0; // 分
  var hourTime = 0; // 小时
  if (secondTime > 60) { //如果秒数大于60，将秒数转换成整数
    //获取分钟，除以60取整数，得到整数分钟
    minuteTime = parseInt(secondTime / 60);
    //获取秒数，秒数取佘，得到整数秒数
    secondTime = parseInt(secondTime % 60);
    //如果分钟大于60，将分钟转换成小时
    if (minuteTime > 60) {
      //获取小时，获取分钟除以60，得到整数小时
      hourTime = parseInt(minuteTime / 60);
      //获取小时后取佘的分，获取分钟除以60取佘的分
      minuteTime = parseInt(minuteTime % 60);
    }
  }
  var result = "" + parseInt(secondTime) + "秒";

  if (minuteTime > 0) {
    result = "" + parseInt(minuteTime) + "分" + result;
  }
  if (hourTime > 0) {
    result = "" + parseInt(hourTime) + "小时" + result;
  }
  return result;
}



const getData = {
  delete: (url, data) => {
    return axios({
      url: url,
      method: 'delete',
      params: data
    })
  },
  put: (url, data) => {
    return axios({
      url: url,
      method: 'put',
      data
    })
  },
  get: (url, data) => {
    return axios({
      url: url,
      method: 'get',
      params: data
    })
  },
  post: (url, data) => {
    return axios({
      url: url,
      method: 'post',
      data
    })
  },
  paramsPost: (url, data) => {
    return axios({
      url: url,
      method: 'post',
      params: data
    })
  },
  loginHttp: (url, data, head) => {
    return axios({
      url: url,
      method: 'post',
      headers: {
        Authorization: 'Basic ' + head
      },
      params: data
    })
  },
  judgeIfLogin: (res, that) => {
    if (res.data.data.code === -999) {
      //将that传入使用
      sessionStorage.removeItem('userInfo');
      that.$store.dispatch('setCartNumber', 0);
      that.$router.push("/login/index");
    } else {
      // alert("当前的code:"+res.data.data.code)
    }
  }
}

export default getData;
