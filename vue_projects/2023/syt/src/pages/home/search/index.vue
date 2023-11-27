<template>
  <div class="search">
    <ElAutocomplete
      clearable
      placeholder="请输入医院名称"
      class="form"
      v-model="hosname"
      :fetch-suggestions="fetchData"
      :trigger-on-focus="false"
      @select="goDetail"
    />
    <ElButton type="primary" size="default" :icon="Search">搜索</ElButton>
  </div>
</template>

<script setup lang="ts">
import { Search } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { reqHospitalInfo } from "@/api/home";

const $router = useRouter();

const hosname = ref("");

const fetchData = async (keyword: string, cb: any) => {
  const result: any = await reqHospitalInfo(keyword);
  const { code, data } = result;
  if (code === 200) {
    const showData = data.map((item: any) => {
      const { hosname, hoscode } = item;
      return {
        value: hosname,
        hoscode,
      };
    });
    cb(showData || []);
  }
};

const goDetail = (item: any) => {
  const { hoscode } = item;
  console.log(hoscode);
  $router.push("/hospital");
};
</script>

<style scoped lang="scss">
.search {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0;

  :deep(.form) {
    width: 600px;
    margin-right: 10px;
  }
}
</style>
