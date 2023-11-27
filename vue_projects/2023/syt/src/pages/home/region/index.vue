<template>
  <div class="region">
    <div class="content">
      <div class="left">地区：</div>
      <ul class="hospital">
        <li :class="{ active: regionFlag === '' }" @click="changeRegion('')">
          全部
        </li>
        <li
          :class="{ active: regionFlag === region.value }"
          v-for="region in regionArr"
          :key="region.value"
          @click="changeRegion(region.value)"
        >
          {{ region.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reqHospitalLevelAndRegion } from "@/api/home";
import { onMounted, ref } from "vue";

const regionArr = ref<any>([]);

const regionFlag = ref("");

onMounted(() => {
  getRegion();
});

const getRegion = async () => {
  const result: any = await reqHospitalLevelAndRegion("Beijin");
  const { code, data } = result;
  if (code === 200) {
    regionArr.value = data || [];
  }
};

const changeRegion = (region: string) => {
  regionFlag.value = region;
  $emit("getRegion", region);
};

const $emit = defineEmits(["getRegion"]);
</script>

<style scoped lang="scss">
.region {
  color: #7f7f7f;
  margin-top: 10px;

  .content {
    display: flex;

    .left {
      min-width: 52px;
    }

    ul {
      display: flex;
      flex-wrap: wrap;

      li {
        margin-right: 10px;
        margin-bottom: 10px;

        &.active,
        &:hover {
          color: #55a6fe;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
