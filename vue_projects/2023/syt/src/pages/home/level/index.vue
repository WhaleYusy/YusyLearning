<template>
  <div class="level">
    <h1>医院</h1>
    <div class="content">
      <div class="left">等级：</div>
      <ul class="hospital">
        <li :class="{ active: levelFlag === '' }" @click="changeLevel('')">
          全部
        </li>
        <li
          :class="{ active: levelFlag === level.value }"
          v-for="level in levelArr"
          :key="level.value"
          @click="changeLevel(level.value)"
        >
          {{ level.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reqHospitalLevelAndRegion } from "@/api/home";
import { onMounted, ref } from "vue";

const levelArr = ref<any>([]);

const levelFlag = ref("");

onMounted(() => {
  getLevel();
});

const getLevel = async () => {
  const result: any = await reqHospitalLevelAndRegion("HosType");
  const { code, data } = result;
  if (code === 200) {
    levelArr.value = data || [];
  }
};

const changeLevel = (level: string) => {
  levelFlag.value = level;
  $emit("getLevel", level);
};

const $emit = defineEmits(["getLevel"]);
</script>

<style scoped lang="scss">
.level {
  color: #7f7f7f;

  h1 {
    font-weight: 900;
    margin: 10px 0;
  }

  .content {
    display: flex;

    .left {
      min-width: 52px;
    }

    .hospital {
      display: flex;

      li {
        margin-right: 10px;

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
