import '@babel/polyfill';
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import mixin from "./mixin";
import loginUtil from './utils/loginUtil'
import axios from './http/';
import md5 from 'js-md5';
// ע��ȫ�ֹ�����
import * as filters from './utils/filter'
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

import "./css/reset.css";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "font-awesome/css/font-awesome.min.css";
import VCharts from "v-charts";
import 'font-awesome/css/font-awesome.min.css'
import { setCartNumChange } from './utils/cartNum'
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(VCharts);
Vue.mixin(mixin);
// setCartNumChange()

Vue.prototype.$http = axios;
Vue.prototype.$md5 = md5;
Vue.prototype.$loginUtil=loginUtil;

new Vue({
  router,
  store,
  render: function (h) {
    return h(App);
  }
}).$mount("#app");
