<template>
  <div class="car">
    <h2>一辆{{ car.brand }}车，价值{{ car.price }}万</h2>
    <button @click="changeCar">修改汽车的价格</button>
    <br>

    <ul>
      <li v-for="{id, name} in games" :key="id">
        {{ name }}
      </li>
    </ul>
    <button @click="changeFirstName">修改第一个游戏的名字</button>
   
    
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';

let car = ref({
  brand: '奔驰',
  price: 100
})
const changeCar = () => {
  // car = {
  //   brand: '奥托', price: 1
  // }

  // 1 reactive
  // Object.assign(car, {brand: '奥托', price: 1})
  // 2
  car.value = {brand: '奥托', price: 1}
}

const games = ref([
  { id: 'asdasd', name: '王者荣耀',},
  { id: 'asdasd2', name: '元神',},
  { id: 'asdasd3', name: '三国志',},
])
const changeFirstName = () => {
  games.value[0].name = '流星蝴蝶剑'
}

</script>

<style scoped>

</style>