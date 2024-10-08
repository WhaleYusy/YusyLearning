<script setup lang="ts" name="App">
import YuDemo from '@/views/Demo.vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
</script>

<template>
  <el-config-provider :locale="zhCn">
    <yu-demo />
  </el-config-provider>
</template>

<style scoped></style>
