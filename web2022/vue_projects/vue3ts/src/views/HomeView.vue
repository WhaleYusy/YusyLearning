<script setup lang="ts">
import { provide } from "vue";
import TheWelcome from "../components/TheWelcome.vue";
provide("injectName", "RNGYusy");
</script>

<template>
  <main>
    <TheWelcome />
  </main>
</template>
