<template>
  <div>
    <Carousel />
    <Search />
    <ElRow :gutter="20">
      <ElCol :span="20">
        <Level />
        <Region />
        <div class="hospital">
          <Card
            class="item"
            v-for="(item, index) in hasHospitalArr"
            :key="index"
            :hospitalInfo="item"
          />
        </div>
        <el-pagination
          v-model:current-page="pageNo"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 30, 40]"
          :background="true"
          layout="prev, pager, next, jumper, sizes, ->, total,"
          :total="total"
        />
      </ElCol>
      <ElCol :span="4"> </ElCol>
    </ElRow>
  </div>
</template>
<script setup lang="ts">
import { reqHospital } from "@/api/home";
import { ref, onMounted } from "vue";

import Carousel from "./carousel/index.vue";
import Search from "./search/index.vue";
import Level from "./level/index.vue";
import Region from "./region/index.vue";
import Card from "./card/index.vue";

const pageNo = ref(1);
const pageSize = ref(10);
const hasHospitalArr = ref([]);
const total = ref(0);
onMounted(() => {
  getHospitalInfo();
});

const getHospitalInfo = async () => {
  let result: any = await reqHospital(pageNo.value, pageSize.value);
  const { code, data } = result;
  if (code === 200) {
    const { content, totalElements } = data;
    hasHospitalArr.value = content || [];
    total.value = totalElements || 0;
  }
};
</script>
<style scoped lang="scss">
.hospital {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .item {
    width: 48%;
    margin: 10px 0;
  }
}
</style>
