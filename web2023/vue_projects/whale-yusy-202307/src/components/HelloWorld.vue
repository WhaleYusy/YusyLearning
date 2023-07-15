<script setup lang="ts">
import { ref } from 'vue';

defineProps<{
  msg: string
}>()
const lang = ref("")
const langs = [{
    key: 'en',
    value: '英文',
  },
  {
    key: 'zh',
    value: '中文'
  }
]
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <ElRow>
      <span>请选择语言：</span>
      <ElSelect v-model="lang">
        <ElOption v-for="lang in langs" :key="lang.key" :label="lang.value" :value="lang.key"></ElOption>
      </ElSelect>
    </ElRow>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
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
