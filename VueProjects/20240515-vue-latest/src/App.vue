<script setup lang="ts">
import { RouterLink, RouterView, useRouter, useRoute } from 'vue-router'
import { updateStorage } from '@/utils'
import { computed } from 'vue'
const router = useRouter()
const route = useRoute()

const isLoginPage = computed(() => {
  return !route.meta.hidden
})

const exit = () => {
  updateStorage('loginInfo', '')
  router.push('/login')
}
</script>

<template>
  <template v-if="isLoginPage">
    <div class="top">
      <button @click="exit">退出</button>
    </div>
    <div class="title">
      <RouterLink to="/">Name</RouterLink>
      <RouterLink to="/age">Age</RouterLink>
      <RouterLink to="/sex">Sex</RouterLink>
    </div>
    <div class="content">
      <RouterView />
    </div>
  </template>
  <RouterView v-else />
</template>

<style scoped lang="less">
.title,
.content {
  padding: 20px;
  display: flex;
}
.title {
  justify-content: space-around;
}
</style>
