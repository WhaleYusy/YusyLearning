<script setup lang="ts">
// import TheWelcome from "../components/TheWelcome.vue";

import { ref } from "vue";
import { useMenuStore } from "../stores";
import columnList from "./ColumnList";
import type { MenuChildType } from "../types";
import type { TableInstance, TabsPaneContext } from "element-plus";
// tabs
const activeName = ref("");
const { menuList } = useMenuStore();
const tableData = ref<any[]>([]);
const dataTitle = ref("");
const dataTableRef = ref<TableInstance>();
const tabClick = (pane: TabsPaneContext) => {
  tableData.value = [];
  dataTitle.value = `${pane.props.label}`;
};
const updateData = (mc: MenuChildType, ml1: string, ml2: string) => {
  dataTableRef.value?.sort("kda", "descending");
  tableData.value = mc.data || [];
  dataTitle.value = ml1 + ml2;
};
</script>

<template>
  <main>
    <!-- <TheWelcome /> -->
    <el-tabs
      stretch
      v-model="activeName"
      class="demo-tabs"
      @tab-click="tabClick"
    >
      <template v-for="menu in menuList" :key="menu.name">
        <el-tab-pane :label="menu.label" :name="menu.name">
          <el-row
            justify="space-around"
            class="demo-row"
            v-if="menu.child && menu.child.length > 0"
          >
            <template v-for="mc in menu.child" :key="mc.name">
              <el-col
                :span="3"
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
  <el-table
    style="width: 1700px"
    ref="dataTableRef"
    :data="tableData"
    :default-sort="{ prop: 'kda', order: 'descending' }"
    max-height="450"
  >
    <el-table-column
      type="index"
      align="center"
      label="排名"
      min-width="60"
      fixed="left"
    ></el-table-column>
    <template v-for="column in columnList" :key="column.prop">
      <el-table-column
        align="center"
        :label="column.label"
        :prop="column.prop"
        :sortable="column.sortable"
        :min-width="column.minWidth"
        :fixed="column.fixed"
        v-if="column.cType === 'per'"
      >
        <template #default="scope">
          <span
            >{{ scope.row[column.prop] }}（{{
              scope.row[column.cTypeName]
            }}）</span
          >
        </template>
      </el-table-column>
      <el-table-column
        v-else
        align="center"
        :label="column.label"
        :prop="column.prop"
        :sortable="column.sortable"
        :min-width="column.minWidth"
        :fixed="column.fixed"
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
  width: 1700px;
}
.demo-row {
  width: 1700px;
}
.demo-col {
  text-align: center;
  cursor: pointer;
}
.demo-col img {
  width: 232px;
  height: 126px;
  border: solid var(--el-color-warning) 2px;
  pointer-events: none;
}
:deep(.el-tabs__item) {
  font-size: 18px;
}
:deep(.el-tabs__header) {
  width: 1366px;
  margin: 0 auto 15px;
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
