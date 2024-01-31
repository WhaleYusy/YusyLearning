<template>
  <div class="person">
    <h2>姓名：{{ name }}</h2>
    <h2>年龄：{{ age }}</h2>
    <button @click="changeName">修改名字</button>
    <button @click="changeAge">修改年龄</button>
    <button @click="showTel">查看联系方式</button>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'Person',
    data() {
      return {
        name: '张三',
        age: 18,
        tel: '12341234'
      }
    },
    methods: {
      changeName(){
        this.name = 'zhang-san'
      },
      changeAge(){
        this.age += 1
      },
      showTel(){
        alert(this.tel)
      }
    },
  }
</script>

<style scoped>
  .person{
    padding: 20px;
    background-color: skyblue;
    border: 2px solid #000;
    border-radius: 20px;
  }
</style>