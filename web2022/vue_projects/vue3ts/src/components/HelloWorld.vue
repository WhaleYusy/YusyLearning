<script setup lang="ts">
import { reactive, ref } from "vue";
const props = withDefaults(
  defineProps<{
    msg: string;
    title?: number;
  }>(),
  {
    title: 100,
  }
);
// const emits = defineEmits(["h11", "h22"]);
const emits = defineEmits<{
  (e: "h11"): void;
  (e: "h22", id?: string): void;
}>();
const h1111 = "11111";
const h2222 = ref(false);
const handl = () => {
  console.log("handl");
};
defineExpose({
  h1111,
  h2222,
  handl,
});
const books: Array<any> = reactive([ref("Vue 3 Guide"), 123, "456", true]);
// 这里需要 .value
console.log(books[0].value);
console.log(books[1]);
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h1 class="green">{{ props.msg }}</h1>
    <h2>{{ title }}</h2>
    <h3>
      You’ve successfully created a project with
      <a href="https://vitejs.dev/" target="_blank" rel="noopener">Vite</a> +
      <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue 3</a>.
      What's next?
    </h3>
    <button @click="emits('h11')">h11</button>
    <button @click="emits('h22', '1')">h22</button>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
