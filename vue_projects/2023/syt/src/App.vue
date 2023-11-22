<template>
  <div class="container">
    <HospitalTop />
    <div class="content">
      <RouterView />
    </div>
    <HospitalBottom />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  align-items: center;

  .content {
    margin-top: 70px;
    width: 1200px;
    height: 1000px;
  }
}
</style>
