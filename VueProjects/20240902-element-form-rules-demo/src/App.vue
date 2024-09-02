<script setup>
import { reactive } from 'vue'
import FormList from './ElFormItem'

const formData = reactive({})
const formList = reactive(FormList)
</script>

<template>
  <div id="demo">
    <el-form :model="formData" label-width="auto" style="max-width: 960px">
      <el-form-item v-for="item in FormList" :key="item.key" :label="item.label">
        <el-select v-if="item.type === 'select'" v-model="formData[item.key]">
          <el-option v-for="opt in item.options" :key="opt.value" :label="opt.label" :value="opt.value"></el-option>
        </el-select>
        <el-date-picker v-else-if="item.type === 'date'" type="date" v-model="formData[item.key]"></el-date-picker>
        <el-switch v-else-if="item.type === 'switch'" v-model="formData[item.key]"></el-switch>
        <el-checkbox-group v-else-if="item.type === 'checkbox'" v-model="formData[item.key]">
          <el-checkbox v-for="opt in item.options" :key="opt.value" :label="opt.label" :value="opt.value"></el-checkbox>
        </el-checkbox-group>
        <el-radio-group v-else-if="item.type === 'radio'" v-model="formData[item.key]">
          <el-radio v-for="opt in item.options" :key="opt.value" :label="opt.label" :value="opt.value"></el-radio>
        </el-radio-group>
        <el-input v-else type="input" v-model="formData[item.key]"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped></style>
