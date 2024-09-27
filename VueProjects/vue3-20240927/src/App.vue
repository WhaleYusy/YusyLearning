<script setup>
import { ref } from 'vue'

const count = ref(0),
  msg = ref(''),
  rawHtml = '<span style="color: red">Red Text</span>',
  id = 'blue-bg',
  disabled = true,
  bindObj = {
    id: 'id_1',
    class: 'class_1',
    style: 'background: green'
  },
  testArr = [1, 2, 3, 4, 5]

const updateCount = () => {
  count.value++
  msg.value += count.value
}
</script>

<template>
  <div>
    <div>
      <p>按钮</p>
      <button @click="count++, (msg += count)">
        {{ count }}
      </button>
      <button @click="updateCount">
        {{ count }}
      </button>
    </div>
    <div>
      <p>文本插值</p>
      <span>Message: {{ msg }}</span>
    </div>
    <div>
      <p>纯文本</p>
      <span>{{ rawHtml }}</span>
      <p>v-html</p>
      <span v-html="rawHtml" />
    </div>
    <div>
      <p>Attribute绑定</p>
      <p :id="id">窗前明月光，疑是地上霜。</p>
      <p>布尔型Attribute</p>
      <button :disabled="disabled">再见</button>
      <p v-bind="bindObj">举头望明月，低头思故乡。</p>
    </div>
    <div>
      <p>使用js表达式</p>
      <p>{{ count * 5 }}</p>
      <p>{{ count === 5 ? '5' : '不是5' }}</p>
      <p>{{ testArr.map(item => item * 2) }}</p>
    </div>
  </div>
</template>

<style scoped>
#blue-bg {
  background: skyblue;
}
</style>
