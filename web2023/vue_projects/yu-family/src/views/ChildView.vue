<template>
  <div>
    <p>{{ props.text.title }}</p>
    <button @click="changeText">111</button>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
type p1 = {
  text: any;
};
const props = defineProps<p1>();
const changeText = () => {
  // eslint-disable-next-line vue/no-mutating-props
  const _text = props.text;
  console.log(_text);

  _text.title += "111";
};
</script>

<style></style>
