<script setup lang="ts">
import { ref } from 'vue'

const textData = ref("")
const transEnter = () => {
  console.log(textData.value.replace(/\n/g, '<br>'))
}
</script>

<template>
  <main>
    <h1>This is a home page</h1>
    <ElInput type="textarea" v-model="textData"></ElInput>
    <ElButton @click="transEnter">换行处理</ElButton>
  </main>
</template>
