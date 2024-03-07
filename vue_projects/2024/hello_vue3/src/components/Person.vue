<template>
  <div class="person">
    姓名： {{ person.name }} 年龄： {{ person.age }}
    <button @click="changeName">修改名字</button>
    <button @click="changeAge">修改年龄</button>
    姓名： {{ name }} 年龄： {{ age }}

    年龄{{ age1 }}
  </div>
</template>

<script setup lang="ts">
import { reactive, toRef, toRefs } from 'vue'

let person = reactive({
  name: '张三',
  age: 18
})
let { age, name } = toRefs(person)
const changeName = () => {
  name.value += '-'
}
const changeAge = () => {
  age.value += 1
  age1.value += 1
}

let age1 = toRef(person, 'age')
</script>

<style scoped>
.person {
  padding: 20px;
  background-color: skyblue;
  border: 2px solid #000;
  border-radius: 20px;
}
</style>
