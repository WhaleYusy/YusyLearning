<template>
  <div class="person">
    姓：<input type="text" v-model="firstName" /><br>
    名：<input type="text" v-model="lastName" /><br>
    全名：<span>{{firstName}}-{{lastName}}</span><br>
    全名：<span>{{ fullName }}</span><br>
    <button @click="changFullName">changFullName</button>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

let firstName = ref('张')
let lastName = ref('三')

// let fullName = computed(() => `${firstName.value}-${lastName.value}`)
let fullName = computed({
  get(){
    return `${firstName.value}-${lastName.value}`
  },
  set(val){
    const [str1, str2] = val.split('-')
    firstName.value = str1 || ''
    lastName.value = str2 || ''
  }
})

function changFullName() {
  fullName.value = 'li-si'
}

</script>

<style scoped>

</style>