<script setup lang="ts">
import { Get, Post } from "@/axios"

Get('https://jsonplaceholder.typicode.com/todos').then(res => {
  console.log(res);
  
}).catch(err => {
  console.log(err);
})

Post('https://jsonplaceholder.typicode.com/posts', {
  title: 'foo',
  completed: false
}).then(res => {
  console.log(res);
  
}).catch(err => {
  console.log(err);
})
</script>

<template>
  <div id="">
    <h1>This is an axios page</h1>
  </div>
</template>

<style scoped>
</style>