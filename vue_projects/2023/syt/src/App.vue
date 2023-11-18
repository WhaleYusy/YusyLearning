<template>
  <div class="container">
    <HospitalTop />
    <div class="content">
      xxxxx
    </div>
    <div class="bottom">
      123123
    </div>
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
    background-color: red;
  }

  .bottom {
    width: 100%;
    height: 50px;
    background-color: cyan;
  }
}
</style>
