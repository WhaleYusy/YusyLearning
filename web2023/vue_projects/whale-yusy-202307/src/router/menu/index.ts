export default [
  {
    path: '/axios',
    name: 'axios',
    component: () => import('@/views/AxiosView.vue')
  },
  {
    path: '/pinia',
    name: 'pinia',
    component: () => import('@/views/PiniaView.vue')
  },
  {
    path: '/echarts',
    name: 'echarts',
    component: () => import('@/views/EchartsView.vue')
  }
]