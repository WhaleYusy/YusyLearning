import { createRouter, createWebHistory } from 'vue-router'
import { getStorage } from '@/utils'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Root',
      redirect: '/name'
    },
    {
      path: '/name',
      name: 'name',
      component: () => import('@/views/NameModule.vue')
    },
    {
      path: '/age',
      name: 'age',
      component: () => import('@/views/AgeModule.vue')
    },
    {
      path: '/sex',
      name: 'sex',
      component: () => import('@/views/SexModule.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginModule.vue'),
      meta: {
        hidden: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  console.log(to)

  /**
   * 项目启动时，必经过一次beforeEach
   * 因此登陆状态、菜单权限等可以在这里判断处理
   */
  if (getStorage('loginInfo')) {
    // 判断是否已登录过
    next()
  } else {
    to.name === 'login' ? next() : next({ name: 'login' })
  }
})

export default router
