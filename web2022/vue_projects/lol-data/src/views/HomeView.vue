<script setup lang="ts">
// import TheWelcome from "../components/TheWelcome.vue";

import { ref } from "vue";
import { useMenuStore } from "../stores";
import columnList from "./ColumnList";
import type { MenuChildType } from "../types";
// tabs
const activeName = ref("");
const { menuList } = useMenuStore();
const tableData = ref<any[]>([]);
const dataTitle = ref("");
const updateData = (mc: MenuChildType, ml1: string, ml2: string) => {
  tableData.value = mc.data || [];
  dataTitle.value = ml1 + ml2;
};
</script>

<template>
  <main>
    <!-- <TheWelcome /> -->
    <el-tabs stretch v-model="activeName" class="demo-tabs">
      <template v-for="menu in menuList" :key="menu.name">
        <el-tab-pane :label="menu.label" :name="menu.name">
          <el-row
            justify="space-around"
            class="demo-row"
            v-if="menu.child && menu.child.length > 0"
          >
            <template v-for="mc in menu.child" :key="mc.name">
              <el-col
                :span="5"
                class="demo-col"
                @click="updateData(mc, menu.label, mc.label)"
              >
                <img :src="mc.imageUrl" />
                <p>{{ mc.label }}</p>
              </el-col>
            </template>
          </el-row>
        </el-tab-pane>
      </template>
    </el-tabs>
    <h1>{{ dataTitle }}</h1>
  </main>
  <el-table :data="tableData">
    <template v-for="column in columnList" :key="column.prop">
      <el-table-column
        align="center"
        :label="column.label"
        :prop="column.prop"
        :sortable="column.sortable"
      ></el-table-column>
    </template>
  </el-table>
</template>

<style scoped>
main {
  position: sticky;
  background: #eee;
  top: 0;
  z-index: 999;
}
main h1 {
  text-align: center;
  padding: 10px 0;
  margin: 0;
}
.demo-tabs {
  margin: 0 auto;
  max-width: 1280px;
}
.demo-row {
  width: 1280px;
}
.demo-col {
  text-align: center;
  cursor: pointer;
}
.demo-col img {
  border: solid var(--el-color-warning) 2px;
}
:deep(.el-tabs__item) {
  font-size: 18px;
}
:deep(.el-tabs__item.is-active),
:deep(.el-tabs__item:hover) {
  font-weight: bold;
  color: var(--el-color-warning);
}
:deep(.el-tabs__active-bar) {
  background-color: var(--el-color-warning);
}
</style>
