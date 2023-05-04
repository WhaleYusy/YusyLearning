<script setup lang="ts">
/** 全局引用 */
// import { getCurrentInstance } from 'vue';
// const { proxy } = getCurrentInstance() as any
// console.log(proxy.lodash.random(0, 10));
// console.log(proxy.$moment(new Date()).format('YYYY-MM-DD HH:mm:ss'));

/** 局部引用 如果方法有多个地方调用可考虑写进utils/index.ts */
// import {random} from 'lodash'
// import moment from 'moment'
import { getLodashRandom, getMomentFormat2 } from '@/utils/index'
const onRandom = () => {
  console.log(getLodashRandom(0, 10))
}
// const onFormat = () => {
//   console.log(getMomentFormat());
// }
const onFormat2 = () => {
  console.log(getMomentFormat2())
}
</script>

<template>
  <div id="vue-lodash">
    <ElButton @click="onRandom">random</ElButton>
    <!-- <ElButton @click="onFormat">format by moment</ElButton> -->
    <ElButton @click="onFormat2">format by dayjs</ElButton>
  </div>
</template>

<style scoped></style>
