<template>
  <div>
    <h2>当前水温为： {{ temp }}</h2>
    <h2>当前水位为： {{ height }}</h2>
    <!-- <h2>当前求和为： {{ sum }}</h2> -->
    <!-- <button @click="changeSum">点我sum+1</button> -->
    <button @click="changeTemp">temp+1</button>
    <button @click="changeHeight">height+1</button>
  </div>
</template>
<script setup lang="ts">
import { ref, watch, watchEffect } from 'vue'
// const sum = ref(0)
// const changeSum = () => {
//   sum.value += 1
// }
const temp = ref(10)
const height = ref(0)
const changeTemp = () => {
  temp.value += 1
}
const changeHeight = () => {
  height.value += 1
}

// watch([temp, height], (value) => {
//   let [tempVal, heightVal] = value
//   if(tempVal >= 16 || heightVal >= 8){
//     console.log("发请求");
//   }
// })

watchEffect(() => {
  if (temp.value >= 16 || height.value >= 8) {
    console.log('发请求')
  }
})
</script>
<style scoped></style>
