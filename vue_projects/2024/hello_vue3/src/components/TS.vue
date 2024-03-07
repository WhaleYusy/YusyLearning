<template>
  <div>
    <h1>TS</h1>
    <h2>当前求和： {{ sum }}</h2>
    <button @click="changeSum">点我+1</button>
    <hr />
    <!-- <img v-for="dog in dogList" :key="dog" :src="dog" height="100" />
    <hr />
    <button @click="getDog">再来一只小狗</button> -->
  </div>
</template>
<script setup lang="ts">
import type { PersonInter, Persons } from '@/types'
let person: PersonInter = {
  id: 'shangguigu001',
  name: '张三',
  age: 60,
  sex: true
}
let persons: Persons = [
  {
    id: 'shangguigu001',
    name: '张三',
    age: 60
  },
  {
    id: 'shangguigu001',
    name: '张三',
    age: 60
  },
  {
    id: 'shangguigu001',
    name: '张三',
    age: 60
  }
]

// import useSum from '@/hooks/useSum'
// import useDog from '@/hooks/useDog';

// const { sum, changeSum} = useSum()
// const { dogList, getDog } = useDog()

import utils from '@/utils/index'
const { sum, changeSum } = utils()
</script>
<style scoped></style>
