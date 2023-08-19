<script setup lang="ts">
import { Get, Post } from '@/utils/request'
import type { ElButton } from 'element-plus';
const onGet = () => {
  Get('/baidu').then(res => {
    console.log(res);
    
  }).catch(err => {
    console.log(err);

  })
}
const onPost = () => {
  Post('/baidu').then(res => {
    console.log(res);
    
  }).catch(err => {
    console.log(err);

  })
  
}
</script>

<template>
  <div id="vue-axios">
    <ElButton @click="onGet">Get</ElButton>
    <ElButton @click="onPost">Post</ElButton>
  </div>
</template>

<style scoped>

</style>
