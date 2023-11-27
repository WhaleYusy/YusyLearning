<template>
  <div>
    <Carousel />
    <Search />
    <ElRow :gutter="20" v-loading="cardLoading">
      <ElCol :span="20">
        <Level @getLevel="getLevel" />
        <Region @getRegion="getRegion" />
        <div class="hospital" v-if="hasHospitalArr.length > 0">
          <Card
            class="item"
            v-for="(item, index) in hasHospitalArr"
            :key="index"
            :hospitalInfo="item"
          />
        </div>
        <ElEmpty v-else description="暂无数据" />
        <el-pagination
          v-model:current-page="pageNo"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 30, 40]"
          :background="true"
          layout="prev, pager, next, jumper, sizes, ->, total,"
          :total="total"
          @current-change="currentChange"
          @size-change="sizeChange"
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
import type { Content, HospitalResponseData } from "@/api/home/type";

const pageNo = ref<number>(1);
const pageSize = ref<number>(10);
const hasHospitalArr = ref<Content>([]);
const total = ref<number>(0);
const hostype = ref("");
const districtCode = ref("");
onMounted(() => {
  getHospitalInfo();
});

const getHospitalInfo = async (initFlag?: boolean) => {
  if (!initFlag) {
    pageNo.value = 1;
  }
  cardLoading.value = true;
  let result: HospitalResponseData = await reqHospital(
    pageNo.value,
    pageSize.value,
    hostype.value,
    districtCode.value
  );
  cardLoading.value = false;
  const { code, data } = result;
  if (code === 200) {
    const { content, totalElements } = data;
    hasHospitalArr.value = content || [];
    total.value = totalElements || 0;
  }
};

const currentChange = () => {
  getHospitalInfo(true);
};

const sizeChange = () => {
  getHospitalInfo();
};

const cardLoading = ref<boolean>(false);

const getLevel = (level: string) => {
  hostype.value = level;
  getHospitalInfo();
};

const getRegion = (region: string) => {
  districtCode.value = region;
  getHospitalInfo();
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
