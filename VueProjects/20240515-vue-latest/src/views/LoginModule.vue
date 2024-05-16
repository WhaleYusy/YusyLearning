<template>
  <div>
    <button @click="login">登录</button>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'
import { updateStorage } from '@/utils'
const router = useRouter()
const login = () => {
  updateStorage('loginInfo', { name: 'Shengyu Yu', age: 30, sex: 'male' })
  router.push('/')
}
</script>
<style scoped></style>
