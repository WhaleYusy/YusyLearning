<template>
  <div>
    <div v-if="!repoUrl">Loading...</div>
    <div v-else>most star repo is <a :href="repoUrl">{{repoName}}</a></div>
  </div>
</template>
<!--
绑定事件监听-订阅消息
触发事件-发布消息
 -->
<script>
  import axios from 'axios'
  export default{
    data(){
      return{
        repoUrl: '',
        repoName: ''
      }
    },
    mounted(){
      //发ajax请求获取数据
      const url = `https://api.github.com/search/repositories?q=vue2020&sort=stars`
      // this.$http.get(url).then(
      //   response => {
      //     const result = response.data;
      //     const mostRepo = result.items[0]
      //     this.repoUrl = mostRepo.html_url
      //     this.repoName = mostRepo.name
      //   },
      //   response => {
      //     alert('请求失败111')
      //   }
      // )

      //使用axios发送ajax请求
      // axios.get(url).then(response => {
      //   const result = response.data;
      //   const mostRepo = result.items[0]
      //   this.repoUrl = mostRepo.html_url
      //   this.repoName = mostRepo.name
      // }).catch(error => {
      //   alert('请求失败222')
      // })
    }
  }
</script>

<style>
</style>
