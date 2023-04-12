<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <ElRow justify="center">
    <RouterLink to="/echarts">echarts</RouterLink>
    <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
    <RouterLink to="/element-plus">element-plus</RouterLink>
    <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
    <RouterLink to="/lodash">lodash</RouterLink>
  </ElRow>
  <RouterView />
</template>

<style scoped></style>
