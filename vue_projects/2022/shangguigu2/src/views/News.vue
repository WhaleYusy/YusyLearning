<template>
  <div>
    <ul>
      <li v-for="(item,index) in newsArr" :key="index">{{item}}</li>
    </ul>
  </div>
</template>

<script>
  export default{
    data(){
      return{
        newsArr:['News001','News002','News003','News004']
      }
    }
  }
</script>

<style>
</style>
