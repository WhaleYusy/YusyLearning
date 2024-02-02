<template>
  <div class="person">
    <h2>sum: {{ sum }}</h2>
    <button @click="sum++">加1</button>
    <h2>{{ person.name }}</h2>
    <h2>{{ person.age }}</h2>
    <h2>Car: {{ person.car.name }}</h2>
    <h2>Price: {{ person.car.price }}</h2>
    <button @click="changeCar">changeCar</button>
    <button @click="changeCar2">changeCar2</button>
    <button @click="changeCar3">changeCar3</button>
  </div>
</template>

<script setup lang="ts">
  import { reactive, ref, watch } from 'vue';

  let sum = ref(0)

  const stopWatch = watch(sum, (newVal, oldValue) => {
    console.log('sum变化了',newVal, oldValue);
    if(newVal >= 10){
      stopWatch()
    }
  })

  const person = reactive({
    name: 'zhangsan',
    age: 18,
    car: {
      name: 'baoma',
      price: 100
    }
  })
  const changeCar = () => {
    person.car.name = 'benchi'
  }
  const changeCar2 = () => {
    person.car.price = 1000
  }
  const changeCar3 = () => {
    person.car = {
      name: 'tailing',
      price: 10
    }
  }
  watch(() => person.car, (n, o) => {
    console.log(n,o);
  })
</script>

<style scoped>

</style>