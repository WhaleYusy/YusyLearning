<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>

</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-width: 1200px;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
//走马灯
.el-carousel__button {
  width: 30px !important;
  height: 7px !important;
  background: lightgray !important;
  border-radius: 10px;
}
.el-carousel {
  z-index: 0 !important;
}
// /deep/ .el-steps--simple{
//   //ie10样式乱掉
//   width:800px !important;
// }
</style>
