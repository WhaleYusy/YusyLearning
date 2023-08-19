import { createRouter, createWebHashHistory } from 'vue-router'
import VueEcharts from '../views/VueEcharts.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: VueEcharts
    },
    {
      path: '/echarts',
      name: 'Echarts',
      redirect: '/'
    },
    {
      path: '/element-plus',
      name: 'elementPlus',
      component: () => import('../views/VueElementPlus.vue')
    },
    {
      path: '/lodashMomentDayjs',
      name: 'lodashMomentDayjs',
      component: () => import('../views/VueLodashMomentDayjs.vue')
    },
    {
      path: '/axios',
      name: 'axios',
      component: () => import('../views/VueAxios.vue')
    }
  ]
})

export default router
