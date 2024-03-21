<script setup>
import TreeChart from 'vue-tree-chart-3'
import data from './others/data'
</script>

<template>
  <div class="vue3-tree-org">
    <TreeChart :json="data" />
  </div>
</template>

<style scoped>
.vue3-tree-org {
  height: 768px;
  width: 1366px;
}
</style>
