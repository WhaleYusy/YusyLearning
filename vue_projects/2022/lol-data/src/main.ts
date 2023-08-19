import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "./assets/css/index.css";

import { initData } from "./utils";

const app = createApp(App);

app.use(createPinia());
app.use(router);

initData();

app.mount("#app");
