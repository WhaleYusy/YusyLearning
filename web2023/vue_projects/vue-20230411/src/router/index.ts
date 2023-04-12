import { createRouter, createWebHistory } from 'vue-router'
import VueEcharts from '../views/VueEcharts.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: VueEcharts,
    },
    {
      path: '/echarts',
      name: 'Echarts',
      redirect: '/'
    },
    {
      path: '/element-plus',
      name: 'elementPlus',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/VueElementPlus.vue')
    },
    {
      path: '/lodash',
      name: 'lodash',
      component: () => import('../views/VueLodash.vue')
    },
  ]
})

export default router
