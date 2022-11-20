<script lang="ts" setup>
import { addSum } from "@/utils/index";
import { ref } from "vue";
console.log("组合式setup");
// 变量
const msg = "Hello!";
const num = ref(0);
let firstFlag = false;
// 函数
function log() {
  !firstFlag && console.log(msg);
  firstFlag = true;
  num.value++;
  console.log(num.value);
}
</script>
<template>
  <div class="about">
    <h1>This is an about page</h1>
    <hr />
    <button @click="log">{{ msg }}</button>
    <h2>{{ addSum(1, 2) }}</h2>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
