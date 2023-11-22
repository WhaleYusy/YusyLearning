import { createApp } from "vue";

import "reset.scss/reset.scss";

import App from "@/App.vue";

import HospitalTop from "@/components/hospital_top/index.vue";
import HospitalBottom from "@/components/hospital_bottom/index.vue";

import router from "@/router";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

const app = createApp(App);
app.component("HospitalTop", HospitalTop);
app.component("HospitalBottom", HospitalBottom);

app.use(router);
app.use(ElementPlus);

app.mount("#app");
