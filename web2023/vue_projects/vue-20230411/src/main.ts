import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

/** 全局引用 */
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
// app.use(ElementPlus)

/** 全局引用 */
// import _ from 'lodash'
// app.config.globalProperties.lodash = _

// import moment from 'moment'
// app.config.globalProperties.$moment = moment

app.use(createPinia())
app.use(router)

app.mount('#app')
