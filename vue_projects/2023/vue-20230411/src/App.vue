<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <ElRow justify="center">
    <RouterLink to="/echarts">echarts</RouterLink>
    <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
    <RouterLink to="/element-plus">element-plus</RouterLink>
    <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
    <RouterLink to="/lodashMomentDayjs">lodashMomentDayjs</RouterLink>
    <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
    <RouterLink to="/axios">axios</RouterLink>
  </ElRow>
  <RouterView />
</template>

<style scoped></style>
