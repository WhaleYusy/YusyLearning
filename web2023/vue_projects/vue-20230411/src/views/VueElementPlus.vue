<script setup lang="ts">
import { reactive } from 'vue'

const form = reactive({
  name: '',
  sex: undefined
})

const showFormData = () => {
  console.log(form)
}
</script>

<template>
  <div id="vue-element-plus">
    <ElRow>
      <ElButton size="large" @click="showFormData">Whale Yusy</ElButton>
      <ElForm :model="form" label-width="120px">
        <ElFormItem label="Whale">
          <ElInput v-model="form.name" />
        </ElFormItem>
        <ElFormItem label="Yusy">
          <ElSelect v-model="form.sex">
            <ElOption label="男" :value="true" />
            <ElOption label="女" :value="false" />
          </ElSelect>
        </ElFormItem>
      </ElForm>
    </ElRow>
  </div>
</template>

<style scoped></style>
