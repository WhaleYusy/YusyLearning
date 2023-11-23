<template>
  <div class="search">
    <ElAutocomplete clearable placeholder="请输入医院名称" class="form" />
    <ElButton type="primary" size="default" :icon="Search">搜索</ElButton>
  </div>
</template>

<script setup lang="ts">
import { Search } from "@element-plus/icons-vue";
</script>

<style scoped lang="scss">
.search {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0;

  :deep(.form) {
    width: 600px;
    margin-right: 10px;
  }
}
</style>
