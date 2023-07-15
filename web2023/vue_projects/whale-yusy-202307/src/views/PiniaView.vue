<script setup lang="ts">
import {useCounterStore} from '@/stores/counter'
import { storeToRefs } from 'pinia';
const store = useCounterStore()
const {count, doubleCount} = storeToRefs(store)
const {increment} = store
const interval = () => {
  if(count.value >= 10) return
  increment()
  store.count++
};
</script>

<template>
  <div id="">
    <h1>This is a pinia page</h1>
    <p>count: {{ count }}</p>
    <p>doubleCount: {{ doubleCount }}</p>
    <ElButton @click="interval">count加</ElButton>
  </div>
</template>

<style scoped>
</style>