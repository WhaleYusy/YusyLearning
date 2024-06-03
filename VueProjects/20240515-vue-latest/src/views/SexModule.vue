<template>
  <div>I am male.</div>
  <ul>
    <li v-for="i in 10" :key="i">{{ i }}</li>
  </ul>
</template>
<script setup lang="ts"></script>
<style scoped></style>
