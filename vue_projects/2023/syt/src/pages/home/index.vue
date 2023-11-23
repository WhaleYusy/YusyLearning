<template>
  <div>
    <Carousel />
    <Search />
    <ElRow :gutter="20">
      <ElCol :span="20">
        <Level />
        <Region />
      </ElCol>
      <ElCol :span="4"> </ElCol>
    </ElRow>
  </div>
</template>
<script setup lang="ts">
import Carousel from "./carousel/index.vue";
import Search from "./search/index.vue";
import Level from "./level/index.vue";
import Region from "./region/index.vue";
</script>
<style scoped lang="scss"></style>
