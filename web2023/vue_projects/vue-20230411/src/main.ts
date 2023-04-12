import { createApp } from 'vue'
import { createPinia } from 'pinia'

/** 全局引用 */
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'

/** 全局引用 */
import _ from 'lodash'

import App from './App.vue'
import router from './router'

const app = createApp(App)

// app.use(ElementPlus)

app.config.globalProperties.lodash = _

app.use(createPinia())
app.use(router)

app.mount('#app')
