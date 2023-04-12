<script setup lang="ts">
/** 全局引用 */
// import { getCurrentInstance } from 'vue';
// const { proxy } = getCurrentInstance() as any
// console.log(proxy.lodash.random(0, 10));

/** 局部引用 */
import {random} from 'lodash'
console.log(random(0, 10));

</script>

<template>
  <div id="vue-lodash">
    
  </div>
</template>

<style scoped>

</style>
