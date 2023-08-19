import Vue from "vue";
import Vuex from "vuex";
import axios from './http/index';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isShowLeftList: false,
    isInHome: false,
    dialogVisible:false,
    qrCodeUrl:"",
    CARTNUMBER: 0,
    //redirectUri:'http://micplatform.qzdcloud.com',
    // redirectUri:'http://www.xlwfw.com',
    redirectUri:'0.0.0.0:9085',
    //redirectUri:'http://xlweb2.qzdcloud.com/',
    point:{},
    subPoint:{},
  },
  getters:{
    getUserInfo(){
      return sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : ''
    },
  },
  mutations: {
    SET_IS_SHOW_LEFTLIST(state, perms) {
      state.isShowLeftList = perms;
    },
    SET_IS_IN_HOME(state, perms) {
      state.isInHome = perms;
    },
    SET_qrCodeUrl(state, perms){
      state.qrCodeUrl = perms;
    },
    SET_dialogVisible(state, perms) {
      state.dialogVisible = perms;
    },
    // 购物车数值变化
    getCartNumber(state, num) {
      state.CARTNUMBER = num;
    },
    setPoint(state,val){
      state.point = val;
    },
    setSubPoint(state,val){
      state.subPoint = val;
    }
  },
  actions: {
    getCartNum(context) {
      axios.get("api-user/app/cart", {
        pageNum: 1,
        pageSize: 1
      }).then(res => {
        let cartnumber;
        if (res.data.count > 99) {
          cartnumber = "99+";
        } else {
          cartnumber = res.data.count;
        }
        context.commit("getCartNumber", cartnumber);
      })
        .catch(res => {
        });
    },
    // 购物车数值变化
    setCartNumber(context, val) {
      context.commit("getCartNumber", val);
    },
    requestSubPointHttp({commit}, type){
      axios.get('/api-user/app/baseData/getPhoneTakeOutPoint',{type: type}).then((res)=>{
        commit('setSubPoint',res.data.datas)
      })
    },
    requestAdHttp({commit},posCode){
      axios.post('api-user/app/adv/getApiAdvList',{positionCode:posCode}).then((res)=>{
        commit('setAdList',res.data.datas)
      })
    },
    requestUserInfoHttp({commit}){
      if(sessionStorage.getItem('token')) {
        axios.get('api-user/app/user/myInfo', {}).then((res) => {
          sessionStorage.setItem('userInfoAll', JSON.stringify(res.data.datas))
          // commit('setUserInfoAll', res.data.datas)
        })
      }
    },
    requestPointHttp({commit}){
      axios.get('/api-user/app/userpoint/getPoint',{}).then((res)=>{
        commit('setPoint',res.data.datas)
      })
    },
  }
});
