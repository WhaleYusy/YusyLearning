<template>
  <div class="container">
    <Search></Search>
	<users-main></users-main>
  </div>
</template>

<script>
  import Search from './components/Search.vue'
  import UsersMain from './components/Main.vue'
  export default{
    components:{
		Search,
		UsersMain
	}
  }
</script>

<style>
</style>
