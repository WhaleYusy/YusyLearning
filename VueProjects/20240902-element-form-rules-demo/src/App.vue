<script setup>
import { reactive, ref } from 'vue'
import FormList from './ElFormItem'

const formData = reactive({})
const formRef = ref()
const onValidate = () => {
  formRef.value.validate((valid, fields) => {
    console.log(valid, fields)

    if (valid) {
      console.log('校验成功')
    } else {
      console.log('校验不成功', fields)
    }
  })
}
</script>

<template>
  <div id="demo">
    <el-form ref="formRef" :model="formData" label-width="auto" style="max-width: 960px">
      <el-form-item
        v-for="item in FormList"
        :key="item.key"
        :prop="item.key"
        :label="item.label"
        :required="item.required">
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
    <el-button @click="onValidate">检验</el-button>
  </div>
</template>

<style scoped></style>
